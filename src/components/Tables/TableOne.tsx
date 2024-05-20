import { useState } from 'react';
import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
// import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar } from '@mui/material';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'User-1',
    visitors: 1,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: '',
    name: 'User-2',
    visitors: 2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'User-3',
    visitors: 3,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'User-4',
    visitors: 4,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'User-5',
    visitors: 5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: BrandFive,
    name: 'User-5',
    visitors: 5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const TableOne = ({ title }: any) => {
  const [isEditShow, setIsEditShow] = useState(false);
  return (
    <>
      <div className="rounded-sm relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
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

          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-3 ${
                key === brandData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black  dark:text-white">{brand.visitors}</p>
              </div>

              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Avatar src={brand?.logo} />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5 p-2.5  xl:p-5">
                <button
                  onClick={() => setIsEditShow(true)}
                  className="h-9 w-9 flex justify-center items-center border-2 border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                >
                  <EditRoundedIcon />
                </button>
                <button className="h-9 w-9 flex justify-center items-center border-2 border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out">
                  <DeleteRoundedIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isEditShow && <EditModel setIsEditShow={setIsEditShow} />}
    </>
  );
};

export default TableOne;

const EditModel = ({ setIsEditShow }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[50%] h-[85%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">User update</h2>
            <button
              onClick={() => setIsEditShow(false)}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">First Name</label>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter First Name ..."
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">Last Name</label>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Last Name ..."
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Phone Number ..."
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">Email ID</label>
              <input
                type="email"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Email ID ..."
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Password ..."
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">Password</label>
              {/* <input
                className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-500 outline-none"
                placeholder="Enter Password ..."
              /> */}
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  defaultValue="user 1"
                  className="text-body dark:text-bodydark"
                >
                  User 1
                </option>
                <option value="user 2" className="text-body dark:text-bodydark">
                  User 2
                </option>
                <option value="user 3" className="text-body dark:text-bodydark">
                  User 3
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 mt-5 ">
            <button className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button className="flex w-[15%] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
