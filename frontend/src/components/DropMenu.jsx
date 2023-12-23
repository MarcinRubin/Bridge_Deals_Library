import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import React from 'react'
import { Link } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const DropMenu = ({isActive, toggle, xtranslate, ytranslate, width, children}) => {

  const nodeRef = useRef(null);
  width = width ? width : 200;


  return (
        <CSSTransition nodeRef={nodeRef} in={isActive} timeout={400} classNames="drop-menu" unmountOnExit >
          <nav className="drop-menu" style={{'--translate': xtranslate, '--top': ytranslate, '--dropmenu-width': width}} ref={nodeRef}>
            {children}
          </nav>
        </CSSTransition>
  );
};

const DropMenuElement = ({text, icon, onClick}) => {
  return (
        <li>
            <a href="#">
                <i className={icon}></i>
                <span onClick={onClick ? onClick : null}>{text}</span>
            </a>
        </li>
    );
};

const DropMenuElementText = ({text, icon, onClick}) => {
  return (
        <li>
            <span>
                <i className={icon}></i>
                <span onClick={onClick}>{text}</span>
            </span>
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

const DropMenuElementParams = ({text, icon, onClick}) => {
  const test = (value) => {
    console.log(value);
  }

  return (
        <li onClick={() => onClick(text)}>
            <span>
                <i className={icon}></i>
                <span>{text}</span>
            </span>
        </li>
    );
};

export {DropMenu, DropMenuElement, DropMenuElementLink, DropMenuHeader, DropMenuElementParams, DropMenuElementText}
