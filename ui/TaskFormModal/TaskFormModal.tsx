import React, { FormEvent, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Task } from "../../model/Task";
import { addTaskAction } from "../../store/Tasks/TaskAction";
import { setTaskForm } from "../../store/UI/UiActions";
import CustomSelect from "../CustomSelect/CustomSelect";
import classes from "./TaskFormModal.module.scss";

const TaskFormModal = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const { display, defaultTaskType } = useAppSelector(
    (state) => state.ui.taskForm
  );
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [flyte, setFlyte] = useState<string>("");
  const [tag, setTag] = useState<string>("UX Design");
  const [subtasks, setSubtasks] = useState<string>("");
  const [status, setStatus] = useState<string>("Todo");

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setTaskForm(false, "Todo"));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setDescription(target.value);
  };
  const handleTagChange = (str: string) => {
    // setTag(target.innerHTML)
    console.log(str);
    setTag(str);
  };
  const handleFlyteChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(flyte);
    setFlyte(target.value);
  };
  const handleSubtasksChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setSubtasks(target.value);
  };
  const handleStatusChange = (str: string) => {
    setStatus(str);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const date = new Date();
    let dateModified = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(date);
    let id =
      Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
    let newTask: Task = {
      date: dateModified,
      description,
      flyte,
      links: 2,
      messages: 4,
      tag,
      status,
      title,
      id,
    };
    let selector = newTask.status
      .split("-")
      .map((e, i) => {
        if (i === 0) return e.replace(e[0], e[0].toLowerCase());
        return e.replace(e[0], e[0].toUpperCase());
      })
      .join("");
    let currentTasks = tasks[`${selector}Tasks`];
    console.log(selector, currentTasks);
    dispatch(addTaskAction(newTask, currentTasks));
    dispatch(setTaskForm(false, "Todo"));
  };

  return (
    <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
      {() =>
        ReactDom.createPortal(
          <>
            <div
              onClick={onBackdropClick}
              className={`backdrop ${display ? "backdrop--open" :""}`}
              style={{ transition: `all .3s` }}
            ></div>
              <form
                onSubmit={onFormSubmit}
                className={`task-form ${display ? "task-form--open" :""}`}
              >
                <h4 className="form-heading">Add Task</h4>
                <div className="form-inputs">
                  <div className="form-input">
                    <label htmlFor="task-title">Title</label>
                    <input
                      onChange={handleTitleChange}
                      type={"text"}
                      id="task-title"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="task-description">Description</label>
                    <input
                      onChange={handleDescriptionChange}
                      type={"text"}
                      id="task-description"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="task-flyte">Flyte</label>
                    <input
                      onChange={handleFlyteChange}
                      type={"text"}
                      id="task-flyte"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="task-tag">Tag</label>
                    <CustomSelect
                      default={tag}
                      options={[
                        "UX Design",
                        "UI Design",
                        "Planning",
                        "Server Architecture",
                      ]}
                      onChange={handleTagChange}
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="task-subtasks">Total Subtasks</label>
                    <input
                      onChange={handleSubtasksChange}
                      type={"number"}
                      id="task-subtasks"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="task-status">Status</label>
                    <CustomSelect
                      default={status}
                      options={["Todo", "In-Progress", "Completed"]}
                      onChange={handleStatusChange}
                    />
                  </div>
                </div>
                <button className="btn-form">Add Task</button>
              </form>
            
          </>,
          document.getElementById("task-form-modal")!
        )
      }
    </Transition>
  );
};

export default TaskFormModal;
