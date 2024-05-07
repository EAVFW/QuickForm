import { resolveQuickFormService } from "../../services/QuickFormServices";
import { QuickformAction, QuickformState } from "../index";

export class SubmitActionHandler {
    static submit = async (state: QuickformState, dispatch: React.Dispatch<QuickformAction>, onSubmitAsync?: (data:any)=>Promise<string>) => {

        try {
            const body = this.generatePayload(state);

            if (onSubmitAsync) {
                const rsp = await onSubmitAsync(body);
            } else {

                let rsp = await fetch(state.data.submit.submitUrl, {
                    method: state.data.submit.submitMethod,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(body),
                    credentials: "include"
                });
                if (!rsp.ok) {
                    throw new Error("Failed to submit:" + await rsp.text());
                }
            }

            dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitSuccess: true, isSubmitting: false, isSubmitError: false } });
            dispatch({ type: 'GO_TO_ENDING' });

        } catch (error: any) {
            console.error(error.message);
            dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true, isSubmitSuccess: false } });
            return;

        }
        // finally {
        //     dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitOK: true } });
        // }

    }

    static generatePayload = (state: QuickformState): Record<string, any> => {

        const logger = resolveQuickFormService("logger");
        const payload: Record<string, any> = {};
        for (var slide of state.slides) {
            slide.questions.forEach(q => {
                payload[q.logicalName!] = q.output;
            })
        }
        payload["submitFields"] = {};
        
        for (var q of state.data.submit.submitFields) {

            
            let value = q.output;

            logger.log("Adding submitField Answer for {dataType} {q}={output}", q.dataType, q.logicalName, value)

            if (q.dataType === "boolean" && q.inputType === "dropdown") {
                value = value === "Y" ? true : false;
            }

            payload["submitFields"][q.logicalName] = value;
        }

        return payload;
    }

}


// let response = await rsp.json();
// let completed = false;
// while (!completed) {
//     let statusRsp = await fetch(`/api/workflowruns/${response.runid}/status`, {
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//         },
//         credentials: "include"
//     });

//     let statusResponse = await statusRsp.json();
//     completed = statusResponse.completed;
//     await new Promise((resolve, reject) => setTimeout(resolve, 1000));
// }

// let documentRsp = await fetch(`/api/workflowruns/${response.runid}`, {
//     method: "GET",
//     headers: {
//         "content-type": "application/json",
//     },
//     credentials: "include"
// });

// let document = await documentRsp.json();
// dispatch({
//     type: 'PDF_PREVIEW', url: `/api/files/${document.body.document}?content-disposition=inline`
// });
