import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { createPartners, fetchPartners, updatePartners } from '../../../api-calls/apicalls';
import AddImgBg from '../../../images/AddIcon2.jpg';
import toast from 'react-hot-toast';

export const PartnerTable = ({ pagetitle, pageName }: any) => {
  const [allPartnerData, setAllPartnerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createUpdateModel, setCreateUpdateModel] = useState({
    state: false,
    for: '',
    needToUpdate: '',
  });

  const getAllPartnersData = async () => {
    const requestPartnerData = await fetchPartners();
    setAllPartnerData([...requestPartnerData]);
  };

  useEffect(() => {
    getAllPartnersData();
  }, [createUpdateModel]);
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() =>
              setCreateUpdateModel({
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

          {allPartnerData.map((cur: any, key: any) => (
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
                        setCreateUpdateModel({
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

      {createUpdateModel.state && (
        <CreateAndUpdateModel
          createUpdateModel={createUpdateModel}
          setCreateUpdateModel={setCreateUpdateModel}
        />
      )}
    </>
  );
};

const CreateAndUpdateModel = ({
  createUpdateModel,
  setCreateUpdateModel,
}: any) => {
    
  const [isLoading, setIsLoading] = useState(false);
  const [rawImgFile, setRawImgFile] = useState();
  const [partnerName, setPartnerName] = useState(createUpdateModel.needToUpdate?.name);
  const [imagPreview, setImgPreview] = useState(createUpdateModel.needToUpdate?.image);
  const navigate = useNavigate();

  //   Code below is for preview choosen image....
  const imageRef = useRef<HTMLInputElement>(null);
  const handleChoosenImgPreview = (imageFile: any) => {
    const fileData = new FileReader();
    fileData.readAsDataURL(imageFile);

    fileData.onload = (result) => {
      if (result.target?.result) {
        setImgPreview(result.target?.result);
      }
    };
  };

  const handleClick = async () => {
    if (createUpdateModel.for === 'Update') {
      // code to update the existing partner....
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', partnerName);
      formData.append('partner', rawImgFile);
      formData.append('partner_id', createUpdateModel.needToUpdate?._id);

      const requestToUpdateParnter = await updatePartners(formData);

      if (
        requestToUpdateParnter?.success === 'no' &&
        requestToUpdateParnter?.message === 'jwt expired'
      ) {
        setIsLoading(false);
        toast.error('Oops! Session Expired');
        navigate('/');
        return;
      } else if (requestToUpdateParnter?.success === 'no') {
        setIsLoading(false);
        toast.error('system error try again leter');
      } else if (requestToUpdateParnter?.success === 'yes') {
        toast.success('partner Updated successfully');
        setIsLoading(false);
        setCreateUpdateModel({
          state: false,
          for: '',
          needToUpdate: '',
        });
      }

      return;
    }

    // code to create new partner....
    setIsLoading(true);
    const formData = new FormData();

    formData.append('name', partnerName);
    formData.append('partner', rawImgFile);

    const requestTOCreatePartner = await createPartners(formData);

    if (
      requestTOCreatePartner?.success === 'no' &&
      requestTOCreatePartner?.message === 'jwt expired'
    ) {
      setIsLoading(false);
      toast.error('Oops! Session Expired');
      navigate('/');
      return;
    } else if (requestTOCreatePartner?.success === 'no') {
      setIsLoading(false);
      toast.error('system error try again leter');
    } else if (requestTOCreatePartner?.success === 'yes') {
      toast.success('partner created successfully');
      setIsLoading(false);
      setCreateUpdateModel({
        state: false,
        for: '',
        needToUpdate: '',
      });
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full backdrop-blur-md EditModelZindex">
      <div className="shadow-md p-4 w-[95%] xl:w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-[800] text-3xl ">
            {createUpdateModel.for === 'Update'
              ? createUpdateModel.for
              : createUpdateModel.for}{' '}
            Modules
          </h2>
          <button
            onClick={() => {
              // handleClose();
              setCreateUpdateModel({
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

        <div className="flex flex-col justify-start items-start gap-3 my-4">
          <div className="flex justify-start items-start flex-col gap-2 w-full">
            <label className="text-lg text-black dark:text-white">Name</label>
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter Name ..."
                name="name"
                value={partnerName}
                onChange={(e: any) => setPartnerName(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-lg text-black dark:text-white">Image</label>
            <div className="relative w-full h-44 rounded-lg overflow-hidden">
              <input
                ref={imageRef}
                onChange={(e: any) => {
                  setRawImgFile(e.target.files[0]);
                  handleChoosenImgPreview(e.target.files[0]);
                }}
                type="file"
                name="image"
                hidden
              />
              <img
                className="w-full h-full object-cover"
                src={imagPreview ? imagPreview : AddImgBg}
                alt="choose-partner-image"
              />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                <button
                  onClick={() => imageRef.current && imageRef.current.click()}
                  className="h-10 w-10 bg-white text-black text-2xl rounded-full shadow-md flex justify-center items-center"
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5 w-full">
            <button
              onClick={() => {
                setCreateUpdateModel({
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
              onClick={handleClick}
              className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isLoading ? (
                <CircularProgress className="text-base" color="inherit" />
              ) : (
                <>
                  {createUpdateModel.for === 'Update'
                    ? createUpdateModel.for
                    : 'Create'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
