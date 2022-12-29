import classes from "./TaskCard.module.scss";
import React from "react";
import User_1 from "../../assets/User-Avatars/User-1.svg";
import User_2 from "../../assets/User-Avatars/User-4.svg";
import User_3 from "../../assets/User-Avatars/User-3.svg";
import LinkIcon from "../../assets/Task-Card/link.svg";
import CalenderIcon from "../../assets/Task-Card/calendar.svg";
import CommentIcon from "../../assets/Task-Card/message.svg";
import TickCircleIcon from "../../assets/Task-Card/tick-circle.svg";
import Completed_Icon from "../../assets/Project-Content/Completed.svg"
import Image from "next/image";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@krishna2323/react-beautiful-dnd";
import { Task } from "../../model/Task";

interface ChildComponentProps {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  taskInfo: Task;
}

const TaskCard = React.forwardRef<HTMLDivElement, ChildComponentProps>(
  (props, ref) => {
    let { flyte, title, description, tag, links, messages, date, status } =
      props.taskInfo;
    return (
      <div
        className={classes.taskCard}
        ref={ref}
        {...props.dragHandleProps}
        {...props.draggableProps}
      >
        <div className={classes.extraBg}></div>
        <span className={classes.flyte}>{flyte}</span>
        <h5 className={classes.title}>{title}</h5>
        <p className={classes.description}>{description}</p>
        <div className={classes.tagAndAvatars}>
          <span className={classes.tag}>{tag}</span>
          <div className={classes.avatars}>
            <Image src={User_1} alt="User 1" />
            <Image src={User_2} alt="User 1" />
            <Image src={User_3} alt="User 1" />
          </div>
        </div>
        <div className={classes.bottomBar}>
          <span>
            <Image src={CommentIcon} alt="link" />
            {messages}
          </span>
          {status === "In-Progress" && (
            <span>
              <Image src={TickCircleIcon} alt="link" />
              {links}
            </span>
          )}
          <span>
            <Image src={LinkIcon} alt="link" />
            {links}
          </span>
          {status !== "Completed" && (
            <span className="mr-l-auto">
              <Image src={CalenderIcon} alt="link" />
              {date}
            </span>
          )}
          {status === "Completed" && (
            <span className="mr-l-auto" style={{fontWeight:"700",fontFamily:"Gt-Whelshime-Regular,sans-serif",color:"#78C552"}}>
              <Image width={16} height={16} src={Completed_Icon} alt="link" />
              {"Done"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default TaskCard;
