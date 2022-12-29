import React, { Fragment } from "react";
import { useAppSelector } from "../../hooks/redux";
import SideNavbar from "../side-navbar/SideNavbar";

const Layout:React.FC<{children?: React.ReactNode;}>=(props)=>{
    const { mode } = useAppSelector((state) => state.ui);
    return (
        <div className={`kanban-board ${mode ? "light-mode" : "dark-mode"}`}>
            <SideNavbar/>
            <main>{props.children}</main>
        </div>
    )
}

export default Layout;