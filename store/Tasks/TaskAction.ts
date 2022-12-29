import { DraggableLocation } from "../../@types/@krishna2323/react-beautiful-dnd/ index";
import { Task } from "../../model/Task";
import { AppDispatch } from "../store";
import Tasks, { TasksSliceState } from "./TaskSlice";

export const updateSameColumn =
  (tasks: Task[], destination: DraggableLocation, source: DraggableLocation) =>
  async (dispatch: AppDispatch) => {
    let newTasks = reArrangeTasksHandler(
      tasks,
      source.index,
      destination.index
    );
    let selector = todoSliceSelector(destination.droppableId);
    dispatch(Tasks.actions[selector]({ updatedTasks: newTasks }));
  };

export const updateMultipleColumn =
  (
    tasks: TasksSliceState | any,
    destination: DraggableLocation,
    source: DraggableLocation
  ) =>
  (dispatch: AppDispatch) => {
    let updatedTaskForSource = tasks[source.droppableId].filter(
      (e: Task, i: number) => i !== source.index
    );
    let selectorForSource = todoSliceSelector(source.droppableId);
    dispatch(
      Tasks.actions[selectorForSource]({ updatedTasks: updatedTaskForSource })
    );

    //   Adding Task To New Task Section.
    let newTask = tasks[source.droppableId][source.index];
    let updatedTaskForDestination = Array.from(tasks[destination.droppableId]);
    console.log(newTask, tasks[destination.droppableId]);
    updatedTaskForDestination.splice(destination.index, 0, newTask);
    let selectorForDesination = todoSliceSelector(destination.droppableId);
    dispatch(
      Tasks.actions[selectorForDesination]({
        updatedTasks: updatedTaskForDestination,
      })
    );
  };

export const reArrangeTasksHandler: (
  tasks: Task[],
  currentIndex: number,
  newIndex: number
) => Task[] = (tasks, currentIndex, newIndex) => {
  let reArrangedTasks = Array.from(tasks);
  const [removed] = reArrangedTasks.splice(currentIndex, 1);
  reArrangedTasks.splice(newIndex, 0, removed);
  console.log(reArrangedTasks);
  return reArrangedTasks;
};

const todoSliceSelector = (key: string) => {
  return `update${key.replace(key[0], key[0].toUpperCase())}`;
};

// Add Task ///////////////////////////

export const addTaskAction =
  (newTask: Task, currentTasks: Task[]) => (dispatch: AppDispatch) => {
    let selector = newTask.status.split("-").map((e, i) => {
      return e.replace(e[0],e[0].toUpperCase())
    }).join("")
    // let selector= todoSliceSelector(newTask.status)
    let updatedTasks=[...currentTasks,newTask]
    console.log(selector,updatedTasks)
    dispatch(
        Tasks.actions[`update${selector}Tasks`]({
          updatedTasks
        })
      );
  };
