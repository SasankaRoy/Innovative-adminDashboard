import AddIcon from '../../images/AddIcon.jpg';
import AddIcon2 from '../../images/AddIcon2.jpg';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const UpdateGalleryModel = ({ setIsCreateModel, pagetitle }: any) => {
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

        {/* main section start */}
        <div className="flex flex-col justify-start items-start gap-3 w-[95%] mx-auto">
          <div className="flex justify-center items-start gap-2 flex-col w-full">
            <label id="Name" className="text-lg text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex justify-center items-start gap-2 flex-col w-full">
            <label id="Category" className="text-lg text-black dark:text-white">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter Category.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex justify-start items-start flex-col gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Previous Uploaded Image
            </label>
            <img
              className="w-[90%] h-44 object-cover mx-auto rounded-md"
              src={AddIcon}
            />
          </div>

          <div className="flex justify-start items-start flex-col gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Change Image
            </label>
            <div className="relative overflow-hidden w-[90%] h-44 mx-auto">
              <img
                className="absolute z-0 w-full h-full object-cover  rounded-md opacity-50"
                src={AddIcon2}
              />
              <div className="absolute w-full h-full z-10 flex justify-center items-center">
                <button className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                  <CameraEnhanceRoundedIcon />
                </button>
              </div>
            </div>
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
        {/* main section end */}
      </div>
    </div>
  );
};
