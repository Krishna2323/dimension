import classes from "./KanbanToolbar.module.scss";
import User_1_Avatar from "../../assets/User-Avatars/User-1.svg";
import User_2_Avatar from "../../assets/User-Avatars/User-2.svg";
import CloudIcon from "../../assets/Project-Content/Toolbar/Cloud.svg";
import MenuIcon from "../../assets/Project-Content/Toolbar/Menu.svg";
import HeadphoneIcon from "../../assets/Project-Content/Toolbar/Headphone.svg";
import LinkIcon from "../../assets/Project-Content/Toolbar/Link.svg";
import DashboardIcon from "../../assets/Project-Content/Toolbar/Dashboard.svg";
import Image from "next/image";

const KanbanToolbar = () => {
  return (
    <div className={classes.kanbanToolbar}>
      <div className={classes.btnsDiv}>
        <button className="btn-primary" style={{padding:".4rem .7rem",gap:".6rem"}}>
          <Image src={CloudIcon} alt="cloud icon" />
          25%
        </button>
        <button className="btn-primary">Filter</button>
      </div>
      <div className={classes.avatars}>
        <Image src={User_1_Avatar} alt="user-1" />
        <Image src={User_2_Avatar} alt="user-2" />
      </div>
      <div className={classes.btnsDiv}>
        <button className="btn-primary btn-primary--divider">
          <div  className="icon-bg-grey">
            <Image src={MenuIcon} alt="Menu icon" />
          </div>
          <Image src={DashboardIcon} alt="Dashboard icon" />
        </button>
        <button className="btn-primary" style={{height:"2.8rem"}}>
          <Image src={HeadphoneIcon} alt="Headphone icon" />
        </button>
        <button className="btn-primary btn-primary--sm" style={{color:"var(--btn-color-secondary)", height:"2.8rem"}}>
          <Image src={LinkIcon} alt="Link icon" />
          Share
        </button>
      </div>
    </div>
  );
};

export default KanbanToolbar;
