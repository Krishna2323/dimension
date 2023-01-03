import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UiSliceType } from "../../store/UI/UiSliceType";
import { getUserSession } from "../../store/User/UserActions";
import SideNavbar from "../side-navbar/SideNavbar";

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { mode }: UiSliceType = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserSession());
  }, []);
  return (
    <div className={`kanban-board ${mode ? "light-mode" : "dark-mode"}`}>
      <SideNavbar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
