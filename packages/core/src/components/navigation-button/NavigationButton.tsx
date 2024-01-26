import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import classNames from 'classnames';
import styles from './NavigationButton.module.css';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    // onArrowUpClick?: () => void;
    // onArrowDownClick?: () => void;
}

export const NavigationButton: React.FC<Props> = ({ className, style }) => {
    const { goToNextSlide, goToPrevSlide, state } = useQuickForm();

    return (
        <div className={className || classNames(styles['slide-navigation'])} style={style ? style : {}}>
            {/* Left-button */
                state.hasNextSlide &&
                <button
                    className={classNames(styles['slide-navigation-button'], styles['left'])}
                    onClick={goToNextSlide}
                >
                    <ArrowUpIcon />
                </button>
            }

            <div id="divider"></div>
            {/* Right-button*/
                state.hasPrevSlide &&
                <button
                    className={classNames(styles['slide-navigation-button'], styles['right'])}
                    onClick={goToPrevSlide}
                >
                    <ArrowDownIcon />
                </button>
            }
        </div>
    );
}
