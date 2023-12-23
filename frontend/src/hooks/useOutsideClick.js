import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {

      const handleClick = (event) => {
        console.log(ref.current);
        console.log(event)
        if (ref.current && !ref.current.contains(event.target)) {
            console.log(callback);
          callback();
        }
      };

      document.addEventListener('click', handleClick, true);

      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);

    return ref;
  };

  export default useOutsideClick
