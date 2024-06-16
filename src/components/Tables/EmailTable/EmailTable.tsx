import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { createEmailUs, fetchEmailUs, updateEmailUs } from '../../../api-calls/apicalls';
import toast from 'react-hot-toast';

export const EmailTable = ({ pageName, pagetitle }: any) => {
  const [emailList, setEmailList] = useState([]);
  const [createAndUpdateModel, setCreateAndUpdateModel] = useState({
    state: false,
    for: '',
    needToUpdate: '',
  });
  const navigate = useNavigate();

  const getAllEmailList = async () => {
    const requestToGetAllEmailList = await fetchEmailUs();

    if (requestToGetAllEmailList?.message === 'jwt expired') {
      return navigate('/');
    } else {
      setEmailList([...requestToGetAllEmailList]);
    }
  };

  useEffect(() => {
    getAllEmailList();
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

          {emailList.map((cur: any, key: any) => (
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
                  {/* <button
                    // onClick={() =>
                    //   setConfirmDeleteModel({
                    //     state: true,
                    //     isDeletedID: cur._id,
                    //   })
                    // }
                    className="h-9 w-9 flex justify-center items-center border-2 border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                  >
                    <DeleteRoundedIcon />
                  </button> */}
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
  const [isLoading, setIsLoading] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    name: createAndUpdateModel.needToUpdate.name,
    email:createAndUpdateModel.needToUpdate.email,
    description: createAndUpdateModel.needToUpdate.description,
  });
  const navigate = useNavigate();

  const handleOnchange = (e: any) => {
    const { name, value } = e.target;

    setEmailDetails({ ...emailDetails, [name]: value });
  };

  const handleClick = async (checkFor: any) => {
    if (checkFor === 'Update') {
      // code to update the email........
      setIsLoading(true);

      const requestToUpdateEmail = await updateEmailUs({...emailDetails,email_us_id:createAndUpdateModel.needToUpdate._id});

      if (
        requestToUpdateEmail?.success == 'no' &&
        requestToUpdateEmail?.message === 'jwt expired'
      ) {
        toast.error('Oopps! Session expired');
        setIsLoading(false);
        navigate('/');
        return;
      } else if (requestToUpdateEmail?.success == 'no') {
        toast.error('system error try again leter');
        setIsLoading(false);
        setCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      } else if (requestToUpdateEmail?.success == 'yes') {
        toast.success('email us updated successfully');
        setIsLoading(false);
        setCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      }

      return;
    }

    // code to create a new email....
    setIsLoading(true);

    const requestToCreateEmail = await createEmailUs(emailDetails);

    if (
      requestToCreateEmail?.success == 'no' &&
      requestToCreateEmail?.message === 'jwt expired'
    ) {
      toast.error('Oopps! Session expired');
      setIsLoading(false);
      navigate('/');
      return;
    } else if (requestToCreateEmail?.success == 'no') {
      toast.error('system error try again leter');
      setIsLoading(false);
      setCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    } else if (requestToCreateEmail?.success == 'yes') {
      toast.success('email us created successfully');
      setIsLoading(false);
      setCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    }
  };

  return (
    <>
      <div className="fixed w-full h-full flex justify-center items-center left-0 top-0 backdrop-blur-md EditModelZindex">
        <div className="shadow-md p-4 w-[95%] xl:w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">
              {createAndUpdateModel.for === 'Update'
                ? createAndUpdateModel.for
                : createAndUpdateModel.for}{' '}
              Email
            </h2>
            <button
              onClick={() => {
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
          <div className="flex flex-col justify-start items-start w-full gap-3 my-4">
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <label className="text-lg text-black dark:text-white">Name</label>

              <div className="w-full">
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  placeholder="Enter Name..."
                  name="name"
                  value={emailDetails.name}
                  onChange={handleOnchange}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <label className="text-lg text-black dark:text-white">
                Email
              </label>

              <div className="w-full">
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  placeholder="Enter Email..."
                  name="email"
                  value={emailDetails.email}
                  onChange={handleOnchange}
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full gap-2">
              <label className="text-lg text-black dark:text-white">
                Description
              </label>

              <div className="w-full">
                <textarea
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  rows={5}
                  placeholder="Enter Description..."
                  name="description"
                  value={emailDetails.description}
                  onChange={handleOnchange}
                ></textarea>
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
