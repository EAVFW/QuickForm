import { QuickformState } from "../state/index";

export const formResponsPayload = (state: QuickformState): Record<string, any> => {
    // console.log("FormResponse", [state]);
    const payload: Record<string, any> = {};
    for (var slide of state.slides) {
        slide.questions.forEach(q => {
            payload[q.logicalName!] = q.output;

            if (q.logicalName === "submit") {
                payload["submitFields"] = q.output;
            }
        })
    }

    return payload;
}