// import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const CreateChooseUsModel = ({ setIsCreateModel, pagetitle }: any) => {
  return (
    <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
      <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
        <div className="flex justify-between items-center my-4">
          <h2 className="font-[600] text-3xl">{pagetitle} Update</h2>
          <button
            onClick={() => setIsCreateModel(false)}
            className="hover:text-[#dc3545] transition-all duration-200 ease-in-out "
          >
            <CloseRoundedIcon className="text-6xl" />
          </button>
        </div>

        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Name..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Question
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Question..."
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">Answer</label>
            <input
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Answer..."
            />
          </div>

          <div className="flex justify-end items-center gap-4 my-4 w-full">
            <button
              onClick={() => setIsCreateModel(false)}
              className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button className="w-[15%] py-3 bg-primary font-medium rounded-lg text-gray hover:bg-opacity-90">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
