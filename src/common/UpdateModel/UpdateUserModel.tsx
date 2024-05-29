import  { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const UpdateUserModel = ({setIsEditShow}:any) => {
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
}
