import { useState} from "react";

const useToggle = (initialState) => {
    const [visible, setVisible] = useState(initialState);
    const toggle = () => setVisible(!visible);
    return [visible, toggle]
};

export default useToggle;
