import { withDefaultHeadingNumberDisplayProvider } from "../components/question/components/QuestionHeading";
import { widthDefaultInputTypePropertiesTransformer, widthDefaultLogger, widthDefaultModeltransformer, widthDefaultQuestionTransformer, withDefaultInputValidator } from "./defaults";

export * from "./defaults";
export * from "./QuickFormServices";
export * from "./ViewComponents";



export function registerDefaultServices() {
    widthDefaultInputTypePropertiesTransformer();
    withDefaultInputValidator();
    widthDefaultModeltransformer();
    widthDefaultQuestionTransformer();
    widthDefaultLogger();
    withDefaultHeadingNumberDisplayProvider();
}
