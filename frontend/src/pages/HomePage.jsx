import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import useToggle from "../hooks/useToggle";
import useOutsideClick from "../hooks/useOutsideClick";

const HomePage = () => {
  const [nodeRef, controllerRef, isActive, toggle] = useOutsideClick();

  return (
    <div>
      <button ref={controllerRef} onClick={toggle}>
        Click me
      </button>
      <CSSTransition
        nodeRef={nodeRef}
        in={isActive}
        timeout={400}
        classNames="drop-menu"
        unmountOnExit
      >
        <nav className="drop-menu" style={{ top: "200px" }} ref={nodeRef}>
          <li>
            <span>Opcja 1</span>
          </li>
          <li>
            <span>Opcja 1</span>
          </li>
        </nav>
    </CSSTransition>
    </div>
  );
};

export default HomePage;
