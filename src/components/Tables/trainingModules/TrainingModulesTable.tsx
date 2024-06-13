import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import AddImgBg from '../../../images/AddIcon2.jpg';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const TrainingModulesTable = ({ pagetitle, pageName }: any) => {
  const [showUpdateAndCreateModel, setShowUpdateAndCreateModel] = useState({
    state: false,
    for: '',
  });
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() =>
              setShowUpdateAndCreateModel({ state: true, for: 'Create' })
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

          {/* {userList.map((user: any, key: any) => ( */}
          <>
            {/* {user?.email !== 'admin@gmail.com' && ( */}
            <div
              className={`grid grid-cols-3 sm:grid-cols-3  'border-b border-stroke dark:border-strokedark'
                  `}
              //   key={key}
            >
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black  dark:text-white">{'key'}</p>
              </div>

              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {'user.first_name'} {'user?.last_name'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5 p-2.5  xl:p-5">
                <button
                  onClick={() =>
                    setShowUpdateAndCreateModel({ state: true, for: 'Update' })
                  }
                  className="h-9 w-9 flex justify-center items-center border-2 border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                >
                  <EditRoundedIcon />
                </button>
                <button className="h-9 w-9 flex justify-center items-center border-2 border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out">
                  <DeleteRoundedIcon />
                </button>
              </div>
            </div>
            {/* )} */}
          </>
          {/* ))} */}
        </div>
        {showUpdateAndCreateModel.state && (
          <UpdateAndCreateModel
            showUpdateAndCreateModel={showUpdateAndCreateModel}
            setShowUpdateAndCreateModel={setShowUpdateAndCreateModel}
          />
        )}
      </div>
    </>
  );
};

const UpdateAndCreateModel = ({
  showUpdateAndCreateModel,
  setShowUpdateAndCreateModel,
}: any) => {
  const [rawFileData, setRawFileData] = useState();
  const [previewFile, setPreviewFile] = useState('');
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
                setShowUpdateAndCreateModel({ state: false, for: '' });
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5">
            <button className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              {showUpdateAndCreateModel.for === 'Update'
                ? showUpdateAndCreateModel.for
                : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
