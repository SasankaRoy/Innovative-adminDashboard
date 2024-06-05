import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const UpdateInvoiceManagement = ({
  setIsCreateModel,
  pagetitle,
}: any) => {
  // const [selectedOption, setSelectedOption] = useState<string>('');
  // const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  // const changeTextColor = () => {
  //   setIsOptionSelected(true);
  // };
  return (
    <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
      <div className="shadow-md p-4 w-[50%] max-h-[100%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-[800] text-3xl ">{pagetitle}</h2>
          <button
            onClick={() => setIsCreateModel(false)}
            className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
          >
            <CloseRoundedIcon className="text-6xl" />
          </button>
        </div>

        <div className="mt-4 flex flex-col justify-start items-start gap-3 w-full">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Company Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Company Name ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Company Address
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Company Address ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Company Phone No
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Company Phone No ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Company Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Company Email ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Invoice No
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Invoice No ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">Date</label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Date ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Billing Address
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Billing Address ..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Shipping Address
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Shipping Address ..."
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">TAX</label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter TAX ..."
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Quantity
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Quantity ..."
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Description
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Description ..."
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">
              Unit Price
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Unit Price ..."
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className=" block text-black dark:text-white">Total</label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Total ..."
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 mt-5 ">
          <button
            onClick={() => setIsCreateModel(false)}
            className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
          >
            Cancel
          </button>
          <button className="flex w-[15%] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
