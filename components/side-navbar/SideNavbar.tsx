import Link from "next/link";
import DimentionLogo from "../../assets/Side-Navbar/dimention.svg";
import DribbleSvg from "../../assets/Side-Navbar/dribbble.svg";
import AppCircleSvg from "../../assets/Side-Navbar/appcircle.svg";
import AtlassianSvg from "../../assets/Side-Navbar/atlassian.svg";
import BuyMeACoffeeSvg from "../../assets/Side-Navbar/buymeacoffee.svg";
import classes from "./SideNavbar.module.scss";
import * as IoIcons from "react-icons/io";
import Image from "next/image";

const SideNavbar: React.FC = () => {
  return (
    <nav className={classes.sideNavbar}>
      <div className={classes.sideNavbar__brandLogo}>
        <Image src={DimentionLogo} alt="Dribble logo" />
      </div>
      <ul className={classes.sideNavbar__projectLinks}>
        <li>
          <Link className={classes.active} href="/">
            {" "}
            <Image src={AppCircleSvg} alt="Dribble logo" />
          </Link>
        </li>
        <li>
          <Link href="https://github.com/login/oauth/authorize">
            {" "}
            <Image src={DribbleSvg} alt="Dribble logo" />
          </Link>
        </li>
        <li>
          <Link href="/">
            {" "}
            <Image src={BuyMeACoffeeSvg} alt="Dribble logo" />
          </Link>
        </li>
        <li>
          <Link href="/">
            {" "}
            <Image src={AtlassianSvg} alt="Dribble logo" />
          </Link>
        </li>
        <li>
          <Link href="/">
            {" "}
            <IoIcons.IoIosAdd
              style={{
                width: "18px",
                height: "18px",
                fill: "#533BE5",
                transform: "scale(1.1)",
              }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
