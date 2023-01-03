import React from "react";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { uiSliceActions } from "../../../store/UI/UiSlice";
import { loginUserWithGithub } from "../../../store/User/UserActions";
import { UiSliceType } from "../../../store/UI/UiSliceType";
import CustomInput from "../../../ui/CustomInput/CustomInput";
import classes from "./LoginForm.module.scss";

const LoginForm = () => {
  const {
    loginForm: { display },
  }: UiSliceType = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(uiSliceActions.toggleLoginForm({}));
  };

  // const handleNameChange = (val: string) => {
  //   setName(val);
  // };
  // const handleEmailChange = (val: string) => {
  //   setEmail(val);
  // };
  // const handlePasswordChange = (val: string) => {
  //   setPassword(val);
  // };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUserWithGithub());
  };
  return (
    <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
      {() =>
        ReactDom.createPortal(
          <>
            <div
              onClick={onBackdropClick}
              className={`${classes.backdrop} ${
                display ? classes.backdropOpen : ""
              }`}
              style={{ transition: `all .3s` }}
            ></div>
            <form
              className={`${classes.loginFormModal} ${
                display
                  ? classes.loginFormModal__open
                  : classes.loginFormModal__close
              }`}
              onSubmit={handleFormSubmit}
            >
              {/* <CustomInput
                id="login-form-name"
                label="Name"
                onChange={handleNameChange}
                type={"text"}
              />
              <CustomInput
                id="login-form-email"
                label="Email"
                onChange={handleEmailChange}
                type={"email"}
              />
              <CustomInput
                id="login-form-password"
                label="Password"
                onChange={handlePasswordChange}
                type={"password"}
              /> */}
              <button className="btn-form">Login With Github</button>
            </form>
          </>,
          document.getElementById("login-form-modal")!
        )
      }
    </Transition>
  );
};

export default LoginForm;
