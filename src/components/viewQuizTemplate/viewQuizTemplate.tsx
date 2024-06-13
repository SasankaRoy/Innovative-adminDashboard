import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './viewQuizTemplate.css';
// import dotted from '../../assets/Dotted.png';
// import line from '../../assets/Line.png';
import rightPng from '../../assets/Right.png';
import { verifyToken } from '../../api-calls/apicalls';
// import correct from '../../assets/correct.png';
// import incorrect from '../../assets/incorrect.png';
import DefaultBanner from '../../assets/banner.png';
import MathGIF1 from '../../assets/Math1.gif';
import MathGIF2 from '../../assets/Math2.gif';
import MathGIF3 from '../../assets/Math3.gif';
import MathGIF4 from '../../assets/Math4.gif';

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
        className=" relative h-screen gradientBg__Quize"
        style={{ overflowY: 'hidden' }}
      >
        <div className="absolute opacity-60 w-[8%] left-[2%] bottom-[5%] rotate-45">
          <img src={MathGIF1} alt="" />
        </div>
        <div className="absolute opacity-60 w-[6%] right-[10%]  top-[40%]">
          <img src={MathGIF2} alt="" />
        </div>
        <div className="absolute opacity-60 w-[15%] right-[50%] top-[40%]">
          <img src={MathGIF3} alt="" />
        </div>
        <div className="absolute  opacity-60 w-[8%] right-[5%] bottom-[4%]">
          <img src={MathGIF4} alt="" />
        </div>

        <div className="w-full h-full overflow-y-auto p-4 ">
          {showAns ? (
            <>
              <Link
                to="/quiz-template-editor"
                className=" border-2 border-[#FFF]/30 rounded-lg shadow-lg bg-transparent text-white font-[400] text-base px-4 py-2"
              >
                Go Back
              </Link>
              {templateData.quizzes.map((currQuize: any, quizeId: any) => (
                <div
                  key={quizeId}
                  className="w-full   flex justify-center items-center"
                >
                  <div className="w-[70%] my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
                    <div className="flex flex-col justify-start items-start gap-8">
                      <div
                        className={` px-6 py-4 rounded-full  `}
                      >
                        <h2
                          className={`text-white font-[500] text-2xl text-center `}
                        >
                          <span>{quizeId + 1} .</span> {currQuize?.question}
                        </h2>
                      </div>

                      {/* OPTIONS */}

                      {ans[quizeId] === 'unattempted' ? (
                        <p className="text-white font-[500] text-xl">
                          No Attempted this question
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 w-[60%] gap-5 ">
                          {currQuize?.options.map(
                            (currOpt: any, optID: any) => (
                              <>
                                {currQuize?.options_type === 'image' ? (
                                  <>
                                    {/* IF THE OPTIONS ARE IMAGE'S */}
                                    <div
                                      key={optID}
                                      className={`flex items-center border-2 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer ${currQuize?.answer === currOpt && 'bg-[#22C55E]'} ${ans[quizeId] === optID && currQuize.answer != currOpt && 'bg-red-500/40'}`}
                                    >
                                      <span className="font-[400] text-lg justify-self-start">
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
                                      key={'optID'}
                                      className={`flex items-center border-2 border-[#FFF]/50 rounded-full text-white px-4 py-3  ${currQuize?.answer === currOpt && 'bg-[#22C55E]'} ${ans[quizeId] === optID && currQuize.answer != currOpt && 'bg-red-500/40'}`}
                                    >
                                      <span className="font-[400] text-lg justify-self-start">
                                        {ALPHABET[optID]} .
                                      </span>
                                      <h2 className="font-[500] capitalize text-xl mx-auto">
                                        {currOpt}
                                      </h2>
                                    </div>
                                  </>
                                )}
                              </>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {templateData && (
                <div className="h-[40%] overflow-hidden relative rounded-lg">
                  <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-white capitalize text-center font-[600] text-3xl my-2">
                      {templateData?.paper_name}
                    </h1>
                    <Link
                      to="/quiz-template-editor"
                      className=" border-none bg-transparent text-white font-[500] text-lg px-3 py-1"
                    >
                      Go Back
                    </Link>
                  </div>
                  <img
                    className="w-full h-full absolute top-0 left-0  object-cover brightness-75"
                    alt="banner"
                    src={
                      templateData?.banner ? templateData.banner : DefaultBanner
                    }
                  />
                </div>
              )}

              {templateData && templateData?.quizzes?.length !== 0 && (
                <div className="flex justify-center items-center gap-2  w-full mt-3 ">
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

                      <div
                        id={`dotted-${ind}`}
                        className="h-2 bg-[#FFF]/20 backdrop-blur-lg w-[10%] rounded-full"
                      />

                      <div
                        id={`line-${ind}`}
                        className="h-2 bg-[#FFF]/70 backdrop-blur-lg w-[40%] rounded-full"
                      />
                    </>
                  ))}
                </div>
              )}

              {templateData &&
                templateData?.quizzes?.length !== 0 &&
                templateData.quizzes.map((currQus: any, quizeId: any) => (
                  <>
                    {quizeId + 1 === pageNumber && (
                      <div
                        key={quizeId}
                        className="w-full   flex justify-center items-center"
                      >
                        <div className="w-[80%]  my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
                          <div className="flex flex-col justify-center items-center gap-8">
                            <div className="p-2 flex justify-center items-center w-full">
                              <div className='w-[85%] p-3'>
                                <h2 className="text-white font-[500] text-2xl text-left">
                                  <span>{quizeId + 1} .</span>{' '}
                                  {currQus?.question}
                                </h2>
                              </div>
                              <button
                                onClick={() => {
                                  handleSaveAndNext();
                                }}
                                className="text-white font-semibold text-lg  w-[10%] py-1 rounded-full border border-[#FFF]/50 hoverEffect__QuizeNextBTN"
                              >
                                Next
                              </button>
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
                                          className="flex items-center border-4 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer"
                                        >
                                          <span className="font-[400] text-lg justify-self-start">
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
                                          className="flex items-center border-2 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                                        >
                                          <span className="font-[400] text-lg justify-self-start">
                                            {ALPHABET[optID]} .
                                          </span>
                                          <h2 className="font-[500] capitalize text-xl mx-auto">
                                            {currOpt}
                                          </h2>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ),
                              )}
                            </div>

                            {/* <button
                              onClick={() => {
                                handleSaveAndNext();
                              }}
                              className="text-white font-semibold text-lg  w-[15%] py-2 rounded-full border-4 border-[#FFF]/50 hoverEffect__QuizeNextBTN"
                            >
                              Next
                            </button> */}
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
      </div>
    </>
  );
}

export default ViewQuizTemplate;
