import { QuickformAction, QuickformState } from "../state/index";

export const onSubmitBtnClicked = async (state: QuickformState, dispatch: React.Dispatch<QuickformAction>) => {

    try {
        // const submitEndpoint = `/api/entities/entity/records/${id}/payload`

        let rsp = await fetch(`/api/entities/entity/records/some-endpoint`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formPayload(state)),
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

        // let documentRsp = await fetch(`/api/workflowruns/${response.runid}`, {
        //     method: "GET",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     credentials: "include"
        // });

        // let document = await documentRsp.json();
        // // dispatch({
        // //     type: 'PDF_PREVIEW', url: `/api/files/${document.body.document}?content-disposition=inline`
        // // });
        // console.log("Submit data", document);

    } catch (error: any) {
        console.error(error.message);
        dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true } });

        return;
    } finally {
        dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitOK: true } });
    }

}


export const formPayload = (state: QuickformState): Record<string, any> => {
    const payload: Record<string, any> = {};
    for (var slide of state.slides) {
        slide.questions.forEach(q => {
            payload[q.logicalName!] = q.output;
        })
    }
    for (var q of state.data.submit.submitFields) {
        payload[q.logicalName] = q.output
    }

    return payload;
}