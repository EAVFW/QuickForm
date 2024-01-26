import { QuickForm } from "../../core/src/QuickForm";
import dummydatajson from "./data/dummydata.json";

export const App = () => {
    return (
        <div style={{ backgroundColor: '#000', width: '100%', height: '100%' }}>
            <p>Hello</p>
            <QuickForm
                intro={dummydatajson.intro}
                questions={dummydatajson.questions}
                submit={dummydatajson.submit}
                ending={dummydatajson.ending}
            />
        </div>
    )
};