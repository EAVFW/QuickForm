import { useEffect } from "react";

export function useHandleKeypress(inputType: "multilinetext" | string, customFunc?: () => void) {
    useEffect(() => {
        function handleKeypress(event: KeyboardEvent) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (customFunc) {
                    customFunc();
                }
            }
        }
        if (inputType !== "multilinetext") {
            document.addEventListener("keypress", handleKeypress);

            return function () {
                document.removeEventListener("keypress", handleKeypress);
            };
        }

    }, [customFunc]);


}

