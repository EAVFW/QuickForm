import { QuickForm } from "../../core/src/QuickForm";
import dummydatajson from "./data/dummydata.json";

export const App = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <QuickForm
                intro={dummydatajson.intro}
                questions={dummydatajson.questions}
                submit={dummydatajson.submit}
                ending={dummydatajson.ending}
            />
        </div>
    )
};