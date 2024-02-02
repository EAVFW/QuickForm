import { QuickformAction, QuickformState } from "../state/index";
import { formResponsPayload } from "./PayloadService";

export const onSubmitBtnClicked = async (id: string, questionState: QuickformState, dispatch: React.Dispatch<QuickformAction>) => {

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
        // dispatch({
        //     type: 'PDF_PREVIEW', url: `/api/files/${document.body.document}?content-disposition=inline`
        // });
        console.log("Submit data", document);

    } catch (error: any) {
        console.error(error.message);
        dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true } });

        //TODO: Go to error?

        return;
    } finally {
        dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitOK: true } });

        dispatch({ type: 'NEXT_SLIDE' });
    }

}