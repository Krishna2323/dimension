import React from "react";
import { Transition } from "react-transition-group";
import ReactDom from "react-dom";
import classes from "./Backdrop.module.scss";

type BackdropType = {
  display: boolean;
  onBackdropClick: () => void;
};

const Backdrop: React.FC<BackdropType> = (props) => {
  const { display, onBackdropClick } = props;
  return (
    <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
      {() =>
        ReactDom.createPortal(
          <div
            onClick={onBackdropClick}
            className={`${classes.backdrop} ${
              display ? classes.backdropOpen : ""
            }`}
            style={{ transition: `all .3s` }}
          ></div>,
          document.getElementById("backdrop")!
        )
      }
    </Transition>
  );
};

export default Backdrop;
