import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchServices } from '../../../api-calls/apicalls';
export const ServicesTable = ({ pagetitle, pageName }: any) => {
    const [servicesAllData,setServiceAllData] = useState([]);

    const getAllServicesData = async ()=>{
        const requestAllServiceData = await fetchServices();
        setServiceAllData(requestAllServiceData);
    }

    useEffect(()=>{
        getAllServicesData();
    },[])
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            //   onClick={() =>
            //     setIsCreateAndUpdateModel({
            //       state: true,
            //       for: 'Create',
            //       needToUpdate: '',
            //     })
            //   }
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
                    // onClick={() =>
                    //   setIsCreateAndUpdateModel({
                    //     state: true,
                    //     for: 'Update',
                    //     needToUpdate: cur,
                    //   })
                    // }
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
    </>
  );
};
