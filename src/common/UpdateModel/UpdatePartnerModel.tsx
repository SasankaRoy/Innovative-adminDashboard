import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '../../images/AddIcon2.jpg';

export const UpdatePartnerModel = ({ setIsCreateModel, pagetitle }: any) => {
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

        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">Name</label>
            <input
              type="text"
              placeholder="Enter Name..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <label className="text-lg text-black dark:text-white">
              Change Image
            </label>
            <div className="relative h-44 w-[80%] mx-auto overflow-hidden rounded-md  fle">
              <input hidden type="file" />
              <img
                src={AddIcon}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="selected-file-preview"
              />

              <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                <button className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer dark:border-x-form-strokedark dark:bg-[#313d4a] dark:text-white">
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
            <button className="w-[15%] py-3 bg-primary font-medium rounded-lg text-gray hover:bg-opacity-90">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
