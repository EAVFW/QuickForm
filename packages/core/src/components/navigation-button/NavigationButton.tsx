import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import classNames from 'classnames';
import styles from './NavigationButton.module.css';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    onArrowUpClick?: () => void;
    onArrowDownClick?: () => void;
}

export const NavigationButton: React.FC<Props> = ({ className, style, onArrowUpClick, onArrowDownClick }) => {
    const { goToNextQuestion, goToPreviousQuestion } = useQuickForm();

    return (
        <div className={className || classNames(styles['question-navigation'])} style={style ? style : {}}>
            {/* Left-button */}
            <button
                className={classNames(styles['question-navigation-button'], styles['left'])}
                onClick={onArrowUpClick ? onArrowUpClick : goToNextQuestion}
            >
                <ArrowUpIcon />
            </button>

            <div id="divider"></div>
            {/* Right-button*/}
            <button
                className={classNames(styles['question-navigation-button'], styles['right'])}
                onClick={onArrowUpClick ? onArrowDownClick : goToPreviousQuestion}
            >
                <ArrowDownIcon />
            </button>
        </div>
    );
}
