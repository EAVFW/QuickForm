import React from 'react';
import { SlideModel, QuestionModel, Row } from "../../model";
import { Question } from '../question/Question';
import { useQuickForm } from '../../state/QuickFormContext';



const getColumnStyle = (numberOfColumns: number): React.CSSProperties => ({
    width: `${100 / numberOfColumns}%`,
    display: 'flex',
    flexDirection: 'column',
});

const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => {
    return questions.find(q => q.logicalName === logicalName);
};

type SlideProps = {
    model: SlideModel;
}

export const Slide: React.FC<SlideProps> = ({ model }: SlideProps) => {
    const { state } = useQuickForm();

    const rowContainerStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: '10px'
    }

    return (
        <div id="Slide" style={{ display: 'flex' }}>
            {
                model.rows.map((row, rowIndex) => (
                    <div key={rowIndex} style={rowContainerStyling}>
                        <RowRenderer key={"row" + rowIndex} row={row} questions={model.questions} />
                    </div>
                ))
            }
        </div>
    );
};

type RowRendererProps = {
    row: Row;
    questions: QuestionModel[];
}

const RowRenderer: React.FC<RowRendererProps> = ({ row, questions }) => {

    const fullRowStyle: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    if (typeof row.columns !== "undefined") {
        return row.columns.map((column, columnIndex) => (
            <div key={columnIndex} style={getColumnStyle(row.columns.length)}>
                {column.rows.map((innerRow, innerRowIndex) => {
                    const question = findQuestionByLogicalName(innerRow.questionRefLogicalName, questions);
                    if (!question) return null;
                    return (
                        <Question
                            key={innerRowIndex}
                            model={question}
                            questionNumber={innerRowIndex + 1}
                        />
                    );
                })}
            </div>
        ))
    } else {
        const question = findQuestionByLogicalName(row.questionRefLogicalName, questions);
        if (!question) return null;
        const questionIndex = questions.indexOf(question);

        return (
            <div style={fullRowStyle}>
                <Question
                    model={question}
                    questionNumber={questionIndex + 1}
                />
            </div>
        )
    }

}


// enum ViewStatus {
//     InView,
//     TransitioningOut,
//     OutOfView,
//     TransitioningIn
// }

// const animationTimerSetting = 300;
// const useTransitionState = () => {
//     const [viewStatus, setViewStatus] = useState(ViewStatus.OutOfView);
//     // const { questionNumber } = useCurrentQuestion();
//     const questionBoxClasses = classNames(styles['question-box'], {
//         [styles['slide-out']]: viewStatus === ViewStatus.TransitioningOut,
//         [styles['slide-in']]: viewStatus === ViewStatus.TransitioningIn,
//         [styles['rendered']]: viewStatus === ViewStatus.InView,

//     });

//     useEffect(() => {

//         setViewStatus(ViewStatus.TransitioningIn);
//         setTimeout(() => {

//             setViewStatus(ViewStatus.InView);
//         }, animationTimerSetting);
//     }, []);
//     // }, [questionNumber]);

//     return {
//         questionBoxClasses,
//         transitionOut: (onComplete?: () => void) => {
//             setViewStatus(ViewStatus.TransitioningOut);
//             if (onComplete) {
//                 setTimeout(() => {
//                     onComplete();
//                 }, animationTimerSetting);
//             }
//         }
//     }
// }


// const handleQuestionNextBtnClick = () => {

//         /**
//          * If this is the submit part and we are progress 100 (completed)
//          * TODO: Make the progress === 100 a method returned from quickform
//          * 'isQuestionsComplete()'
//          *
//          * Such the logic on if its complete (the progress===100) is actually somewhere
//          * else than in the rendering part.
//          * */
//         if (inputType === "submit") {
//             console.log("progress: ", progress);
//             if (progress === 100) {

//                 /**
//                  * If its complete, we simply click the onSubmitBtnClicked()
//                  *
//                  * I think it makes sense to add some ValidateForSubmission.
//                  *
//                  * */
//                 transitionOut(onQuestionBtnClicked);


//             }
//         }

//         /**
//          * If its not submit, we will ask quickform if the input type should be validated
//          * */
//         if (shouldValidateInputType(inputType)) {

//             /**
//              * The actualy validateinput should be on usequickform i think.
//              *
//              * Basically library users should be able to plug in validation
//              * */
//             const isValid = validateInput();
//             if (!isValid) return;
//         }
//         transitionOut(onQuestionBtnClicked)
//     };

