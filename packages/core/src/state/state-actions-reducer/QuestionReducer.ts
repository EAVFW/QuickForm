import { QuestionAction } from ".";
import { QuestionState, formResponsPayload } from "./QuestionState";

export const questionReducer = (state: QuestionState, action: QuestionAction): QuestionState => {
    console.log("QuestionReducer: " + action.type, [state, action]);
    const updateQuestionStatus = (index: number, answered: boolean, output: string = "") => {
        if (state.questions && state.questions[index]) {
            const updatedQuestions = [...state.questions];
            updatedQuestions[index].answered = answered;
            updatedQuestions[index].output = output;
            return {
                ...state,
                questions: updatedQuestions
            };
        }
        return state;
    };

    const calculateUpdatedState = (prevState: QuestionState, newIndex: number): QuestionState => {
        if (newIndex >= 0 && newIndex < state.questions.length) {
            return {
                ...prevState,
                currentQuestionIndex: newIndex,
                currentQuestion: state.questions[newIndex],
                currentStep: newIndex + 1,
            };
        }
        return prevState;
    };

    const onSubmitBtnClicked = async (id:string,questionState:QuestionState,dispatch: React.Dispatch<QuestionAction>) => {

       


            try {
                // await fakeApiCall(questionState);

                let rsp = await fetch(`/api/entities/entity/records/${id}/payload`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(formResponsPayload(questionState)),
                    credentials: "include"
                });



                let response = await rsp.json();
                let completed = false;
                while (!completed) {
                    let statusRsp = await fetch(`/api/workflowruns/${response.runid}/status`, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                        },
                        credentials: "include"
                    });

                    let statusResponse = await statusRsp.json();
                    completed = statusResponse.completed;
                    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
                }

                let documentRsp = await fetch(`/api/workflowruns/${response.runid}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                    credentials: "include"
                });

                let document = await documentRsp.json();
                dispatch({
                    type: 'PDF_PREVIEW', url: `/api/files/${document.body.document}?content-disposition=inline`
                });
                console.log("Submit data", document);

            } catch (error: any) {
                console.error(error.message);
                dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true } });

                //TODO: Go to error?
               
                return;
            } finally {
                dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitOK: true } });

                dispatch({ type: 'NEXT_QUESTION' });
            }
        
    }


    switch (action.type) {
        case 'PDF_PREVIEW':
            return { ...state, pdfpreviewurl: action.url }
        case 'SET_ANSWERED':
            return updateQuestionStatus(action.index, true, state.currentQuestion.output);
        case 'SET_UNANSWERED':
            return updateQuestionStatus(action.index, false);
        case 'SET_INDEX':
            return calculateUpdatedState(state, action.index);
        case 'NEXT_QUESTION':

            const ind = state.questions.indexOf(state.questions.find(x => !x.answered,) ?? state.questions[state.currentQuestionIndex]);

            return calculateUpdatedState(state, ind);
        case 'PREVIOUS_QUESTION':
            return calculateUpdatedState(state, state.currentQuestionIndex - 1);
        case 'SET_OUTPUT':
            console.log("Setting output:", [state, action]);
            return {
                ...state,
                currentQuestion: {
                    ...state.currentQuestion,
                    output: action.payload,
                }
            };
        case 'COMPUTE_PROGRESS':
            const excludedLogicalNames = ['submit', 'intro', 'ending'];
            const answeredQuestions = state.questions.filter(q => q.answered && !excludedLogicalNames.includes(q.logicalName!));
            const progress = (answeredQuestions.length / state.totalSteps) * 100;
            return { ...state, progress, progressText: `${answeredQuestions.length}/${state.totalSteps}` };
        case 'TOGGLE_OVERVIEW':
            return { ...state, showOverview: !state.showOverview };

        case 'SET_SUBMIT_STATUS':
            return {
                ...state, submitStatus: { ...state.submitStatus, ...action.status },
            }
        case "SUBMIT":
            if (!state.submitStatus.isSubmitting) {

                onSubmitBtnClicked(action.id, state, action.dispatch);

                return {
                    ...state, submitStatus: { ...state.submitStatus, ...{ isSubmitting: true } },
                }
            }
            return state;

        default:
            return state;
    }
};
