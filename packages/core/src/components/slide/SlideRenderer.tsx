
import { useQuickForm } from 'state/QuickFormContext'
import { SlideComponent } from './Slide';

export const SlideRenderer = () => {
    const { state } = useQuickForm();
    return (
        <SlideComponent model={state.slides[state.currIdx]} />
    )
}
