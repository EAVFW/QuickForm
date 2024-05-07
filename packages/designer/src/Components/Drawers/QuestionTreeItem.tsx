import { ViewNames } from "../../Types/ViewNames";
import { QuickFormDesignerDefinition } from "../../Types/QuickFormDefinition";
import {
    Button,
    makeStyles,
    tokens,
    Tree,
    TreeItem,
    TreeItemLayout,
} from "@fluentui/react-components";
import { AddIcon, TrashCanIcon, QuestionIcon } from "../Icons/IntroViewIcon";
import { makeid } from "../../Utils/makeid";
import { SetStateAction } from "react";
import { useMemo } from "react";
import { QuestionJsonModel } from "@eavfw/quickform-core/src/model/json-definitions/JsonDataModels";
import { CaretUpFilled, CaretDownFilled } from "@fluentui/react-icons"

const useNavDrawerStyles = makeStyles({
    actions: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        position: "absolute",
        right: 0
    }
})

type QuestionTreeItemProps = {
    setView: (view: ViewNames) => void;
    updateQuickFormPayload: (value: SetStateAction<QuickFormDesignerDefinition>) => void;
    quickformpayload: QuickFormDesignerDefinition;
    setActiveQuestion: (question?: string | undefined) => void;
    activeQuestion: string | undefined;
}

const QuestionTreeItem: React.FC<QuestionTreeItemProps> = ({ setView, setActiveQuestion, updateQuickFormPayload, quickformpayload, activeQuestion }) => {

    const styles = useNavDrawerStyles();
    const sortedQuestions = useMemo(() => {

        return Object.entries(quickformpayload.questions ?? {}).map(([key, question], index) => [key, question, index] as [string, QuestionJsonModel, number])
            .sort(([_, qa, ai], [__, qb, bi]) => (qa.order ?? ai) - (qb.order ?? bi));

    }, [quickformpayload])
    const handleQuestionClick = (key: string) => {
        setActiveQuestion(key);
        setView("questions");
    };

    const handleMoveUp = (index: number, key: string) => {
        updateQuickFormPayload((old) => {
            const oq = Object.values(old.questions).find(x => x.order === index - 1) ?? old.questions[Object.keys(old.questions)[index - 1]];
            oq.order = index;
            const q = old.questions[key];
            q.order = index - 1;

            old.questions = Object.fromEntries(Object.entries(old.questions).map(([k, q], i) => [k, q, q.order ?? i] as [string, QuestionJsonModel, number]).sort(([k, a, i], [k1, b, j]) => i - j));

            return { ...old };
        });
    };

    const handleMoveDown = (index: number, key: string) => {
        updateQuickFormPayload((old) => {
            const oq = Object.values(old.questions).find(x => x.order === index + 1) ?? old.questions[Object.keys(old.questions)[index + 1]];
            oq.order = index;
            const q = old.questions[key];
            q.order = index + 1;

            old.questions = Object.fromEntries(Object.entries(old.questions).map(([k, q], i) => [k, q, q.order ?? i] as [string, QuestionJsonModel, number]).sort(([k, a, i], [k1, b, j]) => i - j));

            return { ...old };
        });
    };

    const handleRemoveQuestion = (key: string) => {
        updateQuickFormPayload((old) => {
            delete old.questions[key];
            return { ...old };
        });
    };

    const handleAddQuestion = () => {
        const id = makeid(16);
        updateQuickFormPayload((old) => {
            if (!old.questions) {
                old.questions = {};
            }

            old.questions[id] = { text: "New Question" };

            return { ...old };
        });
        setActiveQuestion(id);
    };

    return (
        <Tree aria-label="Questions">
            {sortedQuestions.map(([key, question], index) => (
                <TreeItem key={key} itemType="leaf" onClick={() => handleQuestionClick(key)}>
                    <TreeItemLayout style={activeQuestion === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<QuestionIcon />}
                        actions={{
                            className: styles.actions,
                            children: <>
                                <Button
                                    aria-label="Move Up"
                                    appearance="subtle"
                                    onClick={() => handleMoveUp(index, key)}
                                    icon={<CaretUpFilled />}
                                />
                                <Button
                                    aria-label="Move Down"
                                    appearance="subtle"
                                    onClick={() => handleMoveDown(index, key)}
                                    icon={<CaretDownFilled />}
                                />
                                <Button
                                    aria-label="Remove item"
                                    appearance="subtle"
                                    onClick={() => handleRemoveQuestion(key)}
                                    icon={<TrashCanIcon />}
                                />
                            </>
                        }}>
                        {question.logicalName ? key : question.text}
                    </TreeItemLayout>
                </TreeItem>
            ))}
            <TreeItem itemType="leaf">
                <TreeItemLayout iconBefore={<AddIcon />}  >
                    <Button onClick={handleAddQuestion} appearance="transparent"  >
                        Add Question
                    </Button>
                </TreeItemLayout>
            </TreeItem>
        </Tree>
    );
}

export default QuestionTreeItem;
