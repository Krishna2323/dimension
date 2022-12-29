import DashedCircle from "../../../assets/Project-Content/Dashed-Circle.svg";
import In_Progress_Icon from "../../../assets/Project-Content/in-progress.svg"
import Completed_Icon from "../../../assets/Project-Content/Completed.svg"
import { TaskHeaderObj } from "../../../model/task-header";


export const TaskHeaderData:TaskHeaderObj[] = [
  {
    title: "TODO",
    icon: DashedCircle,
    totalTask: 2,
    borderBottom: "var(--task-heading-color)",
    taskType:"todoTasks"
  },
  {
    title: "IN-PROGRESS",
    icon: In_Progress_Icon,
    totalTask: 8,
    borderBottom: "#4734FE",
    taskType:"inProgressTasks"

  },
  {
    title: "COMPLETED",
    icon: Completed_Icon,
    totalTask: 2,
    borderBottom: "#78C552",
    taskType:"completedTasks"

  },
];
