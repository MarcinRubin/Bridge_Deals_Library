import React from "react";
import DealNavigator from "../components/DealNavigator";
import LoadingElement from "../components/LoadingElement";
import { useState, useRef, useEffect } from "react";
import DeleteDirectoryModal from "../components/DeleteDirectoryModal";
import useToggle from "../hooks/useToggle";
import useOutsideClick from "../hooks/useOutsideClick";

const HomePage = () => {

  const handleClickOutside = () => {
    setCounter(0);
  }

  //const meineRef = useOutsideClick(handleClickOutside);
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)} >
        Add
      </button>
      <div>{counter}</div>
    </div>
  );
};

export default HomePage;
