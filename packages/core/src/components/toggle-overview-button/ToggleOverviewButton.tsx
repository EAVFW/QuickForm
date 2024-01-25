import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import classNames from 'classnames';
import styles from './ToggleOverviewButton.module.css';


type Props = {
    className?: string;
    style?: React.CSSProperties;
    onBtnClick?: () => void;
}

export const ToggleOverviewButton: React.FC<Props> = ({ className, style, onBtnClick }) => {
    const { toggleOverview } = useQuickForm();

    return (
        <div className={className || classNames(styles['toggle-overview'])} style={style ? style : {}}>
            <button
                className={classNames(styles['toggle-overview-button'])}
                onClick={onBtnClick ? onBtnClick : toggleOverview}
            >
                    <p style={{fontSize:'1.3rem'}}>Overview</p>
            </button>
        </div>
    );
}
