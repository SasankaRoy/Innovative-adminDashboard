import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '../../images/AddIcon.jpg';
export const UpdateProductModel = ({ setIsCreateModel, pagetitle }: any) => {
  return (
    <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
      <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
        {/* heading and close button start */}
        <div className="flex justify-between items-center my-3">
          <h2 className="text-[800] text-3xl ">{pagetitle} update</h2>
          <button
            onClick={() => {
              setIsCreateModel(false);
            }}
            className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
          >
            <CloseRoundedIcon className="text-6xl" />
          </button>
        </div>
        {/* heading and close button end */}

        <div className="flex justify-start items-start flex-col gap-4">
          <div className="flex justify-start items-start flex-col gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Select product Category
            </label>
            <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
              <option>Select Category</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex justify-start items-start gap-3 w-full flex-col">
            <label className="text-lg text-black dark:text-white">
              Change Product Image
            </label>
            <div className="relative w-[80%] mx-auto rounded-md overflow-hidden h-44">
              <input hidden type="file" />
              <img
                src={AddIcon}
                alt="seleted-image-preview"
                className="absolute object-cover top-0 left-0 z-0 opacity-50 w-full h-full"
              />

              <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center">
                <button className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                  <CameraEnhanceRoundedIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Select File Template
            </label>
            <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
              <option>Select File Template</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Select Quzie Template
            </label>
            <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
              <option>Select Quzie Template</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Select MCQ Template
            </label>
            <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
              <option>Select MCQ Template</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Real Price
            </label>
            <input
              type="text"
              placeholder="Enter Real Price...."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Discount Price
            </label>
            <input
              type="text"
              placeholder="Enter Discount Price...."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Product Star
            </label>
            <input
              type="text"
              placeholder="Enter Product Star...."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex justify-end items-center gap-4 my-4 w-full">
            <button
              onClick={() => setIsCreateModel(false)}
              className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
