"use client"
import { useEffect } from "react";


export function useKeyPressHandler(keys: string[], onclick: (e: KeyboardEvent, key: string) => void) {

    useEffect(() => {
        function handleKeypress(event: KeyboardEvent) {
            event.preventDefault();
            keys.filter(v => v.toLowerCase() === event.key.toLowerCase() && onclick(event, v));
        }

        document.addEventListener("keypress", handleKeypress);

        return function () {
            document.removeEventListener("keypress", handleKeypress);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys.join(''), onclick]);
}
