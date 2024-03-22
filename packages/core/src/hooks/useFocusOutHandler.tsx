import { useEffect } from 'react';
import { isIOS } from 'src/utils/quickformUtils';

export const useFocusOutHandler = (ref, onAnswer) => {
    useEffect(() => {
        const onfocusOut = (e) => {
            if (ref.current) {
                onAnswer(ref.current.value);
            }
        };

        const handleIOSFocusOut = () => {
            if (ref.current) {
                setTimeout(() => {
                    if (document.activeElement.tagName !== 'INPUT') {
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