
import { Slide } from '../../components/slide/Slide';
import { useQuickForm } from '../../state/QuickFormContext'

export const SlideRenderer = () => {
    const { state } = useQuickForm();
    return (
        <Slide model={state.slides[state.currIdx]} />
    )
}
