import React from "react";
import classes from "./TaskColumn.module.scss";
import { Draggable, Droppable } from "@krishna2323/react-beautiful-dnd";
import AddIcon from "../../../assets/Project-Content/Task-Cards/Add.svg"
import EllipsisIcon from "../../../assets/Project-Content/Task-Cards/Ellipsis.svg"
import * as IoIcons from "react-icons/io5"
import { TaskHeaderObj } from "../../../model/task-header";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setTaskForm } from "../../../store/UI/UiActions";
import TaskCard from "../../../ui/TaskCard/TaskCard";
import { Task } from "../../../model/Task";
import Image from "next/image";
import { DraggableProvided, DraggableStateSnapshot, DroppableProvided } from "../../../@types/@krishna2323/react-beautiful-dnd/ index";



const TaskColumn: React.FC<{ headerData: TaskHeaderObj }> = (props) => {
  const { borderBottom, icon, title, taskType } = props.headerData;
  const dispatch=useAppDispatch()

  let tasks = useAppSelector((state) => state.tasks);
  const handleAddTaskForm=(e:React.MouseEvent<HTMLButtonElement>)=>{
    dispatch(setTaskForm(true,"Todo"))
  }

  return (
    <div
      className={classes.tasksSection}
      style={{ "--border-bottom": borderBottom } as React.CSSProperties}
    >
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <Image src={icon} alt="circle icon" />
          <h5>{title}</h5>
          <h6>{tasks[taskType].length}</h6>
        </div>
        <div className={classes.headerRight}>
        <Image src={AddIcon} alt="Add icon" />
        <Image src={EllipsisIcon} alt="Ellipsis icon" />
        </div>
      </div>
      <Droppable droppableId={taskType}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className={"tasks"}
            id={taskType}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks[taskType] &&
              tasks[taskType].map((item: Task, key: number) => (
                <Draggable
                  index={key}
                  draggableId={item.id.toString()}
                  key={item.flyte}
                >
                  {(dragableProvided, dragableSnapshot) => (
                    <TaskCard
                      ref={dragableProvided.innerRef}
                      draggableProps={dragableProvided.draggableProps}
                      dragHandleProps={dragableProvided.dragHandleProps}
                      taskInfo={item}
                    />
                  )}
                </Draggable>
              ))}
            {droppableProvided.placeholder}
            <button onClick={handleAddTaskForm} className={classes.addCardBtn}>
            <IoIcons.IoAdd style={{width:"20px",height:"20px",fill:"#4734FE"}}/> Add a Card
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
