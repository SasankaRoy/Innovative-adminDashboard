import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
// import AddIcon from '../../images/AddIcon2.jpg';

export const CreateModel = ({ setIsCreate, pageTitle }: any) => {
  return (
    <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
      <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-[800] text-3xl ">Create New {pageTitle}</h2>
          <button
            onClick={() => {
              setIsCreate(false);
            }}
            className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
          >
            <CloseRoundedIcon className="text-6xl" />
          </button>
        </div>

        <div className="flex flex-col justify-start items-start gap-4 my-4">
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter First Name ..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Last Name ..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">Email</label>
            <input
              type="email"
              placeholder="Enter Email..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label htmlFor="" className="text-lg text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label htmlFor="" className="text-lg text-balck dark:text-white">
              Select User Role
            </label>
            <select
              name=""
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id=""
            >
              <option value="Select role">Select Role</option>
              <option value="Select role">User 1</option>
              <option value="Select role">User 2</option>
              <option value="Select role">User3</option>
            </select>
          </div>

          <div className='flex justify-end items-center gap-4 w-full'>
            <button onClick={()=>setIsCreate(false)} className="flex w-[15%] justify-center rounded-lg bg-[#dc3545] p-3 font-medium text-gray hover:bg-opacity-90">Cancel</button>
            <button
            className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};
