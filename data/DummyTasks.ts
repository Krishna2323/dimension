import { Task } from "../model/Task";

export const dummmyTasks: Task[][] = [
  [
    {
      id: 1,
      flyte: "Flyte-1",
      title: "UX Adjustments",
      description:
        "Make UI/UX revisions for the project management dashboard on Figma.",
      tag: "UX Design",
      date: "June 12",
      links: 2,
      messages: 3,
      status: "Todo",
    },
    {
      id: 5,
      flyte: "Flyte-5",
      title: "Dashboard Design",
      description:
        "Create a responsive dashboard that looks similar to Github home page design.",
      tag: "UI Design",
      date: "May 12",
      links: 3,
      messages: 2,
      status: "Todo",
    },
  ],
  [
    {
      id: 2,
      flyte: "Flyte-2",
      title: "UI Adjustments",
      description: "Create a consistent look and feel both on web and mobile.",
      tag: "UI Design",
      date: "June 25",
      links: 4,
      messages: 7,
      status: "In-Progress",
      subtasks:8,
      subtasksCompleted:5
    },
    {
      id: 4,
      flyte: "Flyte-4",
      title: "Design System ",
      description: "Create a consistent look and feel both on web and mobile.",
      tag: "UI Design",
      date: "April 12",
      links: 4,
      messages: 2,
      status: "In-Progress",
      subtasks:12,
      subtasksCompleted:8
    },
  ],
  [
    {
      id: 3,
      flyte: "Flyte-3",
      title: "Presentation",
      description:
        "Help business to clearly define their anuual e-commerce digital strategy by creating a high-level plan.",
      tag: "Planning",
      date: "August 12",
      links: 3,
      messages: 9,
      status: "Completed",
    },
    {
      id: 9,
      flyte: "Flyte-6",
      title: "Brainstorming",
      description:
        "Brainstorming is a method design teams use.",
      tag: "Planning",
      date: "September 12",
      links: 7,
      messages: 11,
      status: "Completed",
    },
  ],
];
