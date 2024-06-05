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
      // @ts-ignore
      tempAns[tempPageNo - 1] = 'unattempted';
      setAns([...tempAns]);
    }

    // @ts-ignore
    tempSign[pageNumber - 1] = 'right';
    setSign([...tempSign]);

    if (tempPageNo === templateData?.quizzes?.length) {
      setShowAns(true);
      return;
    }

    // @ts-ignore
    document.getElementById(`dotted-${tempPageNo - 1}`).style.display = 'none';
    // @ts-ignore
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
            // @ts-ignore
            setAns([...tempAns]);

            setExplaination(templateData.quizzes[pageNumber - 1].explaination);
            // @ts-ignore
            document.getElementById(
              `main-div-${type}-option-${opInd}`,
            ).style.background = '#22C55E';

            // @ts-ignore
            document.getElementById(
              `main-div-${type}-option-${opInd}`,
            ).style.transform = 'scale(1.1)';

            // @ts-ignore
            templateData.quizzes[pageNumber - 1].options.forEach((_, opInd) => {
              // @ts-ignore
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
      <div
        className="p-4 h-screen gradientBg__Quize"
        style={{ overflowY: 'auto' }}
      >
        {showAns ? (
          // <>

          //   {templateData.quizzes.map((quiz: any, index: number) => (
          //     <div className="flex justify-start items-start View_quiz_template_quiz p-4 mt-3 flex-col">
          //       <div className="flex">
          //         <h5
          //           className=" text-black text-2xl  font-[500] capitalize"
          //           style={{ whiteSpace: 'nowrap' }}
          //         >
          //           <span className="text-lg">{(QustionCounter = +1)}</span> .{' '}
          //           {quiz?.question}
          //         </h5>
          //         {ansSigns[index] === 'correct' ? (
          //           <img
          //             src={correct}
          //             className="mt-3 ms-3"
          //             alt="correct"
          //             style={{ height: '2%', width: '2%' }}
          //           />
          //         ) : (
          //           <img
          //             className="mt-3 ms-3"
          //             style={{ height: '2%', width: '2%' }}
          //             src={incorrect}
          //             alt="incorrect"
          //           />
          //         )}
          //       </div>
          //       {ans[index] === 'unattempted' ? (
          //         <p className="text-red-600 font-[600] text-center my-3 text-lg">
          //           Not Attempted
          //         </p>
          //       ) : (
          //         <div className="flex justify-center">
          //           <div className=" grid grid-cols-1 gap-5 my-3   ">
          //             {quiz.options.map((op: any, ind: number) => (
          //               <div
          //                 className={`flex justify-start items-start ${quiz.answer === op && 'bg-green-400/40'} ${ans[index] === ind && quiz.answer != op && 'bg-red-400/40'}  px-4 py-3`}
          //               >
          //                 {quiz?.options_type === 'image' ? (
          //                   <>
          //                     <p>{`${ALPHABET[ind]}.`}</p>
          //                     <img
          //                       className="h-28 w-28 object-cover"
          //                       id={`img-option-${ind}`}
          //                       src={op}
          //                       alt="op-img"
          //                       style={{
          //                         cursor: 'pointer',
          //                       }}
          //                     />
          //                   </>
          //                 ) : (
          //                   <div className="flex justify-start relative items-center gap-3 py-3 px-4 rounded-md">
          //                     <p
          //                       className={`text-lg font-[500] ${quiz.answer === op && 'text-green-600'} ${ans[index] === ind && quiz.answer != op && 'text-red-600'}`}
          //                     >{`${ALPHABET[ind]}.`}</p>
          //                     <h2
          //                       className={`text-black text-xl font-[600] ${quiz.answer === op && 'text-green-600'} ${ans[index] === ind && quiz.answer != op && 'text-red-600'} capitalize`}
          //                       id={`text-option-${ind}`}
          //                       style={{
          //                         cursor: 'pointer',
          //                       }}
          //                     >
          //                       {op}
          //                     </h2>
          //                   </div>
          //                 )}
          //               </div>
          //             ))}
          //           </div>
          //         </div>
          //       )}
          //     </div>
          //   ))}

          // </>
          <>
            {templateData.quizzes.map((currQuize: any, quizeId: any) => (
              <div
                key={quizeId}
                className="w-full   flex justify-center items-center"
              >
                <div className="max-w-[90%] min-w-[70%] my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
                  <div className="flex flex-col justify-center items-center gap-8">
                    <div className={`border-6 customBorder border-[#FFF]/50 px-6 py-4 rounded-full  `}>
                      <h2 className={`text-white font-bold text-3xl text-center `}>
                        <span>{quizeId + 1} .</span> {currQuize?.question}
                      </h2>
                    </div>

                    {/* OPTIONS */}
                    <div className="grid grid-cols-2 w-[60%] gap-5 ">
                      {currQuize?.options.map((currOpt: any, optID: any) => (
                        <>
                          {currQuize?.options_type === 'image' ? (
                            <>
                              {/* IF THE OPTIONS ARE IMAGE'S */}
                              <div
                                key={optID}
                                // id={`main-div-img-option-${optID}`}
                                // onClick={() => {
                                //   handleClickedOption('img', optID);
                                // }}
                                className={`flex items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer ${currQuize?.answer === currOpt && 'bg-[#22C55E]'} ${ans[quizeId] === optID && currQuize.answer != currOpt && 'bg-red-500/40'}`}
                              >
                                <span className="font-semibold text-lg justify-self-start">
                                  {'ALPHABET[optID]'} .
                                </span>
                                <img
                                  src={currOpt}
                                  id={`img-option-${optID}`}
                                  className=" w-[20%] mx-auto"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              {/* IF THE OPTIONS ARE TEXT */}
                              <div
                                key={'optID'}
                                // id={`main-div-text-option-${'optID'}`}
                                // onClick={() => {
                                //   handleClickedOption('text', 'optID');
                                // }}
                                className={`flex items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4  ${currQuize?.answer === currOpt && 'bg-[#22C55E]'} ${ans[quizeId] === optID && currQuize.answer != currOpt && 'bg-red-500/40'}`}
                              >
                                <span className="font-semibold text-lg justify-self-start">
                                  {ALPHABET[optID]} .
                                </span>
                                <h2 className="font-semibold capitalize text-2xl mx-auto">
                                  {currOpt}
                                </h2>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    </div>

                    {

                    }

                    {/* <button
                      onClick={() => {
                        handleSaveAndNext();
                      }}
                      className="text-white font-semibold text-xl  w-[15%] py-2 rounded-full border-4 border-[#FFF]/50 hoverEffect__QuizeNextBTN"
                    >
                      Next
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* {templateData && (
              <div className='h-[40%] overflow-hidden relative rounded-lg'>
                <div className='absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center'>

                <h1 className="text-white capitalize text-center font-[600] text-3xl my-4">
                  {templateData?.paper_name}
                </h1>
                </div>
                <img
                  className="w-full h-full absolute top-0 left-0  object-cover brightness-75"
                  alt="banner"
                  src={
                    templateData?.banner ? templateData.banner : DefaultBanner
                  }
                />
              </div>
            )} */}

            {templateData && templateData?.quizzes?.length !== 0 && (
              // View_quiz_template_pagination_mainWrapper
              <div className="flex justify-center items-center gap-2  w-full mt-3 ">
                {templateData?.quizzes?.map((_: any, ind: any) => (
                  <>
                    {console.log(templateData?.quizzes)}
                    {sign[ind] === 'right' ? (
                      <img
                        className={'mt-0 ' + (ind === 0 ? 'ms-0' : '')}
                        id={`right-${ind}`}
                        src={rightPng}
                        alt="right"
                      />
                    ) : (
                      <div
                        className={
                          'border-2 border-[#FFF]/50 h-8 w-8 rounded-full flex justify-center items-center' +
                          (ind === 0 && 'ms-0')
                        }
                        id={`page-no-${ind}`}
                      >
                        <h2 className="text-white font-[600] text-xl">
                          {ind + 1}
                        </h2>
                      </div>
                    )}
                    {/* <img
                      id={`dotted-${ind}`}
                      alt="dotted"
                      src={dotted}
                      className="w-[10%]"
                    /> */}
                    <div
                      id={`dotted-${ind}`}
                      className="h-2 bg-[#FFF]/20 backdrop-blur-lg w-[10%] rounded-full"
                    />
                    {/* <img
                      id={`line-${ind}`}
                      alt="line"
                      src={line}
                      className="w-[40%] "
                    /> */}
                    <div
                      id={`line-${ind}`}
                      className="h-2 bg-[#FFF]/70 backdrop-blur-lg w-[40%] rounded-full"
                    />
                  </>
                ))}
              </div>
            )}

            {/* <h3 className="mt-5 mb-3">
              Qustion {pageNumber} of {templateData.quizzes.length}
            </h3> */}

            {/* NO MATTER WHAT DO NOT DELETE THIS CODE */}

            {/* <div className="flex justify-start View_quiz_template_quiz mt-3 flex-column p-5">
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
            </div> */}

            {/* NO MATTER WHAT DO NOT DELETE THIS CODE */}

            {templateData &&
              templateData?.quizzes?.length !== 0 &&
              templateData.quizzes.map((currQus: any, quizeId: any) => (
                <>
                  {quizeId + 1 === pageNumber && (
                    <div
                      key={quizeId}
                      className="w-full   flex justify-center items-center"
                    >
                      <div className="max-w-[90%] min-w-[70%] my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
                        <div className="flex flex-col justify-center items-center gap-8">
                          <div className="border-6 customBorder border-[#FFF]/50 px-6 py-4 rounded-full">
                            <h2 className="text-white font-bold text-3xl text-center">
                              <span>{quizeId + 1} .</span> {currQus?.question}
                            </h2>
                          </div>

                          {/* OPTIONS */}
                          <div className="grid grid-cols-2 w-[60%] gap-5 ">
                            {currQus?.options.map(
                              (currOpt: any, optID: any) => (
                                <>
                                  {currQus?.options_type === 'image' ? (
                                    <>
                                      {/* IF THE OPTIONS ARE IMAGE'S */}
                                      <div
                                        key={optID}
                                        id={`main-div-img-option-${optID}`}
                                        onClick={() => {
                                          handleClickedOption('img', optID);
                                        }}
                                        className="flex items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer"
                                      >
                                        <span className="font-semibold text-lg justify-self-start">
                                          {ALPHABET[optID]} .
                                        </span>
                                        <img
                                          src={currOpt}
                                          id={`img-option-${optID}`}
                                          className=" w-[20%] mx-auto"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {/* IF THE OPTIONS ARE TEXT */}
                                      <div
                                        key={optID}
                                        id={`main-div-text-option-${optID}`}
                                        onClick={() => {
                                          handleClickedOption('text', optID);
                                        }}
                                        className="flex items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                                      >
                                        <span className="font-semibold text-lg justify-self-start">
                                          {ALPHABET[optID]} .
                                        </span>
                                        <h2 className="font-semibold capitalize text-2xl mx-auto">
                                          {currOpt}
                                        </h2>
                                      </div>
                                    </>
                                  )}
                                </>
                              ),
                            )}

                            {/* <div className="bg-green-500 flex  items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer">
                              <span className="font-semibold text-lg justify-self-start">
                                A .
                              </span>
                              <h2 className="font-semibold text-2xl mx-auto">
                                Hong Kong
                              </h2>
                            </div>

                            <div className=" flex  items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer">
                              <span className="font-semibold text-lg justify-self-start">
                                B .
                              </span>
                              <h2 className="font-semibold text-2xl mx-auto">
                                India
                              </h2>
                            </div>

                            <div className=" flex  items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer">
                              <span className="font-semibold text-lg justify-self-start">
                                C .
                              </span>
                              <h2 className="font-semibold text-2xl mx-auto">
                                UAE
                              </h2>
                            </div>
                            <div className="bg-red-500 flex  items-center border-6 border-[#FFF]/50 rounded-full text-white px-5 py-4 cursor-pointer">
                              <span className="font-semibold text-lg justify-self-start">
                                D .
                              </span>
                              <h2 className="font-semibold text-2xl mx-auto">
                                China
                              </h2>
                            </div> */}
                          </div>

                          <button
                            onClick={() => {
                              handleSaveAndNext();
                            }}
                            className="text-white font-semibold text-xl  w-[15%] py-2 rounded-full border-4 border-[#FFF]/50 hoverEffect__QuizeNextBTN"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}

            {/* <div className="w-full flex justify-center items-center">
              <div className="max-w-[70%]  py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
                <h2 className="text-white text-center text-2xl mb-2 font-semibold">
                  Explaination
                </h2>
                <p className="text-white text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima laboriosam provident sit ipsa mollitia debitis ad
                  sapiente dolor placeat rem amet necessitatibus reprehenderit
                  et, praesentium illo laudantium aliquam voluptatibus ullam?
                </p>
              </div>
            </div> */}

            {/* <div className="flex justify-center mt-5">
              <button
                className="bg-[#3C50E0] text-white w-[15%] py-3 text-lg font-[500] rounded-xl"
                onClick={() => {
                  handleSaveAndNext();
                }}
              >
                Save and Next
              </button>
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default ViewQuizTemplate;
