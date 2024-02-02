import { useEffect } from "react";

export function useHandleEnterKeypress(inputType: "multilinetext" | string, customFunc?: () => void) {
    useEffect(() => {
        function handleKeypress(event: KeyboardEvent) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (customFunc) {
                    console.log("customFunc() fired");
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

