import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddImgBg from '../../../images/AddIcon2.jpg';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import {
  createTrainingModules,
  deleteTrainingModules,
  fetchTrainingModules,
  updateTrainingModules,
} from '../../../api-calls/apicalls';
import { toast } from 'react-hot-toast';

export const TrainingModulesTable = ({ pagetitle, pageName }: any) => {
  const [showUpdateAndCreateModel, setShowUpdateAndCreateModel] = useState({
    state: false,
    for: '',
    needToUpdateData: '',
  });
  const [trainingModuleList, setTrainingModuleList] = useState([]);
  const [confirmDeleteModel, setConfirmDeleteModel] = useState({
    state: false,
    moduleID: '',
  });

  const getTrainingModuleList = async () => {
    const moduleList = await fetchTrainingModules();

    setTrainingModuleList([...moduleList]);
  };

  useEffect(() => {
    getTrainingModuleList();
  }, [showUpdateAndCreateModel, confirmDeleteModel]);
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() =>
              setShowUpdateAndCreateModel({
                state: true,
                for: 'Create',
                needToUpdateData: '',
              })
            }
            className="flex w-[25%] justify-center rounded-lg bg-primary py-2 font-medium text-gray hover:bg-opacity-90"
          >
            <AddIcon />
            Create
          </button>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>

      
      <div className="rounded-sm relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {pagetitle}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Serial No.
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {trainingModuleList.map((cur: any, key: any) => (
            <>
              <div
                className={`grid grid-cols-3 sm:grid-cols-3  'border-b border-stroke dark:border-strokedark'
                  `}
                key={key}
              >
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black  dark:text-white">{key + 1}</p>
                </div>

                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">
                    {cur.name}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2.5 p-2.5  xl:p-5">
                  <button
                    onClick={() =>
                      setShowUpdateAndCreateModel({
                        state: true,
                        for: 'Update',
                        needToUpdateData: cur,
                      })
                    }
                    className="h-9 w-9 flex justify-center items-center border-2 border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                  >
                    <EditRoundedIcon />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDeleteModel({ state: true, moduleID: cur._id })
                    }
                    className="h-9 w-9 flex justify-center items-center border-2 border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                  >
                    <DeleteRoundedIcon />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {showUpdateAndCreateModel.state && (
        <UpdateAndCreateModel
          showUpdateAndCreateModel={showUpdateAndCreateModel}
          setShowUpdateAndCreateModel={setShowUpdateAndCreateModel}
        />
      )}
      {confirmDeleteModel.state && (
        <DeleteConfirmModel
          confirmDeleteModel={confirmDeleteModel}
          setConfirmDeleteModel={setConfirmDeleteModel}
        />
      )}
    </>
  );
};

// create and update model.....
const UpdateAndCreateModel = ({
  showUpdateAndCreateModel,
  setShowUpdateAndCreateModel,
}: any) => {
  const [rawFileData, setRawFileData] = useState();
  const [previewFile, setPreviewFile] = useState('');
  const [moduleDetails, setModuleDetails] = useState({
    name: showUpdateAndCreateModel.needToUpdateData.name,
    title: showUpdateAndCreateModel.needToUpdateData.title,
    description: showUpdateAndCreateModel.needToUpdateData.description,
    hoverTitle: showUpdateAndCreateModel.needToUpdateData.hover_title,
    hoverDescription:
      showUpdateAndCreateModel.needToUpdateData.hover_description,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //  this code below is for preview of the selected image...
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const handelPreviewImage = (file: any) => {
    const previewImage = new FileReader();

    previewImage.readAsDataURL(file);

    previewImage.onload = (result) => {
      if (result.target) {
        setPreviewFile(result.target.result);
      }
    };
  };

  //   receiving the input value and setting in the useState (moduleDetails)....
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setModuleDetails({ ...moduleDetails, [name]: value });
  };

  //  this code below is for creating  and updateing the module....
  const handelClick = async (checkfor: any) => {
    if (checkfor === 'Update') {
      // code to update the existing data.....

      setIsLoading(true);
      const updateModuleData = new FormData();

      updateModuleData.append(
        'module_id',
        showUpdateAndCreateModel.needToUpdateData._id,
      );
      updateModuleData.append('name', moduleDetails.name);
      updateModuleData.append('trainingModule', rawFileData);
      updateModuleData.append('title', moduleDetails.title);
      updateModuleData.append('description', moduleDetails.description);
      updateModuleData.append('hover_title', moduleDetails.hoverTitle);
      updateModuleData.append(
        'hover_description',
        moduleDetails.hoverDescription,
      );

      const requestToUpdate = await updateTrainingModules(updateModuleData);

      if (
        requestToUpdate?.success == 'no' &&
        requestToUpdate?.message === 'jwt expired'
      ) {
        setIsLoading(false);
        navigate('/');
        return;
      } else if (requestToUpdate?.success == 'no') {
        setIsLoading(false);
        toast.error('Opps! System error try again leter');
      } else if (requestToUpdate?.success == 'yes') {
        setIsLoading(false);
        toast.success('Trainng module updated successfully!');
        setShowUpdateAndCreateModel({
          state: false,
          for: '',
          needToUpdateData: '',
        });
      }
      return;
    }

    // code to create new module....

    setIsLoading(true);

    const createModuleData = new FormData();
    createModuleData.append('name', moduleDetails.name);
    createModuleData.append('trainingModule', rawFileData);
    createModuleData.append('title', moduleDetails.title);
    createModuleData.append('description', moduleDetails.description);
    createModuleData.append('hover_title', moduleDetails.hoverTitle);
    createModuleData.append(
      'hover_description',
      moduleDetails.hoverDescription,
    );

    const requestForCreateModule =
      await createTrainingModules(createModuleData);

    if (
      requestForCreateModule?.success === 'no' &&
      requestForCreateModule?.message === 'jwt expired'
    ) {
      toast.error('Session Expired !!');
      setIsLoading(false);
      navigate('/');
    } else if (requestForCreateModule?.success === 'no') {
      toast.error('system error try again leter');
      setIsLoading(false);
    } else if (requestForCreateModule?.success === 'yes') {
      toast.success('training module created successfully');
      setIsLoading(false);
      setShowUpdateAndCreateModel({
        state: false,
        for: '',
        needToUpdateData: '',
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[95%] xl:w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">
              {showUpdateAndCreateModel.for === 'Update'
                ? showUpdateAndCreateModel.for
                : 'Add'}{' '}
              Modules
            </h2>
            <button
              onClick={() => {
                // handleClose();
                setShowUpdateAndCreateModel({
                  state: false,
                  for: '',
                  needToUpdateData: '',
                });
              }}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>

          <div className="my-4 flex flex-col justify-start items-start gap-3">
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">Name</label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Name ..."
                  name="name"
                  value={moduleDetails.name}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Choose Image
              </label>
              <div className="relative w-full h-44 flex justify-center items-center rounded-md overflow-hidden">
                <input
                  ref={uploadFileRef}
                  type="file"
                  hidden
                  onChange={(e: any) => {
                    setRawFileData(e.target.files[0]);
                    handelPreviewImage(e.target.files[0]);
                  }}
                />
                <img
                  onClick={() =>
                    uploadFileRef.current && uploadFileRef.current.click()
                  }
                  src={previewFile ? previewFile : AddImgBg}
                  alt="choose-img-default-bg"
                  className="cursor-pointer"
                />
                {!previewFile && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <button
                      onClick={() =>
                        uploadFileRef.current && uploadFileRef.current.click()
                      }
                      className="h-10 w-10 flex justify-center items-center bg-white rounded-full shadow-xl"
                    >
                      <AddIcon className="text-black" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Title
              </label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Title..."
                  name="title"
                  value={moduleDetails.title}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Description
              </label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Description..."
                  name="description"
                  value={moduleDetails.description}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Hover Title
              </label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Hover Title..."
                  name="hoverTitle"
                  value={moduleDetails.hoverTitle}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Hover Description
              </label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Hover Description..."
                  name="hoverDescription"
                  value={moduleDetails.hoverDescription}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setShowUpdateAndCreateModel({
                  state: false,
                  for: '',
                  needToUpdateData: '',
                });
              }}
              className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={() => handelClick(showUpdateAndCreateModel.for)}
              className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isLoading ? (
                <CircularProgress className="text-base" color="inherit" />
              ) : (
                <>
                  {showUpdateAndCreateModel.for === 'Update'
                    ? showUpdateAndCreateModel.for
                    : 'Create'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// delete comfirm model....

const DeleteConfirmModel = ({
  confirmDeleteModel,
  setConfirmDeleteModel,
}: any) => {
  const [isLoadingDele, setIsLoadingDele] = useState(false);

  const navigate = useNavigate();

  const handleModuleDelete = async (moduleID: any) => {
    setIsLoadingDele(true);
    const requestForDeleteModule = await deleteTrainingModules({
      module_id: moduleID,
    });

    if (
      requestForDeleteModule?.success === 'no' &&
      requestForDeleteModule?.message === 'jwt expired'
    ) {
      toast.error('Opps! you session expiered !!');
      setIsLoadingDele(false);
      navigate('/');
    } else if (requestForDeleteModule?.success === 'no') {
      toast.error('system error try again leter');
      setIsLoadingDele(false);
    } else if (requestForDeleteModule?.success === 'yes') {
      toast.success('Module Deleted successfully');
      setIsLoadingDele(false);
      setConfirmDeleteModel({
        state: false,
        moduleID: '',
      });
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[95%] xl:w-[40%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">           

            <h2 className="text-[800] text-3xl ">
              Confirm Delete <span className="text-red-500">!!!!</span>
            </h2>
            <button

              onClick={() => {
                // handleClose();
                setConfirmDeleteModel({
                  state: false,
                  moduleID: '',
                });
              }}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>
          <p className="">
            You are sure you want to delete {confirmDeleteModel.module_id}
          </p>
          <div className="flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setConfirmDeleteModel({
                  state: false,
                  moduleID: '',
                });
              }}
              className="w-[15%] py-2 bg-[#FFF] rounded-lg text-black hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModuleDelete(confirmDeleteModel.moduleID)}
              className="flex w-[15%] justify-center rounded-lg bg-[#dc3545] py-2 font-medium text-gray hover:bg-opacity-90"
            >
              {isLoadingDele ? (
                <CircularProgress className="text-base" color="inherit" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
