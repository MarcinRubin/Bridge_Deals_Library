import { useState} from "react";

const useToggle = (initialState) => {
    const [visible, setVisible] = useState(initialState);
    const toggle = () => setVisible(prev => !prev);
    return [visible, toggle]
};

export default useToggle;
