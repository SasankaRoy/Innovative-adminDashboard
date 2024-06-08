import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import CreateIcon from '@mui/icons-material/Create';
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
import {
  createQuizTemplates,
  deleteQuizTemplates,
  updateQuizTemplates,
} from '../../api-calls/apicalls';
import { useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddImg from '../../images/AddIcon2.jpg'

function QuizTable({ quizAllData }: any) {
  const [quizTemplates, setQuizTemplates] = useState<any[]>(quizAllData);
  const [paperName, setPaperName] = useState<string>('');
  const [update, setUpdate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [quizzesCnt, setQuizzesCnt] = useState<any[]>([]);
  const [optionsType, setOptionsType] = useState<any[]>([]);
  const [templateOptImages, setTemplateOptImages] = useState<any[]>([]);
  const [dbTemplateOptImages, setDbTemplateOptImages] = useState<any[]>([]);
  const [templateOptTexts, setTemplateOptTexts] = useState<any[]>([]);
  const [dbTemplateOptTexts, setDbTemplateOptTexts] = useState<any[]>([]);
  const [answerImages, setAnswerImages] = useState<any[]>([]);
  const [explainations, setExplainations] = useState<any[]>([]);
  const [banner, setBanner] = useState<string>('');
  const [dbBanner, setDbBanner] = useState<string>('');
  // const [marks, setMarks] = useState([])
  const [dbQuizzes, setDbQuizzes] = useState<any[]>([]);
  const [dbOptionsType, setDbOptionsType] = useState<any[]>([]);
  const [editQuizDocId, setEditQuizDocId] = useState<string>('');
  // const [dbMarks, setDbMarks] = useState([])
  const [dbAnswerImages, setDbAnswerImages] = useState<any[]>([]);
  const [dbExplainations, setDbExplainations] = useState<any[]>([]);
  const [dbTextAnswers, setDbTextAnswers] = useState<any[]>([]);
  const [dbQuestions, setDbQuestions] = useState<any[]>([]);
  const [alphabates, setAlphabates] = useState<string[]>(['A', 'B', 'C', 'D']);
  const [checked, setChecked] = useState<string>('');

  const navigate = useNavigate();

  const handleClose = () => {
    setUpdate(false);
    setDbQuizzes([]);
    setShowModal(false);
  };

  const handleQuizzesInputCnt = () => {
    const tempQuizzes = quizzesCnt;
    tempQuizzes.push(quizzesCnt.length + 1);
    setQuizzesCnt([...tempQuizzes]);
  };

  const handleSubBtns = (id: any, index: any) => {
    if (document.getElementById(`${id}`).value === 'off') {
      document.getElementById(`${id}`).value = 'on';
      let oppositeId = id;

      id.split('-').forEach((ele, index) => {
        if (index === 3) {
          id.split('-')[index] == 'image'
            ? oppositeId.replace('image', 'text')
            : oppositeId.replace('text', 'image');
        }
      });

      document.getElementById(`${oppositeId}`).value = 'off';

      let tempOptionsType = optionsType;
      if (id.includes('image')) {
        tempOptionsType[index] = 'image';
      } else if (id.includes('text')) {
        tempOptionsType[index] = 'text';
      }

      setOptionsType([...tempOptionsType]);
    } else if (document.getElementById(`${id}`).value == 'on') {
      document.getElementById(`${id}`).value = 'off';
      let oppositeId = id;

      id.split('-').forEach((ele, index) => {
        if (index === 3) {
          id.split('-')[index] == 'image'
            ? oppositeId.replace('image', 'text')
            : oppositeId.replace('text', 'image');
        }
      });

      document.getElementById(`${oppositeId}`).value = 'on';
      let tempOptionsType = optionsType;
      if (oppositeId.includes('image')) {
        tempOptionsType[index] = 'image';
      } else if (oppositeId.includes('text')) {
        tempOptionsType[index] = 'text';
      }

      setOptionsType([...tempOptionsType]);
    }
  };

  const imageFilesHandler = (
    e: any,
    operation: any,
    cntInd: any,
    optInd: any,
  ) => {
    let selectedImage = e.target.files[0];
    let tempTemplateImages =
      operation === 'add' ? templateOptImages : dbTemplateOptImages;
    if (selectedImage.type !== 'image/png') {
      alert('please select images');
      document.getElementById(
        `${operation}-opt-image-${cntInd}-${optInd}`,
      ).value = '';
      tempTemplateImages[cntInd].splice(1, optInd);
      return;
    } else if (
      Array.isArray(tempTemplateImages[cntInd]) &&
      tempTemplateImages[cntInd]?.length !== 0
    ) {
      tempTemplateImages[cntInd][optInd] = selectedImage;

      operation === 'add'
        ? setTemplateOptImages([...tempTemplateImages])
        : setDbTemplateOptImages([...tempTemplateImages]);
    } else {
      tempTemplateImages[cntInd] = [];
      tempTemplateImages[cntInd][optInd] = selectedImage;
      operation === 'add'
        ? setTemplateOptImages([...tempTemplateImages])
        : setDbTemplateOptImages([...tempTemplateImages]);
    }
  };

  const textOptHandler = (e: any, operation: any, cntInd: any, optInd: any) => {
    let selectedText = e.target.value;
    let tempTemplateTexts = templateOptTexts;

    if (
      Array.isArray(tempTemplateTexts[cntInd]) &&
      tempTemplateTexts[cntInd]?.length !== 0
    ) {
      tempTemplateTexts[cntInd][optInd] = selectedText;
      if (update) {
        document.getElementById(`db-opt-text-${cntInd}-${optInd}`).value =
          selectedText;
      }
      operation === 'add'
        ? setTemplateOptTexts([...tempTemplateTexts])
        : setDbTemplateOptTexts([...tempTemplateTexts]);
    } else {
      tempTemplateTexts[cntInd] = [];
      tempTemplateTexts[cntInd][optInd] = selectedText;
      if (update) {
        document.getElementById(`db-opt-text-${cntInd}-${optInd}`).value =
          selectedText;
      }
      operation === 'add'
        ? setTemplateOptTexts([...tempTemplateTexts])
        : setDbTemplateOptTexts([...tempTemplateTexts]);
    }
  };

  const answerImageFilesHandler = (e: any, operation: any, ind: any) => {
    // console.log(";;;",ind)
    let selectedImage = e.target.files[0];
    let tempAnswerImages = operation === 'add' ? answerImages : dbAnswerImages;
    // console.log(selectedImage.type)
    if (selectedImage.type !== 'image/png') {
      alert('please select images');
      document.getElementById(`add-img-answer-${ind}`).value = '';
      tempAnswerImages.splice(1, ind);
      return;
    } else {
      tempAnswerImages[ind] = selectedImage;
    }

    operation === 'add'
      ? setAnswerImages([...tempAnswerImages])
      : setDbAnswerImages([...tempAnswerImages]);
  };

  const handleCreate = async () => {
    let addData = new FormData();

    addData.append('paper_name', paperName);
    addData.append('banner', banner);
    optionsType.forEach((ot) => {
      addData.append('options_type', ot);
    });
    templateOptImages &&
      templateOptImages.length !== 0 &&
      templateOptImages.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append('options', tTemp);
          });
        }
      });
    answerImages &&
      answerImages.length !== 0 &&
      answerImages.forEach((ai) => {
        // console.log(answerImages)
        // if(ai){
        addData.append('answers', ai);
        // }
      });

    templateOptTexts &&
      templateOptTexts.length !== 0 &&
      templateOptTexts.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append('text_options', tTemp);
          });
        }
      });

    let tempAnswerText = [];
    quizzesCnt.forEach((mc, ind) => {
      addData.append(
        'question',
        document.getElementById(`add-question-${ind}`).value,
      );
      if (optionsType[ind] == 'text') {
        tempAnswerText[ind] = document.getElementById(
          `add-text-answer-${ind}`,
        ).value;
      }
    });

    if (tempAnswerText.length !== 0) {
      addData.append('answer_text', JSON.stringify(tempAnswerText));
    }

    explainations &&
      explainations.length !== 0 &&
      explainations.forEach((exp) => {
        addData.append('explaination', exp);
      });

    // marks && marks.length !== 0 && marks.forEach((mark) => {
    //   addData.append("mark", mark)
    // })

    let createdData = await createQuizTemplates(addData);
    // let tempCreatedData = [];
    // tempCreatedData.push(createdData);
    // setQuizTemplates([...quizTemplates, ...tempCreatedData]);
    // handleClose();
    // window.location.reload();
    if (
      createdData?.success === 'no' &&
      createdData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (createdData?.success === 'no') {
      alert('system error try again leter');
    } else if (createdData?.success === 'yes') {
      alert('quiz created successfully');
      handleClose();
      window.location.reload();
    }
  };

  // const handleMarks = async (e, operation, ind) => {
  //   let tempMarks = operation === "add" ? marks : dbMarks
  //   tempMarks[ind] = e.target.value
  //   operation === "add" ? setMarks([...tempMarks]) : setDbMarks([...tempMarks])
  // }

  // const handleDbQuestions = async (e, ind) => {
  //   let tempQuestions = dbQuestions
  //   tempQuestions[ind] = e.target.value
  //   setDbQuestions([...tempQuestions])
  // }

  const handleDelete = async (id: any) => {
    const deleteData = { quizDocId: id };
    const deletedData = await deleteQuizTemplates(deleteData);
    if (
      deletedData?.success === 'no' &&
      deletedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (deletedData?.success === 'no') {
      alert('system error try again leter');
    } else if (deletedData?.success === 'yes') {
      alert('quiz template deleted successfully');
      handleClose();
      window.location.reload();
    }
  };

  const handleExplainations = async (e: any, operation: any, ind: any) => {
    let tempExplainations =
      operation === 'add' ? explainations : dbExplainations;
    tempExplainations[ind] = e.target.value;
    operation === 'add'
      ? setExplainations([...tempExplainations])
      : setDbExplainations([...tempExplainations]);
  };

  const handleUpdate = async () => {
    let updateData = new FormData();

    updateData.append('quizDocId', editQuizDocId);
    updateData.append('paper_name', paperName);
    {
      banner && updateData.append('banner', banner);
    }

    let updatedDataToBackend: any[] = [];

    dbTemplateOptImages &&
      dbTemplateOptImages.length !== 0 &&
      dbTemplateOptImages.forEach((di: any, ind: any) => {
        if (di) {
          di.forEach((ele: any, eleInd: any) => {
            if (ele !== undefined) {
              updatedDataToBackend.push({
                db_options_replacable_option_type: 'image',
                db_options_replacable_question_no: ind,
                db_options_replacable_option_index: eleInd,
              });
              updateData.append(`db_options`, ele);
            }
          });
        }
      });

    dbTemplateOptTexts &&
      dbTemplateOptTexts.length !== 0 &&
      dbTemplateOptTexts.forEach((di: any, ind: number) => {
        if (di) {
          di.forEach((ele: any, eleInd: any) => {
            if (ele !== undefined) {
              updatedDataToBackend.push({
                db_options_text_replacable_option_type: 'text',
                db_options_text_replacable_question_no: ind,
                db_options_text_replacable_option_index: eleInd,
                db_options_text_data: ele,
              });
            }
          });
        }
      });

    dbAnswerImages &&
      dbAnswerImages.length !== 0 &&
      dbAnswerImages.forEach((di: any, ind: number) => {
        if (di) {
          // console.log("294",dbAnswerImages)

          if (di !== undefined) {
            updatedDataToBackend.push({
              db_answers_replacable_question_no: ind,
              db_image_answer_replacable_option_type: 'image',
            });
            updateData.append(`db_answers`, di);
          }
        }
      });

    dbTextAnswers &&
      dbTextAnswers.length !== 0 &&
      dbTextAnswers.forEach((dta: any, ind: number) => {
        if (dta) {
          updatedDataToBackend.push({
            db_text_answer_replacable_question_no: ind,
            db_text_answer_replacable_option_type: 'text',
            db_text_answer_data: dta,
          });
        }
      });

    dbExplainations &&
      dbExplainations.length !== 0 &&
      dbExplainations.forEach((dta: any, ind: any) => {
        if (dta) {
          updatedDataToBackend.push({
            db_explaination_replacable_question_no: ind,
            db_explaination_replacable_option_type: 'text',
            db_explaination_data: dta,
          });
        }
      });

    // dbMarks && dbMarks.length !== 0 && dbMarks.forEach((dta, ind) => {
    //   if (dta) {

    //     updatedDataToBackend.push({

    //       "db_marks_replacable_question_no": ind,
    //       "db_marks_replacable_option_type": "text",
    //       "db_marks_data": dta
    //     })

    //   }

    // })

    dbQuestions &&
      dbQuestions.length !== 0 &&
      dbQuestions.forEach((dta: any, ind: any) => {
        if (dta) {
          updatedDataToBackend.push({
            db_questions_replacable_question_no: ind,
            db_questions_replacable_option_type: 'text',
            db_questions_data: dta,
          });
        }
      });

    optionsType.forEach((ot: any) => {
      updateData.append('options_type', ot);
    });

    templateOptImages &&
      templateOptImages.length !== 0 &&
      templateOptImages.forEach((temp: any) => {
        if (temp) {
          temp.forEach((tTemp: any) => {
            updateData.append('options', tTemp);
          });
        }
      });
    answerImages &&
      answerImages.length !== 0 &&
      answerImages.forEach((ai) => {
        // console.log(answerImages)
        // if(ai){
        updateData.append('answers', ai);
        // }
      });

    templateOptTexts &&
      templateOptTexts.length !== 0 &&
      templateOptTexts.forEach((temp: any) => {
        if (temp) {
          temp.forEach((tTemp: any) => {
            updateData.append('text_options', tTemp);
          });
        }
      });

    let tempAnswerText = [];
    quizzesCnt.forEach((_: any, ind: any) => {
      updateData.append(
        'question',
        document.getElementById(`add-question-${ind}`).value,
      );
      if (optionsType[ind] == 'text') {
        tempAnswerText[ind] = document.getElementById(
          `add-text-answer-${ind}`,
        ).value;
      }
    });

    if (tempAnswerText.length !== 0) {
      updateData.append('answer_text', JSON.stringify(tempAnswerText));
    }

    explainations &&
      explainations.length !== 0 &&
      explainations.forEach((exp) => {
        updateData.append('explaination', exp);
      });

    // marks && marks.length !== 0 && marks.forEach((mark) => {
    //   updateData.append("mark", mark)
    // })

    updateData.append('updated_data', JSON.stringify(updatedDataToBackend));

    const updatedData = await updateQuizTemplates(updateData);

    if (
      updatedData?.success == 'no' &&
      updatedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (updatedData?.success == 'no') {
      alert('system error try again leter');
    } else if (updatedData?.success == 'yes') {
      alert('quiz template updated successfully');
      window.location.reload();
    }
  };

  const handleDbTextAnswers = (e: any, ind: any) => {
    let tempDbTextAnswers: any = dbTextAnswers;

    tempDbTextAnswers[ind] = e.target.value;
  };

  const handleDbQuestions = async (e: any, ind: any) => {
    let tempQuestions: any = dbQuestions;
    tempQuestions[ind] = e.target.value;
    setDbQuestions([...tempQuestions]);
  };

  useEffect(() => {
    if (quizzesCnt.length !== 0) {
      const index = quizzesCnt.length - 1;
      document.getElementById(`add-option-type-text-${index}`).value = 'off';
      document.getElementById(`add-option-type-image-${index}`).value = 'off';
    }
  }, [quizzesCnt]);

  useEffect(() => {
    if (dbQuizzes && dbQuizzes.length !== 0) {
      let tempDbOptionsType = dbOptionsType;
      dbQuizzes.forEach((dm, ind) => {
        if (dm?.options_type == 'image') {
          console.log(document.getElementById(`db-option-type-image-${ind}`));
          document.getElementById(`db-option-type-image-${ind}`).checked = true;
          tempDbOptionsType[ind] = 'image';
        } else if (dm?.options_type == 'text') {
          document.getElementById(`db-option-type-text-${ind}`).checked = true;
          tempDbOptionsType[ind] = 'text';
        }
      });

      setDbOptionsType([...tempDbOptionsType]);
      dbQuizzes.forEach((dm, ind) => {
        if (dm?.options_type == 'text') {
          dm.options.forEach((op, mInd) => {
            document.getElementById(`db-opt-text-${ind}-${mInd}`).value = op;
          });
          document.getElementById(`db-text-answer-${ind}`).value = dm?.answer;
        } else if (dm?.options_type == 'image') {
          document.getElementById(`db-attached-img-answer-${ind}`).src =
            dm?.answer;
        }

        // document.getElementById(`db-marks-${ind}`).value = dm?.mark
        document.getElementById(`db-explaination-${ind}`).value =
          dm?.explaination;
        document.getElementById(`db-question-${ind}`).value = dm?.question;
      });
    }
  }, [dbQuizzes]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Quiz Template Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() => {
              setUpdate(false);
              setShowModal(true);
            }}
            className="flex w-[25%] justify-center rounded-lg bg-primary py-2 font-medium text-gray hover:bg-opacity-90"
          >
            <AddIcon />
            Create
          </button>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/dashboard">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">
              Quiz Template Management
            </li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Serial No.
                </th>
                <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                  Quiz
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Preview
                </th>
                <th className="py-4 px-4 font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quizTemplates.map((temp: any, index: number) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {temp.paper_name}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <Link
                      to="/view-quiz-template"
                      state={{ templateData: temp }}
                      className="text-blue-500 font-bold text-center tracking"
                    >
                      View
                    </Link>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => {
                          // console.log("999",temp.mcqs)

                          setPaperName(temp?.paper_name);
                          setDbQuizzes(temp?.quizzes);
                          setEditQuizDocId(temp?._id);
                          setDbBanner(temp?.banner);
                          setUpdate(true);
                          setShowModal(true);
                        }}
                        className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                      >
                        <EditRoundedIcon />
                      </button>
                      <button
                        className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                        onClick={() => {
                          handleDelete(temp?._id);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
          <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[800] text-3xl ">
                {update ? 'Update Template' : 'Add Template'}
              </h2>
              <button
                onClick={() => {
                  handleClose();
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
                  value={paperName}
                  onChange={(e) => {
                    for (let temp of quizTemplates) {
                      if (e.target.value === temp?.paper_name) {
                        alert('paper name already taken');
                        return;
                      }
                    }
                    setPaperName(e.target.value);
                  }}
                />
              </div>
              {dbBanner && (
                <div className="mt-3">
                  <div className="flex flex-col justify-start items-start gap-3">
                    <label className="text-lg text-black dark:text-white">
                      Attached Banner
                    </label>
                    <img
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      src={dbBanner}
                    />
                  </div>
                </div>
              )}
              <div className="mt-3">
                <div className="flex flex-col justify-start items-start gap-3">
                  <label className="text-lg text-black dark:text-white">
                    {update ? 'Change Banner' : 'Add Banner'}
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e: any) => {
                      setBanner(e.target.files[0]);
                    }}
                  />
                </div>
              </div>

              <div className="mb-2 mt-3">
                {dbQuizzes && dbQuizzes.length !== 0 && (
                  <>
                    <label className="text-lg text-black dark:text-white">
                      Attached Mcqs
                    </label>

                    {dbQuizzes.map((dm: any, ind: any) => (
                      <>
                        <div>
                          <div className="flex flex-col justify-start items-start gap-3">
                            <label className="text-lg text-black dark:text-white">
                              {` ${ind + 1}.`}
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              placeholder="Enter question ...."
                              id={`db-question-${ind}`}
                              onChange={(e) => {
                                handleDbQuestions(e, ind);
                              }}
                            />
                          </div>
                          <div className="flex justify-between items-center my-4">
                            <h3 className="text-lg text-black dark:text-white">
                              Options Type
                            </h3>
                            <div className="flex justify-end items-center gap-3">
                              {dm?.options_type == 'text' && (
                                <div className="flex justify-center items-center gap-2">
                                  <label
                                    htmlFor={`db-option-type-text-${ind}`}
                                    className="text-lg cursor-pointer text-black dark:text-white"
                                  >
                                    Text
                                  </label>
                                  <input
                                    name={`db-optionType-text-${ind}`}
                                    type="radio"
                                    // className="cursor-pointer"
                                    // checked={checked === "text"}
                                    id={`db-option-type-text-${ind}`}
                                    onChange={() => {
                                      // setChecked("text")
                                      // handleSubBtns(`db-option-type-text-${ind}`, ind);
                                    }}
                                  />
                                </div>
                              )}
                              {dm?.options_type == 'image' && (
                                <div className="flex justify-center items-center gap-2">
                                  <label
                                    htmlFor={`db-option-type-image-${ind}`}
                                    className="text-lg cursor-pointer text-black dark:text-white"
                                  >
                                    Images
                                  </label>
                                  <input
                                    // checked={checked === "image"}
                                    name={`db-optionType-img-${ind}`}
                                    type="radio"
                                    // className="cursor-pointer"
                                    id={`db-option-type-image-${ind}`}
                                    onChange={() => {
                                      // setChecked("image")
                                      // handleSubBtns(`add-option-type-image-${ind}`, ind);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {dm?.options_type === 'text' && (
                          <div className="flex flex-col gap-3">
                            {dm?.options.map((_: any, index: any) => (
                              <div className="flex justify-between items-center w-full">
                                <div className="flex justify-start items-start flex-col gap-2 w-[100%]">
                                  <label className="text-md text-black dark:text-white">
                                    {`${alphabates[index]}`}
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder={`Enter Option ${alphabates[index]} ...`}
                                    id={`db-opt-text-${ind}-${index}`}
                                    onChange={(e) => {
                                      textOptHandler(e, 'update', ind, index);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {dm?.options_type === 'image' && (
                          <div className="flex flex-col gap-3">
                            {dm?.options.map((op: any, index: any) => (
                              <div className="flex justify-between items-center w-full">
                                <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                                  <label className="text-md text-black dark:text-white">
                                    {`${index + 1}`}
                                  </label>
                                  <p className="mt-3">
                                    already attached :
                                    <img
                                      src={op}
                                      alt="already attached image"
                                      className="h-50 w-50"
                                    />
                                  </p>
                                  <input
                                    type="file"
                                    className="w-full h-full object-cover"
                                    // placeholder="Enter Option A ..."
                                    id={`db-opt-image-${ind}-${index}`}
                                    onChange={(e) => {
                                      imageFilesHandler(
                                        e,
                                        'update',
                                        ind,
                                        index,
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {dm?.options_type == 'text' && (
                          <div className="flex flex-col justify-start items-start gap-2 w-[49%]">
                            <label className="text-lg text-black dark:text-white">
                              Answer
                            </label>

                            <input
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              placeholder="Enter Answer ...."
                              type="text"
                              id={`db-text-answer-${ind}`}
                              onChange={(e) => {
                                handleDbTextAnswers(e, ind);
                              }}
                            />
                          </div>
                        )}

                        {dm?.options_type == 'image' && (
                          <div className="flex flex-col justify-start items-start gap-2 w-[49%] mt-3">
                            <p>
                              Already attached answer:
                              <img
                                id={`db-attached-img-answer-${ind}`}
                                className="ms-2 h-50 w-50"
                                alt="answer"
                              />
                            </p>
                            <label className="text-lg text-black dark:text-white">
                              {update ? 'Change Answer:' : 'Answer'}
                            </label>

                            <input
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              placeholder="Enter Answer ...."
                              type="file"
                              id={`db-attached-img-answer-${ind}`}
                              onChange={(e) => {
                                answerImageFilesHandler(e, 'update', ind);
                              }}
                            />
                          </div>
                        )}

                        <div className="flex flex-col justify-start items-start gap-2">
                          <label className="text-lg text-black dark:text-white">
                            Explaination
                          </label>
                          <textarea
                            rows={4}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            placeholder="Explain ...."
                            id={`db-explaination-${ind}`}
                            onChange={(e: any) => {
                              handleExplainations(e, 'update', ind);
                            }}
                          ></textarea>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>

              <div className="flex justify-between items-center w-full mx-auto my-4">
                <h3 className="text-lg font-bold text-black dark:text-white">
                  Template Mcqs
                </h3>
                <button
                  onClick={() => {
                    handleQuizzesInputCnt();
                  }}
                  className="flex w-[20%] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  <AddRoundedIcon className="font-bold" /> Add Mcqs
                </button>
              </div>
            </div>

            {quizzesCnt.length !== 0 &&
              quizzesCnt.map((_, ind) => (
                <>
                  <div>
                    <div className='my-3 flex flex-col justify-start items-start gap-3'>
                      <label className="text-lg text-black dark:text-white">
                        {`Q${ind + 1}.`}
                      </label>
                      <div className="w-full flex justify-center gap-2 shadow-xl items-center flex-col h-36 rounded-md relative overflow-hidden">
                        <img src={AddImg} alt="Add" className='absolute object-cover w-full h-full'/>
                        <span className='h-10 w-10 z-10 cursor-pointer rounded-full bg-white flex justify-center items-center'>
                          <AddRoundedIcon className='text-2xl font-[800]' />
                        </span>
                        <h4 className="text-md z-10 text-white">Add Image for Question</h4>
                      </div>
                    </div>
                    <div className="my-5">
                    <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Image Description ...."
                        id={`add-question-${ind}`}
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start my-5 gap-3">
                      {/* <label className="text-lg text-black dark:text-white">
                        {`Q${ind + 1}.`}
                      </label> */}
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter question ...."
                        id={`add-question-${ind}`}
                      />
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <h3 className="text-lg text-black dark:text-white">
                        Options Type
                      </h3>
                      <div className="flex justify-end items-center gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <label
                            htmlFor={`add-option-type-text-${ind}`}
                            className="text-lg cursor-pointer text-black dark:text-white"
                          >
                            Text
                          </label>
                          <input
                            name={`optionType-text-${ind}`}
                            type="radio"
                            className="cursor-pointer"
                            checked={checked === 'text'}
                            id={`add-option-type-text-${ind}`}
                            onChange={() => {
                              setChecked('text');
                              handleSubBtns(`add-option-type-text-${ind}`, ind);
                            }}
                          />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <label
                            htmlFor={`add-option-type-image-${ind}`}
                            className="text-lg cursor-pointer text-black dark:text-white"
                          >
                            Images
                          </label>
                          <input
                            checked={checked === 'image'}
                            name={`optionType-img-${ind}`}
                            type="radio"
                            className="cursor-pointer"
                            id={`add-option-type-image-${ind}`}
                            onChange={() => {
                              setChecked('image');
                              handleSubBtns(
                                `add-option-type-image-${ind}`,
                                ind,
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {optionsType[ind] === 'text' && (
                    <div className="flex flex-col gap-3">
                      {[...Array(4)].map((_, index) => (
                        <div className="flex justify-between items-center w-full">
                          <div className="flex justify-start items-start flex-col gap-2 w-[100%]">
                            <label className="text-md text-black dark:text-white">
                              {`${alphabates[index]}`}
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              placeholder={`Enter Option ${alphabates[index]} ...`}
                              id={`add-opt-text-${ind}-${index}`}
                              onChange={(e) => {
                                textOptHandler(e, 'add', ind, index);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {optionsType[ind] === 'image' && (
                    <div className="flex flex-col gap-3">
                      {[...Array(4)].map((_, index) => (
                        <div className="flex justify-between items-center w-full">
                          <div className="flex justify-start items-start flex-col gap-2 w-[49%]">
                            <label className="text-md text-black dark:text-white">
                              {`${index + 1}`}
                            </label>
                            <input
                              type="file"
                              className="w-full h-full object-cover"
                              placeholder="Enter Option A ..."
                              id={`add-opt-image-${ind}-${index}`}
                              onChange={(e) => {
                                imageFilesHandler(e, 'add', ind, index);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {optionsType[ind] == 'text' && (
                    <div className="flex flex-col justify-start items-start gap-2 w-[49%]">
                      <label className="text-lg text-black dark:text-white">
                        Answer
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Answer ...."
                        type="text"
                        id={`add-text-answer-${ind}`}
                      />
                    </div>
                  )}

                  {optionsType[ind] == 'image' && (
                    <div className="flex flex-col justify-start items-start gap-2 w-[49%]">
                      <label className="text-lg text-black dark:text-white">
                        Answer
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Answer ...."
                        type="file"
                        id={`add-img-answer-${ind}`}
                        onChange={(e) => {
                          answerImageFilesHandler(e, 'add', ind);
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-start items-start gap-2">
                    <label className="text-lg text-black dark:text-white">
                      Explaination
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Explain ...."
                      onChange={(e) => {
                        handleExplainations(e, 'add', ind);
                      }}
                    ></textarea>
                  </div>
                </>
              ))}

            <div className="flex justify-end items-center gap-4 my-4">
              <button
                onClick={() => {
                  handleClose();
                }}
                className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={() => {
                  update ? handleUpdate() : handleCreate();
                }}
              >
                {update ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizTable;
