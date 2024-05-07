"use client";
import { useEffect, useRef } from "react";
import { useQuickForm } from "../state/QuickFormContext";

export function useHandleScroll() {
    const timerIdRef = useRef<number>();
    const { goToNextSlide, goToPrevSlide, state: { submitStatus } } = useQuickForm();

    useEffect(() => {
        function handleScroll(event: WheelEvent) {
            clearTimeout(timerIdRef.current);

            if (submitStatus.isSubmitting || submitStatus.isSubmitSuccess) {
                return;
            }

            timerIdRef.current = window.setTimeout(() => {
                if (event.deltaY > 0) {
                    //   handleOkClick();
                    goToNextSlide();
                } else if (event.deltaY <= -1) {
                    //   setErrorMsg({});
                    //   setQuestionNum((prevValue) =>
                    //     prevValue.now - 1 < 0
                    //       ? { ...prevValue }
                    //       : { prev: prevValue.now, now: prevValue.now - 1 }
                    //   );
                    goToPrevSlide();
                }
            }, 32);
        }

        document.addEventListener("wheel", handleScroll);

        return function () {
            document.removeEventListener("wheel", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}