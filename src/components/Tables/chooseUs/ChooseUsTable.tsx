import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createCus, fetchCus, updateCus } from '../../../api-calls/apicalls';
import toast from 'react-hot-toast';

export const ChooseUsTable = ({ pageName, pagetitle }: any) => {
  const [chooseUsAllData, setChooseUsAllData] = useState([]);
  const [isCreateAndUpdateModel, setIsCreateAndUpdateModel] = useState({
    state: false,
    for: '',
    needToUpdate: '',
  });

  const getChooseUsList = async () => {
    const requestChooseUsData = await fetchCus();

    setChooseUsAllData([...requestChooseUsData]);
  };

  useEffect(() => {
    getChooseUsList();
  }, [isCreateAndUpdateModel]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() =>
              setIsCreateAndUpdateModel({
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

          {chooseUsAllData.map((cur: any, key: any) => (
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
                      setIsCreateAndUpdateModel({
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
                    //   setConfirmDeleteModel({ state: true, moduleID: cur._id })
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

      {isCreateAndUpdateModel.state && (
        <CreateAndUpdateModel
          isCreateAndUpdateModel={isCreateAndUpdateModel}
          setIsCreateAndUpdateModel={setIsCreateAndUpdateModel}
        />
      )}
    </>
  );
};

// update and create model or popUp...

const CreateAndUpdateModel = ({
  isCreateAndUpdateModel,
  setIsCreateAndUpdateModel,
}: any) => {
  const [chooseUsDetails, setChooseUsDetails] = useState({
    name: isCreateAndUpdateModel.needToUpdate.name,
    question: isCreateAndUpdateModel.needToUpdate.question,
    answer: isCreateAndUpdateModel.needToUpdate.answer,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setChooseUsDetails({ ...chooseUsDetails, [name]: value });
  };

  const handleOnClick = async (checkfor: any) => {
    if (checkfor === 'Update') {
      // code below is for update existing choose us data...

      setIsLoading(true);
      const requestForCreateNewData = await updateCus({
        ...chooseUsDetails,
        cus_id: isCreateAndUpdateModel.needToUpdate._id,
      });

      if (
        requestForCreateNewData?.success == 'no' &&
        requestForCreateNewData?.message === 'jwt expired'
      ) {
        toast.error('Opps! Session expired !');
        setIsLoading(false);
        navigate('/');
        return;
      } else if (requestForCreateNewData?.success == 'no') {
        toast.error('System error try again leter');
        setIsLoading(false);
        setIsCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      } else if (requestForCreateNewData?.success == 'yes') {
        toast.success('Choose us item created successfully');
        setIsLoading(false);
        setIsCreateAndUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      }

      return;
    }

    // code below is for creating new choose us data...

    setIsLoading(true);

    const requestToCreateChooseUsData = await createCus(chooseUsDetails);

    if (
      requestToCreateChooseUsData?.success == 'no' &&
      requestToCreateChooseUsData?.message === 'jwt expired'
    ) {
      toast.error('Opps! Session expired !');
      setIsLoading(false);
      navigate('/');
      return;
    } else if (requestToCreateChooseUsData?.success == 'no') {
      toast.error('System error try again leter');
      setIsLoading(false);
      setIsCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    } else if (requestToCreateChooseUsData?.success == 'yes') {
      toast.success('Choose us item update successfully');
      setIsLoading(false);
      setIsCreateAndUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[95%] xl:w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">
              {isCreateAndUpdateModel.for === 'Update'
                ? isCreateAndUpdateModel.for
                : isCreateAndUpdateModel.for}{' '}
              Modules
            </h2>
            <button
              onClick={() => {
                // handleClose();
                setIsCreateAndUpdateModel({
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

          <div className="flex flex-col justify-start items-start gap-3 w-full my-4">
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">Name</label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Name ..."
                  name="name"
                  value={chooseUsDetails.name}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Question
              </label>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Question ..."
                  name="question"
                  value={chooseUsDetails.question}
                  onChange={handleOnChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <label className="text-lg text-black dark:text-white">
                Answer
              </label>
              <div className="w-full">
                <textarea
                  name="answer"
                  rows={4}
                  value={chooseUsDetails.answer}
                  onChange={handleOnChange}
                  placeholder="Enter Answer..."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setIsCreateAndUpdateModel({
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
              onClick={() => handleOnClick(isCreateAndUpdateModel.for)}
              className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isLoading ? (
                <CircularProgress className="text-base" color="inherit" />
              ) : (
                <>
                  {isCreateAndUpdateModel.for === 'Update'
                    ? isCreateAndUpdateModel.for
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
