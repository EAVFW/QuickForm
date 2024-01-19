import { useEffect } from 'react';

/* This is used to remove the error message from the interface when the user clicks any area of the screen after the message has been shown for 2 seconds. 
 * PARAMS: callback - callback function to be called when the user clicks any area of the screen after the message has been shown, delay - delay in milliseconds before the callback function is called
*/
export const useDelayedClickListener = (callback: () => void, delay: number = 100) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, delay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };

    function handleClick() {
      callback();
    }
  }, [callback, delay]);
};

