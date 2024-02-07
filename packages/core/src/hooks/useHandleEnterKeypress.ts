import { useEffect } from "react";

export function useHandleEnterKeypress(inputType: "multilinetext" | string, disabled?: boolean, customFunc?: () => void) {
    useEffect(() => {
        function handleKeypress(event: KeyboardEvent) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (customFunc) {
                    customFunc();
                }
            }
        }
        if (typeof disabled !== undefined && !disabled) {
            document.addEventListener("keypress", handleKeypress);

            return function () {
                document.removeEventListener("keypress", handleKeypress);
            };
        }

    }, [customFunc]);
}

