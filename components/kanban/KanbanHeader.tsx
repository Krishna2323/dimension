import classes from "./KanbanHeader.module.scss";
import Link from "next/link";
import * as BsIcons from "react-icons/bs";
import SearchIcon from "../../assets/Project-Content/Search.svg";
import ArrowRight from "../../assets/Project-Content/ArrowRight.svg";
import React from "react";
import { uiSliceActions } from "../../store/UI/UiSlice";
import { useAppDispatch } from "../../hooks/redux";
import Image from "next/image";

const KanbanHeader = () => {
  const dispatch = useAppDispatch();
  const toggleBtnHandler = () => {
    dispatch(uiSliceActions.toggleMode({}));
  };
  const handleLoginForm = () => {
    dispatch(uiSliceActions.toggleLoginForm({}));
  };
  return (
    <div className={classes.kanbanHeader}>
      <ul className={classes.breadcrums}>
        <li>
          <Link href="#">Projects</Link>
          <Image src={ArrowRight} alt="arrow right" />
        </li>
        <li>
          <Link href="#">Cloud Platform</Link>
          <Image src={ArrowRight} alt="arrow right" />
        </li>
      </ul>
      <span className={classes.selection}>Flyte</span>
      <form className={classes.searchBar}>
        <div>
          <input type={"text"} placeholder="Search"></input>
          <Image src={SearchIcon} alt="Seacrh Icon" />
        </div>
      </form>
      <Link href="#" className={classes.headerIcon}>
        <BsIcons.BsLayoutSidebarReverse />
      </Link>
      <button
        className="btn-primary btn-primary--sm"
        onClick={toggleBtnHandler}
      >
        Toggle Mode
      </button>
      <button
        style={{ marginLeft: "1.2rem" }}
        className="btn-primary btn-primary--sm"
        onClick={handleLoginForm}
      >
        Login
      </button>
    </div>
  );
};

export default KanbanHeader;
