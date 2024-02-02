// import React from 'react';
// import classNames from "classnames";
// import styles from "./Overview.module.css";
// import { Button, ProgressCircle } from '../index';
// import { Slide } from '../../model';

// export const Overview_OLD: React.FC = () => {
//     const { state, goToSlide, toggleOverview } = useQuickForm();
//     if (state?.slides === undefined) return (<></>);

//     const handleOnQuestionClicked = (s: Slide) => {
//         const slideIdx = state.slides.indexOf(s);
//         toggleOverview();
//         goToSlide(slideIdx);
//     }

//     const handleCloseOverviewClicked = () => {
//         toggleOverview();
//     }

//     return (
//         <div className={classNames(styles.overview)} >

//             <Button onClick={handleCloseOverviewClicked} children={"X"} className={classNames(styles['overviewButton'])} style={{ justifyContent: 'flex-end' }} />

//             {/* Progress Display */}
//             <ProgressCircle
//                 progress={state?.progress}
//                 backgroundColor='#154068'
//             // color='#060f1a'
//             />

//             <div className={classNames(styles.overviewProgress)}>
//                 <p>Progress: {state?.progress}%</p>
//                 <p>Questions: {state?.progressText}</p>
//             </div>

//             {/* List of Questions */}
//             <ol className={classNames(styles.overviewList)}>
//                 {state.slides.map(s => {
//                     return s.questions.map((q, idx) => (
//                         <li key={idx}>
//                             <a onClick={() => handleOnQuestionClicked(s)} title="Go to question">
//                                 {q.text}
//                                 {q.answered === true && <span className={classNames(styles.checkIcon)}> ✔</span>}
//                             </a>
//                         </li>
//                     ));
//                 })}
//             </ol>


//             <Button
//                 className={classNames(styles.overviewButton)}
//                 onClick={() => { alert("Not implemented yet.") }}
//                 showPressEnter={false}
//                 disabled={false}
//             >
//                 Preview PDF
//             </Button>
//         </div>
//     );

// }

