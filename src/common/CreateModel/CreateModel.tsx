import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import { useRef, useState } from 'react';
import AddIcon from '../../images/AddIcon2.jpg';

export const CreateModel = ({ setIsCreateModel, pagetitle }: any) => {
  const [isAddMCQ, setIsAddMCQ] = useState(false);
  const [optionType, setOptionType] = useState('text');
  const [selectedFiles, setSelectedFiles] = useState({
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    AnswerOption: '',
  });

  // for image option preview and upload....
  const optionARef = useRef(null);
  const optionBRef = useRef(null);
  const optionCRef = useRef(null);
  const optionDRef = useRef(null);
  const answeroptionRef = useRef(null);

  /**
   * The function `handleOptionChooseChange` sets the `optionType` state based on the checked value of an
   * input element.
   * @param e - The parameter `e` is an object that has a `target` property. The `target` property is
   * also an object that has `checked` and `value` properties.
   */
  const handleOptionChooseChange = (e: {
    target: { checked: any; value: any };
  }) => {
    const { checked, value } = e.target;
    if (checked) {
      setOptionType(value);
    }
  };

  const handleOptionFileChange = (e: any) => {
    const { name, files } = e.target;

    const rawFileData = new FileReader();

    rawFileData.readAsDataURL(files[0]);

    rawFileData.onload = (readed) => {
      setSelectedFiles({
        ...selectedFiles,
        [name]: readed.target?.result,
      });
    };
  };

  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">{pagetitle} update</h2>
            <button
              onClick={() => {
                setIsCreateModel(false);
                setIsAddMCQ(false);
              }}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>

          <div className="mt-3">
            <div className="flex flex-col justify-start items-start gap-3">
              <label className="text-lg text-black dark:text-white">
                Paper Name
              </label>
              <input
                type="text"
                placeholder="Enter Paper Name...."
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="flex justify-between items-center w-full mx-auto my-4">
              <h3 className="text-lg font-bold text-black dark:text-white">
                Template Mcqs
              </h3>
              <button
                onClick={() => setIsAddMCQ(true)}
                className="flex w-[20%] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                <AddRoundedIcon className="font-bold" /> Add{' '}
                {pagetitle.split(' ')[0]}
              </button>
            </div>
          </div>

          {isAddMCQ && (
            <>
              <div>
                <div className="flex flex-col justify-start items-start gap-3">
                  <label className="text-lg text-black dark:text-white">
                    Question
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter question ...."
                  />
                </div>
                <div className="flex justify-between items-center my-4">
                  <h3 className="text-lg text-black dark:text-white">
                    Options Type
                  </h3>
                  <div className="flex justify-end items-center gap-3">
                    <div className="flex justify-center items-center gap-2">
                      <label
                        htmlFor="text"
                        className="text-lg cursor-pointer text-black dark:text-white"
                      >
                        Text
                      </label>
                      <input
                        id="text"
                        name="optionType"
                        type="checkbox"
                        className="cursor-pointer"
                        value="text"
                        checked={optionType === 'text'}
                        onChange={handleOptionChooseChange}
                      />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <label
                        htmlFor="images"
                        className="text-lg cursor-pointer text-black dark:text-white"
                      >
                        Images
                      </label>
                      <input
                        id="images"
                        name="optionType"
                        type="checkbox"
                        className="cursor-pointer"
                        value="image"
                        onChange={handleOptionChooseChange}
                        checked={optionType === 'image'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {optionType === 'text' && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                      <label className="text-md text-black dark:text-white">
                        Option A
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Option A ..."
                      />
                    </div>
                    <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                      <label className="text-md text-black dark:text-white">
                        Option B
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Option B ..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                      <label className="text-md text-black dark:text-white">
                        Option C
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Option C ..."
                      />
                    </div>
                    <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                      <label className="text-md text-black dark:text-white">
                        Option D
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Option D ..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-start items-start gap-2 w-[49%]">
                      <label className="text-lg text-black dark:text-white">
                        Answer
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Answer ...."
                      />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2 w-[49%]">
                      <label className="text-lg text-black dark:text-white">
                        Marks
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Marks ...."
                      />
                    </div>
                  </div>
                </div>
              )}

              {optionType === 'image' && (
                <>
                  <div className="flex flex-col justify-center items-center gap-3 my-4">
                    <div className="flex justify-between items-center w-full ">
                      <div
                        onClick={() => optionARef.current.click()}
                        className="w-[49%] text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary shadow-md h-36 flex justify-center items-center rounded-md flex-col gap-2 relative overflow-hidden cursor-pointer"
                      >
                        {selectedFiles.OptionA ? (
                          <img
                            onClick={() => optionARef.current.click()}
                            className="w-full h-full object-cover"
                            src={selectedFiles?.OptionA}
                            alt="selected-file-preview"
                          />
                        ) : (
                          <>
                            <img
                              src={AddIcon}
                              className="absolute top-0  left-0 w-full h-full object-cover z-0 opacity-50 "
                              alt="add-icon"
                            />

                            <div className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-30">
                              <CameraEnhanceRoundedIcon className="text-3xl" />
                            </div>
                            <h2 className="text-lg text-black dark:text-white z-30">
                              Option A
                            </h2>
                          </>
                        )}

                        <input
                          type="file"
                          name="OptionA"
                          hidden
                          ref={optionARef}
                          onChange={handleOptionFileChange}
                        />
                      </div>
                      <div
                        onClick={() => optionBRef?.current.click()}
                        className="w-[49%] text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary shadow-md h-36 flex justify-center items-center rounded-md flex-col gap-2 relative overflow-hidden cursor-pointer"
                      >
                        {selectedFiles.OptionB ? (
                          <>
                            <img
                              className="w-full h-full object-cover"
                              src={selectedFiles?.OptionB}
                              alt="selected-file-preview"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={AddIcon}
                              className="absolute top-0  left-0 w-full h-full object-cover z-0 opacity-50 "
                              alt="add-icon"
                            />
                            <div className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                              <CameraEnhanceRoundedIcon className="text-3xl" />
                              <input type="hidden" />
                            </div>
                            <h2 className="text-lg text-black dark:text-white z-10">
                              Option B
                            </h2>
                          </>
                        )}

                        <input
                          type="file"
                          name="OptionB"
                          hidden
                          ref={optionBRef}
                          onChange={handleOptionFileChange}
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => optionCRef?.current.click()}
                      className="flex justify-between items-center w-full "
                    >
                      <div className="w-[49%] text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary shadow-md h-36 flex justify-center items-center rounded-md flex-col gap-2 relative overflow-hidden cursor-pointer">
                        {selectedFiles.OptionC ? (
                          <>
                            <img
                              src={selectedFiles?.OptionC}
                              alt="selected-file-preview"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={AddIcon}
                              className="absolute top-0  left-0 w-full h-full object-cover z-0 opacity-50 "
                              alt="add-icon"
                            />
                            <div className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                              <CameraEnhanceRoundedIcon className="text-3xl" />
                              <input type="hidden" />
                            </div>
                            <h2 className="text-lg text-black dark:text-white z-10">
                              Option C
                            </h2>
                          </>
                        )}

                        <input
                          type="file"
                          name="OptionC"
                          hidden
                          ref={optionCRef}
                          onChange={handleOptionFileChange}
                        />
                      </div>
                      <div
                        onClick={() => optionDRef?.current.click()}
                        className="w-[49%] text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary shadow-md h-36 flex justify-center items-center rounded-md flex-col gap-2 relative overflow-hidden cursor-pointer"
                      >
                        {selectedFiles.OptionD ? (
                          <>
                            <img
                              className="w-full h-full object-cover"
                              src={selectedFiles.OptionD}
                              alt="selected-files-preview"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={AddIcon}
                              className="absolute top-0  left-0 w-full h-full object-cover z-0 opacity-50 "
                              alt="add-icon"
                            />
                            <div className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                              <CameraEnhanceRoundedIcon className="text-3xl" />
                              <input type="hidden" />
                            </div>
                            <h2 className="text-lg text-black dark:text-white z-10">
                              Option D
                            </h2>
                          </>
                        )}

                        <input
                          type="file"
                          name="OptionD"
                          hidden
                          ref={optionDRef}
                          onChange={handleOptionFileChange}
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => answeroptionRef?.current.click()}
                      className="flex justify-start items-center w-full"
                    >
                      <div className="w-[49%] text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary shadow-md h-36 flex justify-center items-center rounded-md flex-col gap-2 relative overflow-hidden cursor-pointer">
                        {selectedFiles?.AnswerOption ? (
                          <img
                            className="w-full h-full object-cover"
                            src={selectedFiles?.AnswerOption}
                            alt="selected-file-preview"
                          />
                        ) : (
                          <>
                            <img
                              src={AddIcon}
                              className="absolute top-0  left-0 w-full h-full object-cover z-0 opacity-50 "
                              alt="add-icon"
                            />
                            <div className="dark:border-form-strokedark dark:bg-[#313d4a] dark:text-white cursor-pointer shadow-md h-12 w-12 rounded-full flex justify-center items-center  z-10">
                              <CameraEnhanceRoundedIcon className="text-3xl" />
                              <input type="hidden" />
                            </div>
                            <h2 className="text-lg text-black dark:text-white z-10">
                              Answer
                            </h2>
                          </>
                        )}

                        <input
                          type="file"
                          name="AnswerOption"
                          hidden
                          ref={answeroptionRef}
                          onChange={handleOptionFileChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="flex flex-col justify-start items-start gap-2">
            <label className="text-lg text-black dark:text-white">
              Explain
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Explain ...."
            ></textarea>
          </div>

          <div className="flex justify-end items-center gap-4 my-4">
            <button onClick={()=>setIsCreateModel(false)} className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
