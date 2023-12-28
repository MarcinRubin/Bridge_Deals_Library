import { useEffect, useRef, useState } from "react";

const useOutsideClick = () => {
    const ref = useRef();
    const controllerRef= useRef();
    const [isActive, setIsActive] = useState(false);

    const toggle = () =>{
      setIsActive(!isActive);
    }

    useEffect(() => {

      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target) && !controllerRef.current.contains(event.target)) {
          setIsActive(false);
        }
      };

      document.addEventListener('click', handleClick, true);

      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);

    return [ref, controllerRef, isActive, toggle];
  };

  export default useOutsideClick
