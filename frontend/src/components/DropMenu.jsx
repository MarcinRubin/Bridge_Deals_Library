import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import React from 'react'
import { Link } from "react-router-dom";

const DropMenu = ({isActive, xtranslate, ytranslate, width, children}) => {

  const nodeRef = useRef(null);
  width = width ? width : 200;

  return (
        <CSSTransition nodeRef={nodeRef} in={isActive} timeout={400} classNames="drop-menu" unmountOnExit>
          <nav className="drop-menu" style={{'--translate': xtranslate, '--top': ytranslate, '--dropmenu-width': width}} ref={nodeRef}>
            {children}
          </nav>
        </CSSTransition>
  );
};

const DropMenuElement = ({text, icon, handleClick}) => {
  return (
        <li>
            <a href="#">
                <i className={icon}></i>
                <span onClick={handleClick ? handleClick : null}>{text}</span>
            </a>
        </li>
    );
};

const DropMenuElementLink = ({text, icon, link, onClick}) =>{
  return (
    <li>
        <Link onClick={onClick} to={link} >
          <i className={icon}></i>
          <span>{text}</span>
          </Link>
    </li>
);
}

const DropMenuHeader = ({children}) => {
  return (
    <>
      {children}
    </>
  );
}

export {DropMenu, DropMenuElement, DropMenuElementLink, DropMenuHeader}
