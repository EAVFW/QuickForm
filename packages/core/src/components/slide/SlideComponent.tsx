import { SlideModel } from "../../model";


type SlideProps = {
    model: SlideModel;
}

export const SlideComponent: React.FC<SlideProps> = ({ model }: SlideProps) => {
    return (
        <ul>
            {model.questions.map((q, index) => {
                return <li key={index}>
                    <p>
                        {q.logicalName}
                    </p>
                    <p>
                        {q.text}
                    </p>
                    <p>
                        {q.inputType}
                    </p>
                    <p>
                        {q.paragraph}
                    </p>
                </li>
            })}
        </ul>
    )
}