import { useEffect } from 'react';
import { isIOS } from '../utils/quickformUtils';

export const useFocusOutHandler = (
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
    onAnswer: (value: string) => void
): void => {
    useEffect(() => {
        const onfocusOut = (e: FocusEvent) => {
            if (ref.current) {
                onAnswer(ref.current.value);
            }
        };

        const handleIOSFocusOut = () => {
            if (ref.current) {
                setTimeout(() => {
                    if (document.activeElement && document.activeElement.tagName !== 'INPUT') {
                        onAnswer(ref.current.value);
                    }
                }, 100);
            }
        };

        if (isIOS()) {
            document.addEventListener('blur', handleIOSFocusOut, true);
        } else {
            document.addEventListener('focusout', onfocusOut);
        }

        return () => {
            if (isIOS()) {
                document.removeEventListener('blur', handleIOSFocusOut, true);
            } else {
                document.removeEventListener('focusout', onfocusOut);
            }
        };
    }, [ref, onAnswer]);
};
