import React from "react";
import classes from "./ProjectNavbar.module.scss";
import ProjectImage from "../../assets/Project-Details/ProjectImage.png";
import PartySvg from "../../assets/Project-Details/Party.svg";
import ArrowIcon from "../../assets/Project-Details/arrow.svg"
import ShieldIcon from "../../assets/Project-Details/Shield.svg"
// import "
import Image from "next/image";


const ProjectNavbar: React.FC = () => {
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
          <span className={classes.projectProgress__statsLevel}><Image src={ShieldIcon} alt="Shield Svg"/>Level 1</span>
          <span className={classes.projectProgress__statsPercentage}>40%</span>
        </div>
        <div className={classes.projectProgress__progressBar}style={{"--project-progress":"45%"} as React.CSSProperties}>
          <Image className={classes.projectProgress__progressBar__icon} src={PartySvg} alt="party" />
        </div>
      </div>
      <div className={classes.projectTask}>
          <ul className={classes.projectTaskList}>
            <li>Lorem <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Ipsum <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Dolor <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Amet <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Tempor <Image src={ArrowIcon} alt="arrow"/></li>
            <li>Magna <Image src={ArrowIcon} alt="arrow"/></li>
          </ul>
      </div>
    </div>
  );
};

export default ProjectNavbar;
