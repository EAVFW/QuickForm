import { Slide } from "../../model/new";


type SlideProps = {
    model: Slide;
}

export const SlideComponent: React.FC<SlideProps> = ({ model }: SlideProps) => {
    return (
        <ul>
            {model.questions.map(q => {
                return <li>
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