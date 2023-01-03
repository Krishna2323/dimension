import React, { useEffect } from "react";
import classes from "./ProjectNavbar.module.scss";
import ProjectImage from "../../assets/Project-Details/ProjectImage.png";
import PartySvg from "../../assets/Project-Details/Party.svg";
import ShieldIcon from "../../assets/Project-Details/Shield.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { uiSliceActions } from "../../store/UI/UiSlice";
import CodeExplorer from "./CodeExplorer";
import { GithubImportedRepo } from "../../model/GithubAPI";
import { UserSliceType } from "../../store/User/UserSliceType";

const ProjectNavbar: React.FC = () => {
  const { user, githubImportedRepos }: UserSliceType = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  const handlerUserReposClick = () => {
    dispatch(uiSliceActions.toggleUserRepos({}));
  };

  const toggleGithubReposModal = () => {
    console.log("REEE");
    dispatch(uiSliceActions.toggleLoginForm({}));
  };

  return (
    <div className={classes.projectNavbar}>
      <div className={classes.projectName}>
        <h2>Project Name</h2>
      </div>
      <div className={classes.projectImage}>
        <Image src={ProjectImage} alt="Project" />
      </div>
      <div className={classes.projectProgress}>
        <div className={classes.projectProgress__stats}>
          <span className={classes.projectProgress__statsLevel}>
            <Image src={ShieldIcon} alt="Shield Svg" />
            Level 1
          </span>
          <span className={classes.projectProgress__statsPercentage}>40%</span>
        </div>
        <div
          className={classes.projectProgress__progressBar}
          style={{ "--project-progress": "45%" } as React.CSSProperties}
        >
          <Image
            className={classes.projectProgress__progressBar__icon}
            src={PartySvg}
            alt="party"
          />
        </div>
      </div>
      {/* <div className={classes.projectTask}>
          <ul className={classes.projectTaskList}>
            <li>Lorem <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Ipsum <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Dolor <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Amet <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Tempor <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Magna <Image src={ArrowIcon} alt="arrow"/></li>
          </ul>
      </div> */}
      <div className={classes.githubImportedRepos}>
        {githubImportedRepos &&
          githubImportedRepos.map((repo: GithubImportedRepo) => (
            <CodeExplorer key={repo.tree[0].path} repo={repo} />
          ))}
      </div>
      <div className={classes.githubLinks}>
        {!user && (
          <button
            onClick={toggleGithubReposModal}
            className="btn-form btn-form--center"
          >
            Authorize With Github
          </button>
        )}
        {user && user.access_token && (
          <button
            onClick={handlerUserReposClick}
            className="btn-form btn-form--center"
          >
            Import Github Repo&apos;s
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectNavbar;
