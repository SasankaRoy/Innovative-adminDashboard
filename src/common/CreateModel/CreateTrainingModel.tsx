// import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const CreateTrainingModel = ({ setIsCreateModel, pagetitle }: any) => {
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

        <div className='flex flex-col justify-start items-start gap-4 w-full'>
            <div className='flex flex-col justify-start items-start gap-3 w-full'>
                <label>Name</label>
                <input type="text" placeholder="Enter Name..." />
            </div>
        </div>
      </div>
    </div>
  );
};
