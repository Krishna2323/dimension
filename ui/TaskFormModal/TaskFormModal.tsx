import React, { FormEvent, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Task } from "../../model/Task";
import { addTaskAction } from "../../store/Tasks/TaskAction";
import { setTaskForm } from "../../store/UI/UiActions";
import { UiSliceType } from "../../store/UI/UiSliceType";
import Backdrop from "../Backdrop/Backdrop";
import CustomInput from "../CustomInput/CustomInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import classes from "./TaskFormModal.module.scss";

const TaskFormModal = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const {
    taskForm: { display },
  }: UiSliceType = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [flyte, setFlyte] = useState<string>("");
  const [tag, setTag] = useState<string>("UX Design");
  const [subtasks, setSubtasks] = useState<string>("");
  const [status, setStatus] = useState<string>("Todo");

  const onBackdropClick = () => {
    dispatch(setTaskForm(false, "Todo"));
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
  };

  const handleTagChange = (str: string) => {
    setTag(str);
  };

  const handleFlyteChange = (val: string) => {
    setFlyte(val);
  };

  const handleSubtasksChange = (val: string) => {
    setSubtasks(val);
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
    dispatch(addTaskAction(newTask, currentTasks));
    dispatch(setTaskForm(false, "Todo"));
  };

  return (
    <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
      {() =>
        ReactDom.createPortal(
          <>
            <Backdrop onBackdropClick={onBackdropClick} display={display} />
            <form
              onSubmit={onFormSubmit}
              className={`${classes.taskForm} ${
                display ? classes.taskForm__open : ""
              }`}
            >
              <h4 className={classes.formHeading}>Add Task</h4>
              <div className={classes.formInputs}>
                <CustomInput
                  id="task-form-title"
                  label="Title"
                  onChange={handleTitleChange}
                  type={"text"}
                />

                <CustomInput
                  label="Description"
                  id="task-form-description"
                  type={"text"}
                  onChange={handleDescriptionChange}
                />

                <CustomInput
                  id="task-flyte"
                  type={"text"}
                  label="Flyte"
                  onChange={handleFlyteChange}
                />

                <CustomSelect
                  default={tag}
                  options={[
                    "UX Design",
                    "UI Design",
                    "Planning",
                    "Server Architecture",
                  ]}
                  onChange={handleTagChange}
                  id="task-form-tag"
                  label="Tag"
                />

                <CustomInput
                  id="task-form-subtasks"
                  label="Total Subtasks"
                  onChange={handleSubtasksChange}
                  type={"text"}
                />

                <CustomSelect
                  default={status}
                  options={["Todo", "In-Progress", "Completed"]}
                  onChange={handleStatusChange}
                  id="task-form-label"
                  label="Status"
                />
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
