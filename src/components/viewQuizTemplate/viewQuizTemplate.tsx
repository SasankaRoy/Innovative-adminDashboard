import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './viewQuizTemplate.css';
import dotted from '../../assets/Dotted.png';
import line from '../../assets/Line.png';
import rightPng from '../../assets/Right.png';
import { verifyToken } from '../../api-calls/apicalls';
import correct from '../../assets/correct.png';
import incorrect from '../../assets/incorrect.png';
import DefaultBanner from '../../assets/banner.png';

function ViewQuizTemplate() {
  const location = useLocation();
  const { templateData } = location.state;
  const [pageNumber, setPageNumber] = useState(1);
  const [explaination, setExplaination] = useState('');
  const [explainationColor, setExplainationColor] = useState('');
  const [ans, setAns] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [sign, setSign] = useState([]);
  const [nextClicked, setNextClicked] = useState([]);
  const [ansSigns, setAnsSigns] = useState([]);
  const ALPHABET = ['A', 'B', 'C', 'D'];

  let QustionCounter = 0;

  const navigate = useNavigate();

  const handleSaveAndNext = async () => {
    let tempNextClicked: any = nextClicked;
    tempNextClicked.push('clicked'); //clicke used for just for mock data
    setNextClicked([...nextClicked]);

    let tempSign = sign;
    let tempAns = ans;
    let tempPageNo = pageNumber;

    if (isNaN(tempAns[tempPageNo - 1])) {
      tempAns[tempPageNo - 1] = 'unattempted';
      setAns([...tempAns]);
    }

    tempSign[pageNumber - 1] = 'right';
    setSign([...tempSign]);

    if (tempPageNo === templateData?.quizzes?.length) {
      setShowAns(true);
      return;
    }

    document.getElementById(`dotted-${tempPageNo - 1}`).style.display = 'none';
    document.getElementById(`line-${tempPageNo - 1}`).style.display = 'flex';

    setExplaination('');
    setPageNumber(tempPageNo + 1);
  };

  const handleClickedOption = (type: any, ind: any) => {
    templateData &&
      templateData?.quizzes?.length !== 0 &&
      templateData.quizzes[pageNumber - 1].options.forEach(
        (op: any, opInd: any) => {
          if (opInd === ind) {
            setExplainationColor('#03A500');

            let tempAns: any[] = ans;
            tempAns[pageNumber - 1] = ind;
            setAns([...tempAns]);

            setExplaination(templateData.quizzes[pageNumber - 1].explaination);
            document.getElementById(
              `main-div-${type}-option-${opInd}`,
            ).style.border = '2px solid #4ade80cc';
            templateData.quizzes[pageNumber - 1].options.forEach((_, opInd) => {
              document
                .getElementById(`${type}-option-${opInd}`)
                .addEventListener('click', function (event) {
                  event.stopPropagation();
                });
            });
          }
        },
      );
  };

  useEffect(() => {
    const verifier = async () => {
      const verifiedTokenData = await verifyToken();

      if (verifiedTokenData?.message === 'jwt expired') {
        return navigate('/');
      }
    };

    verifier();

    !showAns &&
      templateData &&
      templateData?.quizzes?.length !== 0 &&
      templateData?.quizzes.forEach((_, ind) => {
        if (ind === templateData?.quizzes.length - 1) {
          document.getElementById(`dotted-${ind}`).style.display = 'none';
          document.getElementById(`line-${ind}`).style.display = 'none';
        } else {
          document.getElementById(`dotted-${ind}`).style.display = 'flex';
          document.getElementById(`line-${ind}`).style.display = 'none';
        }
      });
  }, []);

  useEffect(() => {
    if (showAns == false) {
      setTimeout(async () => {
        if (nextClicked[pageNumber - 1] !== 'clicked') {
          await handleSaveAndNext();
        }
      }, 10000);
    }
  });

  useEffect(() => {
    // console.log("ans", ans)
    let tempAnsSign: any[] = [];
    if (ans.length === templateData?.quizzes?.length) {
      for (let i = 0; i < templateData.quizzes.length; i++) {
        for (let j = 0; j < templateData.quizzes[i].options.length; j++) {
          if (
            templateData.quizzes[i].answer ===
              templateData.quizzes[i].options[j] &&
            ans[i] == j
          ) {
            tempAnsSign[i] = 'correct';
            break;
          } else {
            tempAnsSign[i] = 'incorrect';
          }
        }
      }
      // console.log("PPPPP",tempAnsSign)
      setAnsSigns([...tempAnsSign]);
    }
  }, [ans]);

  return (
    <>
      <div className="p-4 " style={{ overflowY: 'auto' }}>
        {showAns ? (
          <>
            {templateData.quizzes.map((quiz: any, index: number) => (
              <div className="flex justify-start View_quiz_template_quiz mt-3 flex-column">
                <div className="flex">
                  <h5 className="ms-3 mt-3" style={{ whiteSpace: 'nowrap' }}>
                    {quiz?.question}
                  </h5>
                  {ansSigns[index] === 'correct' ? (
                    <img
                      src={correct}
                      className="mt-3 ms-3"
                      alt="correct"
                      style={{ height: '2%', width: '2%' }}
                    />
                  ) : (
                    <img
                      className="mt-3 ms-3"
                      style={{ height: '2%', width: '2%' }}
                      src={incorrect}
                      alt="incorrect"
                    />
                  )}
                </div>
                {ans[index] === 'unattempted' ? (
                  <p className="View_quiz_template_not_attempted">
                    Not Attempted
                  </p>
                ) : (
                  <div className="flex justify-center">
                    <div className="View_quiz_template_options_super_main grid grid-cols-2 gap-5 mb-3   ">
                      {quiz.options.map((op: any, ind: number) => (
                        <div className="View_quiz_template_options_main border border-secondary p-0">
                          {quiz?.options_type === 'image' ? (
                            <>
                              <p>{`${ALPHABET[ind]}.`}</p>
                              <img
                                className="View_quiz_template_options_img"
                                id={`img-option-${ind}`}
                                src={op}
                                alt="op-img"
                                style={{
                                  cursor: 'pointer',
                                }}
                              />
                              {quiz.answer === op ? (
                                <p className="View_quiz_template_correct_answer">
                                  correct answer
                                </p>
                              ) : (
                                ''
                              )}
                              {ans[index] === ind && quiz.answer != op ? (
                                <p className="View_quiz_template_incorrect_answer">
                                  incorrect answer
                                </p>
                              ) : (
                                ''
                              )}
                            </>
                          ) : (
                            <>
                              <p>{`${ALPHABET[ind]}.`}</p>
                              <div
                                className="View_quiz_template_options_text"
                                id={`text-option-${ind}`}
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                {op}
                              </div>
                              {quiz.answer === op ? (
                                <p className="View_quiz_template_correct_answer">
                                  correct answer
                                </p>
                              ) : (
                                ''
                              )}
                              {ans[index] === ind && quiz.answer != op ? (
                                <p className="View_quiz_template_incorrect_answer">
                                  incorrect answer
                                </p>
                              ) : (
                                ''
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {templateData && (
              <>
                <h1 className="text-black capitalize font-[600] text-2xl my-4">
                  {templateData?.paper_name}
                </h1>
                <img
                  className="w-full h-[40%] rounded-lg object-fill"
                  alt="banner"
                  src={
                    templateData?.banner ? templateData.banner : DefaultBanner
                  }
                />
              </>
            )}

            {templateData && templateData?.quizzes?.length !== 0 && (
              // View_quiz_template_pagination_mainWrapper
              <div className="flex justify-center items-center gap-2 w-full mt-3 ">
                {templateData?.quizzes?.map((_: any, ind: any) => (
                  <>
                    {sign[ind] === 'right' ? (
                      <img
                        className={'mt-0 ' + (ind === 0 ? 'ms-0' : '')}
                        id={`right-${ind}`}
                        src={rightPng}
                        alt="right"
                      />
                    ) : (
                      <p
                        className={
                          'mt-0 text-black font-[600] text-xl' +
                          (ind === 0 && 'ms-0')
                        }
                        id={`page-no-${ind}`}
                      >
                        {ind + 1}
                      </p>
                    )}
                    <img
                      id={`dotted-${ind}`}
                      alt="dotted"
                      src={dotted}
                      className="w-full  "
                    />
                    <img
                      id={`line-${ind}`}
                      alt="line"
                      src={line}
                      className="w-full "
                    />
                  </>
                ))}
              </div>
            )}

            <h3 className="mt-5 mb-3">
              Qustion {pageNumber} of {templateData.quizzes.length}
            </h3>

            <div className="flex justify-start View_quiz_template_quiz mt-3 flex-column p-5">
              {templateData &&
                templateData?.quizzes?.length !== 0 &&
                templateData.quizzes.map((quiz: any, quizInd: any) => (
                  <>
                    {quizInd + 1 === pageNumber && (
                      <div>
                        <div className="flex">
                          <h5
                            className=" text-black font-[500] text-2xl capitalize"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            <span className="text-xl">
                              {(QustionCounter += 1)}
                            </span>{' '}
                            . {quizInd + 1 === pageNumber ? quiz?.question : ''}
                          </h5>
                        </div>
                        <div className="flex justify-center">
                          <div className="grid grid-cols-1 gap-5 my-3">
                            {quiz.options.map((op: any, ind: any) => (
                              <div className="min-w-[40%] py-2">
                                {quiz?.options_type === 'image' ? (
                                  <div
                                    id={`main-div-img-option-${ind}`}
                                    className="w-full flex justify-start items-start gap-3 cursor-pointer p-3 rounded-xl"
                                    onClick={() => {
                                      handleClickedOption('img', ind);
                                    }}
                                  >
                                    <p className="text-lg font-[500]">{`${ALPHABET[ind]}.`}</p>

                                    <img
                                      className="h-32 w-32 object-contain"
                                      id={`img-option-${ind}`}
                                      src={op}
                                      alt="op-img"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    id={`main-div-text-option-${ind}`}
                                    className="flex justify-start items-center gap-3 p-2 rounded-lg w-full cursor-pointer"
                                    onClick={() => {
                                      handleClickedOption('text', ind);
                                    }}
                                  >
                                    <p className="text-lg font-[500]">{`${ALPHABET[ind]} .`}</p>
                                    <h2
                                      className="text-2xl font-[500] text-black"
                                      id={`text-option-${ind}`}
                                    >
                                      {op}
                                    </h2>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>

            {/* {explaination && (
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: `${explainationColor}` }}
                >
                  {explaination}
                </div>
              )} */}

            <div className="flex justify-center mt-5">
              <button
                className="btn btn-primary rounded"
                onClick={() => {
                  handleSaveAndNext();
                }}
              >
                Save and Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ViewQuizTemplate;
