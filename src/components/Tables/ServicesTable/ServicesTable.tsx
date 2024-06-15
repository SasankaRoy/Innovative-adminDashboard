import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { createServices, fetchServices, updateServices } from '../../../api-calls/apicalls';
import AddImgBg from '../../../images/AddIcon2.jpg';
import toast from 'react-hot-toast';
export const ServicesTable = ({ pagetitle, pageName }: any) => {
  const [servicesAllData, setServiceAllData] = useState([]);
  const [createAndUpdateModel, setCreateAndUpdateModel] = useState({
    state: false,
    for: '',
    needToUpdate: '',
  });

  // get all service data here....
  const getAllServicesData = async () => {
    const requestAllServiceData = await fetchServices();
    setServiceAllData([...requestAllServiceData]);
  };

  useEffect(() => {
    getAllServicesData();
  }, [createAndUpdateModel]);
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() =>
              setCreateAndUpdateModel({
                state: true,
                for: 'Create',
                needToUpdate: '',
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

          {servicesAllData.map((cur: any, key: any) => (
            <>
              <div
                className={`grid grid-cols-3 sm:grid-cols-3  border-b border-stroke dark:border-strokedark
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
                      setCreateAndUpdateModel({
                        state: true,
                        for: 'Update',
                        needToUpdate: cur,
                      })
                    }
                    className="h-9 w-9 flex justify-center items-center border-2 border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                  >
                    <EditRoundedIcon />
                  </button>
                  <button
                    // onClick={() =>
                    //   setConfirmDeleteModel({
                    //     state: true,
                    //     isDeletedID: cur._id,
                    //   })
                    // }
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

      {createAndUpdateModel.state && (
        <CreateAndUpdateModel
          createAndUpdateModel={createAndUpdateModel}
          setCreateAndUpdateModel={setCreateAndUpdateModel}
        />
      )}
    </>
  );
};

const CreateAndUpdateModel = ({
  createAndUpdateModel,
  setCreateAndUpdateModel,
}: any) => {
  const [previewImage, setPreviewImage] = useState();
  const [rawFileData,setRawFileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [servicesDetails,setServicesDetails] = useState({
    name:createAndUpdateModel.needToUpdate.name,
    title:createAndUpdateModel.needToUpdate.title,
    description:createAndUpdateModel.needToUpdate.description,
    hoverTitle:createAndUpdateModel.needToUpdate.hover_title,
    hoverDescription:createAndUpdateModel.needToUpdate.hover_description,
  });

  const navigate = useNavigate();

  // for choosen image preview........
  const imageRef = useRef<HTMLInputElement>(null);

  const handelPreviewImg = (file: any) => {
    const fileData = new FileReader();

    fileData.readAsDataURL(file);

    fileData.onload = (result: any) => {
      setPreviewImage(result.target?.result);
    };
  };


  // get and set the user inputs...
  const handleOnChange = (e:any)=>{
    const {name,value} = e.target;
    setServicesDetails({...servicesDetails,[name]:value})
  }

  const handleClick = async(checkFor:any)=>{
    if(checkFor === 'Update'){
      // code for update service...
      setIsLoading(true);

      const formData = new FormData();

      formData.append('name',servicesDetails.name),
      formData.append('title',servicesDetails.title),
      formData.append('description',servicesDetails.description),
      formData.append('hover_title',servicesDetails.hoverTitle),
      formData.append('hover_description',servicesDetails.hoverDescription),
      formData.append('service',rawFileData);
      formData.append("service_id", createAndUpdateModel.needToUpdate._id)

      const requestToUpdateService = await updateServices(formData);

      if (
        requestToUpdateService?.success === "no" &&
        requestToUpdateService?.message === "jwt expired"
      ) {
        toast.error('Oopps ! Session expired');
        setIsLoading(false)
        navigate("/");
        return
      } else if (requestToUpdateService?.success === "no") {
        toast.error("system error try again leter");
        setIsLoading(false)
        setCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      } else if (requestToUpdateService?.success === "yes") {
        toast.success("service created successfully")
        setIsLoading(false)
        setCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      }

      return;
    }

    // code to create a new service........
    setIsLoading(true);
    const formData  = new FormData();

    formData.append('name',servicesDetails.name);
    formData.append('title',servicesDetails.title);
    formData.append('description',servicesDetails.description);
    formData.append('hover_title',servicesDetails.hoverTitle);
    formData.append('hover_description',servicesDetails.hoverDescription);
    formData.append('service',rawFileData);

    const requestToCreateService = await createServices(formData);

    if (
      requestToCreateService?.success === "no" &&
      requestToCreateService?.message === "jwt expired"
    ) {
      toast.error('Oopps ! Session expired');
      setIsLoading(false)
      navigate("/");
      return
    } else if (requestToCreateService?.success === "no") {
      toast.error("system error try again leter");
      setIsLoading(false)
      setCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    } else if (requestToCreateService?.success === "yes") {
      toast.success("service created successfully")
      setIsLoading(false)
      setCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    }
      
    

  }

  return (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full backdrop-blur-md EditModelZindex">
        <div className="shadow-md p-4 w-[95%] xl:w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">
              {createAndUpdateModel.for === 'Update'
                ? createAndUpdateModel.for
                : createAndUpdateModel.for}{' '}
              Services
            </h2>
            <button
              onClick={() => {
                // handleClose();
                setCreateAndUpdateModel({
                  state: false,
                  for: '',
                  needToUpdate: '',
                });
              }}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 my-4 w-full">
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">Name</label>
              <div className="w-full">
                <input
                  type="text"
                  name='name'
                  value={servicesDetails.name}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Name...."
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Image
              </label>
              <div className="relative w-full h-44 rounded-md overflow-hidden">
                <input
                  ref={imageRef}
                  onChange={(e: any) =>{ handelPreviewImg(e.target.files[0]);
                    setRawFileData(e.target.files[0])
                  }}
                  type="file"
                  hidden
                />
                <img
                  src={previewImage ? previewImage : AddImgBg}
                  alt="choose-img"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                  <button
                    onClick={() => imageRef.current && imageRef.current.click()}
                    className="flex shadow-md justify-center items-center h-10 w-10 text-black bg-white rounded-full"
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start gap-2 flex-col w-full">
              <label className="text-lg text-black dark:text-white">
                Title
              </label>
              <div className="w-full">
                <input
                name='title'
                value={servicesDetails.title}
                onChange={handleOnChange}
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Title..."
                />
              </div>
            </div>

            <div className="flex justify-start items-start gap-2 flex-col w-full">
              <label className="text-lg text-black dark:text-white">
                Description
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name='description'
                  value={servicesDetails.description}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Description..."
                />
              </div>
            </div>

            <div className="flex justify-start items-start gap-2 flex-col w-full">
              <label className="text-lg text-black dark:text-white">
                Hover Title
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name='hoverTitle'
                  value={servicesDetails.hoverTitle}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Hover Title..."
                />
              </div>
            </div>

            <div className="flex justify-start items-start gap-2 flex-col w-full">
              <label className="text-lg text-black dark:text-white">
                Hover Description
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name='hoverDescription'
                  value={servicesDetails.hoverDescription}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter Hover Description..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setCreateAndUpdateModel({
                  state: false,
                  for: '',
                  needToUpdate: '',
                });
              }}
              className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={() => handleClick(createAndUpdateModel.for)}
              className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isLoading ? (
                <CircularProgress className="text-base" color="inherit" />
              ) : (
                <>
                  {createAndUpdateModel.for === 'Update'
                    ? createAndUpdateModel.for
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
