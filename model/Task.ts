export interface Task {
    id: number;
    flyte: string;
    title: string;
    description: string;
    messages: number;
    links: number;
    date: string;
    tag: string;
    status: "Todo" | "In-Progress" | "Completed" | string;
    subtasks?:number;
    subtasksCompleted?:number;
  }