// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Nav from "../navbar/navbar";
// import Sidebar from "../sidebar/sidebar";

// import dotted from '../../assets/Dotted.png';
// import line from '../../assets/Line.png';
// import rightPng from '../../assets/Right.png';
// import wrongPng from '../../assets/Wrong.png';
// import {
//   updateMcqTemplatesAttempts,
//   verifyToken,
// } from '../../api-calls/apicalls';
// import correct from '../../assets/correct.png';
// import incorrect from '../../assets/incorrect.png';

// import MathGIF1 from '../../assets/Math1.gif';
// import MathGIF2 from '../../assets/Math2.gif';
// import MathGIF3 from '../../assets/Math3.gif';
// import MathGIF4 from '../../assets/Math4.gif';

// function ViewMcqTemplate() {
//   // const location = useLocation();
//   // const ADMIN_EMAIL = 'admin@gmail.com'; //temporary
//   // const { templateData } = location.state;
//   // const [ansSigns, setAnsSigns] = useState<any[]>([]);
//   // // const [windowWidth, setWindowWidth] = useState();
//   // const [pageNumber, setPageNumber] = useState(1);
//   // const [explaination, setExplaination] = useState('');
//   // const [explainationColor, setExplainationColor] = useState('');
//   // const [ans, setAns] = useState<any[]>([]);
//   // const [showAns, setShowAns] = useState(false);
//   // const [sign, setSign] = useState<any[]>([]);
//   // const [answered, setAnswered] = useState(false);
//   // const navigate = useNavigate();
//   // const ALPHABET = ['A', 'B', 'C', 'D'];

//   // let QustionCounter = 0;

//   // const handleSaveAndNext = async () => {
//   //   let tempSign: any = sign;
//   //   let tempAns: any = ans;
//   //   let tempPageNo: any = pageNumber;

//   //   if (answered == false) {
//   //     tempAns[tempPageNo - 1] = 'unattempted';
//   //     setAns([...tempAns]);
//   //   } else if (answered == true) {
//   //     setAnswered(false);
//   //   }

//   //   let dbAns: any[] = [];
//   //   tempAns.forEach((t: any) => {
//   //     if (t !== 'unattempted') {
//   //       dbAns.push(t.toString());
//   //     } else {
//   //       dbAns.push('unattempted');
//   //     }
//   //   });

//   //   let updateData = {
//   //     update_attempt: 'yes',
//   //     mcqDocId: templateData?._id,
//   //     user_email: ADMIN_EMAIL,
//   //     last_visited_question: pageNumber,
//   //     given_answers: dbAns,
//   //   };

//   //   await updateMcqTemplatesAttempts(updateData);

//   //   if (tempPageNo == templateData?.mcqs?.length) {
//   //     setShowAns(true);
//   //     setExplaination('');
//   //     return;
//   //   }

//   //   document.getElementById(`dotted-${pageNumber - 1}`).style.display = 'none';
//   //   document.getElementById(`line-${pageNumber - 1}`).style.display = 'flex';

//   //   templateData.mcqs[pageNumber - 1].options.forEach((_: any, opInd: any) => {
//   //     if (ans[pageNumber - 1] === 'unattempted') {
//   //       tempSign[pageNumber - 1] = 'unsigned';
//   //       setSign([...tempSign]);
//   //     } else if (
//   //       templateData.mcqs[pageNumber - 1].answer ===
//   //       templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]
//   //     ) {
//   //       tempSign[pageNumber - 1] = 'right';
//   //       setSign([...tempSign]);
//   //     } else if (
//   //       templateData.mcqs[pageNumber - 1].answer !==
//   //       templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]
//   //     ) {
//   //       tempSign[pageNumber - 1] = 'wrong';
//   //       setSign([...tempSign]);
//   //     }
//   //   });

//   //   setExplaination('');
//   //   setPageNumber(tempPageNo + 1);
//   // };

//   // const handleClickedOption = (type: any, ind: any) => {
//   //   // console.log("click",ind)
//   //   templateData &&
//   //     templateData?.mcqs?.length !== 0 &&
//   //     templateData.mcqs[pageNumber - 1].options.forEach(
//   //       (op: any, opInd: any) => {
//   //         if (opInd === ind) {
//   //           if (op === templateData.mcqs[pageNumber - 1].answer) {
//   //             // console.log("{correct}",opInd+"---"+ind)
//   //             setExplainationColor('#03A500');

//   //             setAnswered(true);

//   //             let tempAns = ans;
//   //             tempAns[pageNumber - 1] = ind;
//   //             setAns([...tempAns]);

//   //             setExplaination(templateData.mcqs[pageNumber - 1].explaination);

//   //             document.getElementById(
//   //               `main-div-${type}-option-${ind}`,
//   //             ).style.background = '#22C55E';

//   //             templateData.mcqs[pageNumber - 1].options.forEach(
//   //               (_: any, opInd: any) => {
//   //                 document
//   //                   .getElementById(`main-div-${type}-option-${opInd}`)
//   //                   .addEventListener('click', function (event) {
//   //                     event.stopPropagation();
//   //                   });
//   //               },
//   //             );
//   //           } else {
//   //             // console.log("{incorrect}",opInd+"---"+ind)

//   //             setExplainationColor('#03A500');

//   //             setAnswered(true);

//   //             let tempAns = ans;
//   //             tempAns[pageNumber - 1] = ind;
//   //             setAns([...tempAns]);

//   //             setExplaination(templateData.mcqs[pageNumber - 1].explaination);

//   //             document.getElementById(
//   //               `main-div-${type}-option-${ind}`,
//   //             ).style.background = 'red';

//   //             templateData.mcqs[pageNumber - 1].options.forEach(
//   //               (op: any, opInd: any) => {
//   //                 if (op === templateData.mcqs[pageNumber - 1].answer) {
//   //                   document.getElementById(
//   //                     `main-div-${type}-option-${opInd}`,
//   //                   ).style.background = '#22C55E';
//   //                 }
//   //               },
//   //             );

//   //             templateData.mcqs[pageNumber - 1].options.forEach(
//   //               (_: any, opInd: any) => {
//   //                 document
//   //                   .getElementById(`${type}-option-${opInd}`)
//   //                   .addEventListener('click', function (event) {
//   //                     event.stopPropagation();
//   //                   });
//   //               },
//   //             );
//   //           }
//   //         }
//   //       },
//   //     );
//   // };

//   // useEffect(() => {
//   //   const verifier = async () => {
//   //     const verifiedTokenData = await verifyToken();

//   //     if (verifiedTokenData?.message === 'jwt expired') {
//   //       navigate('/');
//   //     }
//   //   };

//   //   verifier();

//   //   !showAns &&
//   //   templateData &&
//   //   Array.isArray(templateData?.attempted) &&
//   //   templateData?.attempted?.length !== 0
//   //     ? templateData?.attempted.forEach((tat: any, _: any) => {
//   //         if (tat?.user_email === ADMIN_EMAIL) {
//   //           let tempAns = [];

//   //           // console.log("230")

//   //           //change lines
//   //           for (let i = 0; i < parseInt(tat?.last_visited_question); i++) {
//   //             if (i == templateData?.mcqs?.length - 1) {
//   //               document.getElementById(`dotted-${i}`).style.display = 'none';
//   //               document.getElementById(`line-${i}`).style.display = 'none';
//   //             } else {
//   //               document.getElementById(`dotted-${i}`).style.display = 'none';
//   //               document.getElementById(`line-${i}`).style.display = 'flex';
//   //             }
//   //           }

//   //           for (
//   //             let i = parseInt(tat?.last_visited_question);
//   //             i < templateData?.mcqs?.length;
//   //             i++
//   //           ) {
//   //             if (i == templateData?.mcqs?.length - 1) {
//   //               document.getElementById(`dotted-${i}`).style.display = 'none';
//   //               document.getElementById(`line-${i}`).style.display = 'none';
//   //             } else {
//   //               document.getElementById(`dotted-${i}`).style.display = 'none';
//   //               document.getElementById(`line-${i}`).style.display = 'flex';
//   //             }
//   //           }

//   //           //change signs
//   //           for (let ga = 0; ga < tat?.given_answers?.length; ga++) {
//   //             if (tat?.given_answers[ga] == 'unattempted') {
//   //               let tempSign = sign;
//   //               tempSign[ga] = 'unsigned';
//   //               setSign([...tempSign]);
//   //             } else if (
//   //               templateData?.mcqs[ga]?.options[
//   //                 parseInt(tat?.given_answers[ga])
//   //               ] === templateData?.mcqs[ga]?.answer
//   //             ) {
//   //               let tempSign = sign;
//   //               tempSign[ga] = 'right';
//   //               setSign([...tempSign]);
//   //             } else if (
//   //               templateData?.mcqs[ga]?.options[
//   //                 parseInt(tat?.given_answers[ga])
//   //               ] !== templateData?.mcqs[ga]?.answer
//   //             ) {
//   //               let tempSign = sign;
//   //               tempSign[ga] = 'wrong';
//   //               setSign([...tempSign]);
//   //             }

//   //             tempAns[ga] =
//   //               tat?.given_answers[ga] == 'unattempted'
//   //                 ? 'unattempted'
//   //                 : parseInt(tat?.given_answers[ga]);
//   //           }

//   //           for (
//   //             let sga = tat?.given_answers?.length;
//   //             sga < templateData?.mcqs?.length;
//   //             sga++
//   //           ) {
//   //             let tempSign = sign;
//   //             tempSign[sga] = 'unsigned';
//   //             setSign([...tempSign]);
//   //           }

//   //           tempAns.length !== 0 && setAns([...tempAns]);
//   //           parseInt(tat?.last_visited_question) == templateData?.mcqs?.length
//   //             ? setShowAns(true)
//   //             : setPageNumber(parseInt(tat?.last_visited_question) + 1);
//   //         }
//   //       })
//   //     : templateData?.mcqs.forEach((tat: any, _: any) => {
//   //         //  console.log("283")

//   //         for (let i = 0; i < templateData?.mcqs?.length; i++) {
//   //           if (i === templateData?.mcqs.length - 1) {
//   //             document.getElementById(`dotted-${i}`).style.display = 'none';
//   //             document.getElementById(`line-${i}`).style.display = 'none';
//   //           } else {
//   //             document.getElementById(`dotted-${i}`).style.display = 'none';
//   //             document.getElementById(`line-${i}`).style.display = 'flex';
//   //           }
//   //         }

//   //         for (let ga = 0; ga < templateData?.mcqs?.length; ga++) {
//   //           let tempSign = sign;
//   //           tempSign[ga] = 'unsigned';
//   //           setSign([...tempSign]);
//   //         }
//   //       });
//   // }, []);

//   // useEffect(() => {
//   //   let tempAnsSign = [];
//   //   if (ans.length === templateData?.mcqs?.length) {
//   //     for (let i = 0; i < templateData.mcqs.length; i++) {
//   //       for (let j = 0; j < templateData.mcqs[i].options.length; j++) {
//   //         if (
//   //           templateData.mcqs[i].answer === templateData.mcqs[i].options[j] &&
//   //           ans[i] == j
//   //         ) {
//   //           tempAnsSign[i] = 'correct';
//   //           break;
//   //         } else {
//   //           tempAnsSign[i] = 'incorrect';
//   //         }
//   //       }
//   //     }

//   //     setAnsSigns([...tempAnsSign]);
//   //   }
//   // }, [ans]);

//   return (
//     <>
//       {/* <div
//         className="h-screen relative gradientBg__MCQ"
//         style={{
//           overflowY: 'hidden',
//         }}
//       >
//         <div className="absolute  opacity-60 w-[8%] left-[2%] bottom-[5%] rotate-45">
//           <img src={MathGIF1} alt="" />
//         </div>
//         <div className="absolute  opacity-60 w-[6%] right-[10%]  top-[40%]">
//           <img src={MathGIF2} alt="" />
//         </div>
//         <div className="absolute  opacity-40 w-[15%] right-[50%] top-[40%]">
//           <img src={MathGIF3} alt="" />
//         </div>
//         <div className="absolute  opacity-60 w-[8%] right-[5%] bottom-[4%]">
//           <img src={MathGIF4} alt="" />
//         </div>

//         <div className="w-full h-full p-5 overflow-y-auto">
//           {showAns ? (
//             <>
//               <Link
//                 to="/mcq-template-editor"
//                 className=" border-2 border-[#FFF]/30 rounded-lg shadow-lg bg-transparent text-white font-[400] text-base px-4 py-2"
//               >
//                 Go Back
//               </Link>
//               {templateData.mcqs.map((mcq: any, index: any) => (
//                 <div
//                   key={index}
//                   className="w-full flex justify-center items-center"
//                 >
//                   <div className="max-w-[90%] min-w-[70%] my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
//                     <div className="flex flex-col justify-center items-center gap-8">

//                       <div className="border-4 customBorder border-[#FFF]/50 px-6 py-4 rounded-full">
//                         <h2 className="text-white font-bold text-2xl text-center">
//                           <span>{index + 1} .</span> {mcq?.question}
//                         </h2>
//                       </div>

//                       {ans[index] === 'unattempted' ? (
//                         <p className="text-white font-semibold text-xl">
//                           No Attempted this question
//                         </p>
//                       ) : (
//                         <div className="grid grid-cols-2 w-[60%] gap-5 ">
//                           {mcq?.options.map((currOpt: any, optID: any) => (
//                             <>
//                               {mcq?.options_type === 'image' ? (
//                                 <>

//                                   <div
//                                     key={optID}
//                                     // id={`main-div-img-option-${optID}`}
//                                     id={`img-option-${optID}`}
//                                     className={`flex items-center border-4 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer ${mcq.answer === optID && 'bg-green-400/30'} ${ans[index] === optID && mcq.answer != optID && 'bg-red-600/50'}`}
//                                   >
//                                     <span className="font-semibold text-lg justify-self-start">
//                                       {ALPHABET[optID]} .
//                                     </span>
//                                     <img
//                                       src={currOpt}
//                                       id={`img-option-${optID}`}
//                                       className=" w-[20%] mx-auto"
//                                     />
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>

//                                   <div
//                                     key={optID}
//                                     // id={`main-div-text-option-${optID}`}
//                                     id={`text-option-${optID}`}
//                                     className={`flex items-center border-4 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer ${mcq.answer === currOpt && 'bg-green-400/30'} ${ans[index] === optID && mcq.answer != optID && 'bg-red-600/50'}`}
//                                   >
//                                     <span className="font-semibold text-lg justify-self-start">
//                                       {ALPHABET[optID]} .
//                                     </span>
//                                     <h2 className="font-semibold capitalize text-xl mx-auto">
//                                       {currOpt}
//                                     </h2>
//                                   </div>
//                                 </>
//                               )}
//                             </>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <>
//               {templateData && (
//                 <div className="h-[40%] relative">
//                   <div className="absolute z-10  w-full h-full top-0 left-0 flex flex-col justify-center items-center">
//                     <h1 className="text-white font-[600] my-2 text-3xl">
//                       {templateData?.paper_name}
//                     </h1>
//                     <Link
//                       to="/mcq-template-editor"
//                       className="bg-transparent text-white font-[400] text-base px-4 py-2"
//                     >
//                       Go Back
//                     </Link>
//                   </div>
//                   <img
//                     className="w-full h-full object-cover rounded-lg brightness-50"
//                     alt="banner"
//                     src={templateData?.banner}
//                   />
//                 </div>
//               )}

//               {templateData && templateData?.mcqs?.length !== 0 && (
//                 <div className="flex justify-center items-center  mt-3">
//                   {templateData?.mcqs?.map((_: any, ind: any) => (
//                     <>
//                       {sign[ind] === 'right' && (
//                         <>
//                           <img
//                             className={
//                               'View_mcq_template_right  mb-2 ' +
//                               (ind === 0 ? 'ms-3' : '')
//                             }
//                             id={`right-${ind}`}
//                             src={rightPng}
//                             alt="right"
//                           />
//                           {/* <div className={
//                             ' h-10 w-10 border-2 border-[#FFF]/30 text-white ' +
//                             (ind === 0 ? 'ms-3' : '')
//                           }
//                           id={`right-${ind}`} >fds</div>
//                         </>
//                       )}
//                       {sign[ind] === 'wrong' && (
//                         <img
//                           className={
//                             'View_mcq_template_right  mb-2 ' +
//                             (ind === 0 ? 'ms-3' : '')
//                           }
//                           id={`wrong-${ind}`}
//                           src={wrongPng}
//                           alt="wrong"
//                         />
//                       )}
//                       {sign[ind] === 'unsigned' && (
//                         <p
//                           className={
//                             'View_mcq_template_page_no text-white mt-2 mb-2 ' +
//                             (ind === 0 ? 'ms-3' : '')
//                           }
//                           id={`page-no-${ind}`}
//                         >
//                           {ind + 1}
//                         </p>
//                       )}

//                       <div
//                         id={`dotted-${ind}`}
//                         className="h-2 bg-[#FFF]/20 backdrop-blur-lg w-[10%] rounded-full"
//                       />
//                       <div
//                         id={`line-${ind}`}
//                         className="h-2 bg-[#FFF]/20 backdrop-blur-lg w-[10%] rounded-full"
//                       />

//                     </>
//                   ))}
//                 </div>
//               )}

//               {templateData &&
//                 templateData?.mcqs?.length !== 0 &&
//                 templateData.mcqs.map((mcq: any, mcqInd: any) => (
//                   <>
//                     {mcqInd + 1 === pageNumber && (
//                       <div
//                         key={mcqInd}
//                         className="w-full flex justify-center items-center"
//                       >
//                         <div className="max-w-[90%] min-w-[70%] my-5 py-5 px-7 backdrop-blur-lg bg-[#FFF]/10 rounded-xl shadow-lg">
//                           <div className="flex flex-col justify-center items-center gap-8">
//                             <div className="border-4 customBorder border-[#FFF]/50 px-6 py-4 rounded-full">
//                               <h2 className="text-white font-bold text-2xl text-center">
//                                 <span>{mcqInd + 1} .</span>{' '}
//                                 {mcqInd + 1 === pageNumber ? mcq?.question : ''}
//                               </h2>
//                             </div>

//                             <div className="grid grid-cols-2 w-[60%] gap-5 ">
//                               {mcq?.options.map((currOpt: any, optID: any) => (
//                                 <>
//                                   {mcq?.options_type === 'image' ? (
//                                     <>

//                                       <div
//                                         key={optID}
//                                         id={`main-div-img-option-${optID}`}
//                                         onClick={() => {
//                                           handleClickedOption('img', optID);
//                                         }}
//                                         className="flex items-center border-4 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer"
//                                       >
//                                         <span className="font-semibold text-lg justify-self-start">
//                                           {ALPHABET[optID]} .
//                                         </span>
//                                         <img
//                                           src={currOpt}
//                                           id={`img-option-${optID}`}
//                                           className=" w-[20%] mx-auto"
//                                         />
//                                       </div>
//                                     </>
//                                   ) : (
//                                     <>

//                                       <div
//                                         key={optID}
//                                         id={`main-div-text-option-${optID}`}
//                                         onClick={() => {
//                                           handleClickedOption('text', optID);
//                                         }}
//                                         className="flex items-center border-4 border-[#FFF]/50 rounded-full text-white px-4 py-3 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
//                                       >
//                                         <span className="font-semibold text-lg justify-self-start">
//                                           {ALPHABET[optID]} .
//                                         </span>
//                                         <h2 className="font-semibold capitalize text-xl mx-auto">
//                                           {currOpt}
//                                         </h2>
//                                       </div>
//                                     </>
//                                   )}
//                                 </>
//                               ))}
//                             </div>

//                             <button
//                               onClick={() => {
//                                 handleSaveAndNext();
//                               }}
//                               className="text-white font-semibold text-lg  w-[20%] py-2 rounded-full border-4 border-[#FFF]/50 hoverEffect__QuizeNextBTN"
//                             >
//                               Save and Next
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 ))}

//               {explaination && (
//                 <div
//                   className="flex justify-center items-center max-w-[60%] py-4 px-5 shadow-lg rounded-lg mx-auto  backdrop-blur-lg bg-[#FFF]/10 "
//                   style={{ color: `${explainationColor}` }}
//                 >
//                   <p className="text-white font-[500] text-lg text-center">
//                     {explaination}
//                   </p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//         {explaination && (
//           <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#000]/30 backdrop-blur-sm z-20">
//             <div
//               className="flex flex-col gap-3 justify-center items-center w-[40%] py-5  px-5 shadow-2xl rounded-lg mx-auto  backdrop-blur-lg bg-[#FFF] "
//               style={{ color: `${explainationColor}` }}
//             >
//               <h2 className="text-black font-semibold text-2xl">
//                 Explaination for your answer
//               </h2>
//               <p className="text-black font-[500] text-lg text-center">
//                 {explaination}
//               </p>

//               <button
//                 onClick={() => {
//                   handleSaveAndNext();
//                 }}
//                 className="text-black shadow-md font-semibold text-base  w-[30%] py-2 rounded-full border-2 border-[#000]/50 hoverEffect__QuizeNextBTN"
//               >
//                 Save and Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div> */}

//       hello
//     </>
//   );
// }

// export default ViewMcqTemplate;

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import TestImg from '../../images/test-img.gif';
import './viewMcqTemplate.css';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const data = [
  {
    label: '1',
    value: 'html',
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matterIt really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. `,
  },
  {
    label: '2',
    value: 'react',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: '3',
    value: 'vue',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: '4',
    value: 'angular',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: '5',
    value: 'svelte',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: '6',
    value: 'svelte 2',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

const ViewMcqTemplate = () => {
  const [showOverView, setShowOverView] = useState(false);
  return (
    <>
      <div className="h-screen relative flex justify-center items-center">
        <div className="w-[50%] mx-auto py-5 h-full flex flex-col justify-start items-center ">
          <Tabs value="html" className="h-full overflow-y-auto hideScrollBar">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab
                  className="border border-gray-400"
                  key={value}
                  value={value}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <div className="h-full w-full mt-7 rounded-md ">
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {/* for question start */}
                    <div className="flex flex-col gap-3 justify-start items-start border-4 border-[#00ffff] p-4 rounded-md">
                      <img src={TestImg} className="h-[20%]" alt="test-image" />
                      <p className="text-black">{desc}</p>
                    </div>
                    {/* for question end */}

                    {/* for option start */}
                    <div className="my-4 grid grid-cols-2 gap-4 ">
                      <button className=" border-2 border-[#00ffff] flex justify-center items-center p-3 rounded-md hover:bg-[#ccc]/50 transition-all duration-200 ease-in-out">
                        <span className="text-black text-lg">A</span>{' '}
                        <h2 className="mx-auto text-black font-semibold">
                          Option{' '}
                        </h2>
                      </button>
                      <button className=" border-2 border-[#00ffff] flex justify-center items-center p-3 rounded-md hover:bg-[#ccc]/50 transition-all duration-200 ease-in-out">
                        <span className="text-lg text-black">B</span>{' '}
                        <img src={TestImg} className="h-24 mx-auto" />
                      </button>
                      <button className=" border-2 border-[#00ffff] flex justify-center items-center p-3 rounded-md hover:bg-[#ccc]/50 transition-all duration-200 ease-in-out">
                        <span className="text-lg text-black">C</span>
                        <h2 className="mx-auto text-black font-semibold">
                          Option
                        </h2>
                        <img src={TestImg} className="h-24 mx-auto" />
                      </button>
                      <button className=" border-2 border-[#00ffff] flex justify-center items-center p-3 rounded-md hover:bg-[#ccc]/50 transition-all duration-200 ease-in-out">
                        <span className="text-lg text-black">D</span>{' '}
                        <h2 className="mx-auto text-black font-semibold">
                          Option
                        </h2>
                      </button>
                    </div>
                    {/* <div className="w-full flex justify-end items-start ">
                    <button className="border-green-400 border-2 w-[15%] py-2 text-black rounded-md">
                      Next
                    </button>
                  </div> */}
                    {/* for option end */}

                    {/* for explaination start */}
                    <p className="text-black text-center text-lg font-semibold my-3">
                      B is right, not A (you have answered this before).
                    </p>
                    <div className="my-5  px-3 w-full border-4 border-[#00ffff] py-5 rounded-md">
                      <div className="flex flex-col justify-start items-start gap-4">
                        <p className="text-lg text-black font-medium">
                          They are all perpendicular except EFGH which is
                          parallel:
                        </p>
                        <img src={TestImg} className="h-40" />
                        <p className="text-lg text-black font-medium">
                          For example, this diagram shows that CDHG is
                          perpendicular to ABCD:
                        </p>
                        <img src={TestImg} className="h-40" />
                      </div>
                    </div>
                    {/* for explaination end */}
                  </TabPanel>
                ))}
              </div>
            </TabsBody>
          </Tabs>
        </div>
        <div className="fixed bottom-2 left-0 w-full z-50">
          <div className="flex justify-between items-center w-[80%] mx-auto">
            <button
              onClick={() => setShowOverView(true)}
              className="w-[15%] rounded-md text-white font-semibold py-2 bg-blue-700"
            >
              OverView
            </button>
            <button className="w-[15%] rounded-md bg-green-700 py-2 text-white font-semibold">
              Next
            </button>
          </div>
        </div>
      </div>
      {showOverView && <OverView setShowOverView={setShowOverView} />}
    </>
  );
};
export default ViewMcqTemplate;

const OverView = ({ setShowOverView }: any) => {
  return (
    <>
      <div className="fixed z-50 backdrop-blur-md bg-black/20 flex justify-center items-center w-full h-full top-0 left-0">
        <div className="bg-[#dbebff] w-[30%] p-3 rounded-md shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-black font-semibold">Overview</h2>
            <button
              onClick={() => setShowOverView(false)}
              className="text-black text-3xl"
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-2">
              <CloseRoundedIcon className="text-red-500 font-[700]" />{' '}
              <h2 className="text-xl text-black font-semibold">Question A</h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <CloseRoundedIcon className="text-red-500 font-[700]" />{' '}
              <h2 className="text-xl text-black font-semibold">Question A</h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <CloseRoundedIcon className="text-red-500 font-[700]" />{' '}
              <h2 className="text-xl text-black font-semibold">Question A</h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <CloseRoundedIcon className="text-red-500 font-[700]" />{' '}
              <h2 className="text-xl text-black font-semibold">Question A</h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <CloseRoundedIcon className="text-red-500 font-[700]" />{' '}
              <h2 className="text-xl text-black font-semibold">Question A</h2>
            </div>
          </div>

          <p className="text-red-500 font-medium text-lg text-center my-4">
            You have 5 questions left to answer
          </p>
        </div>
      </div>
    </>
  );
};
