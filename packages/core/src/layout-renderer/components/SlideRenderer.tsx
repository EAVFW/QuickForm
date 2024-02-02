
import { SlideComponent } from '../../components/slide/SlideComponent';
import { useQuickForm } from '../../state/QuickFormContext'

export const SlideRenderer = () => {
    const { state } = useQuickForm();
    return (
        <SlideComponent model={state.slides[state.currIdx]} />
    )
}
