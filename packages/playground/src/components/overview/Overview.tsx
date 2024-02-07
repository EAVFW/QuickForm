// import React from 'react';
// import { useQuickForm } from '../../state/QuickFormContext';
// import classNames from "classnames";
// import styles from "./Overview.module.css";
// import { Button, ProgressCircle } from '../index';
// import { Slide } from '../../model';


// export const QuestionList = () => {
//     const { state, goToSlide, toggleOverview } = useQuickForm();

//     const handleOnQuestionClicked = (s: Slide) => {
//         const slideIdx = state.slides.indexOf(s);
//         goToSlide(slideIdx);
//     }

//     return <div className={classNames(styles['overview-right'])}>
//         <ol className={classNames(styles.overviewList)}>
//             {state.slides.map(s => {
//                 return s.questions.map((q, index) => {
//                     return (
//                         <li key={index}>
//                             <a onClick={() => handleOnQuestionClicked(s)} title="Go to question">

//                                 <span style={{ opacity: q.answered ? 1 : 0 }}>✔</span>
//                                 {index + 1}.&nbsp;
//                                 {q.text!}
//                                 {q.answered ? <span>&nbsp;:{q.output}</span> : null}
//                             </a>
//                         </li>
//                     );
//                 })
//             })}
//         </ol>
//     </div>
// }
// export const Overview: React.FC = () => {
//     const { state, toggleOverview, setOverviewProvided } = useQuickForm();
//     // This is used to auto-enable this component upon render
//     if (state.overviewProvided === false) {
//         setOverviewProvided();
//     }
//     if (!state.showOverview) return <></>;

//     return (
//         <div className={classNames(styles.overview)} >

//             {/* <Button onClick={toggleOverview} children={"X"} style={{ justifyContent: 'flex-end' }} /> */}

//             <div className={classNames(styles['overview-left'])}>
//                 {/* Progress Display */}
//                 {/* <ProgressCircle
//                     progress={state?.progress}
//                     backgroundColor='#154068'
//                 /> */}

//                 <div className={classNames(styles.overviewProgress)}>
//                     <p>Questions: {state?.progressText}</p>
//                 </div>
//             </div>

//             <QuestionList />
//         </div>
//     );
// }