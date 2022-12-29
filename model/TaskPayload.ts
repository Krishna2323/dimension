import { Task } from "./Task"

export interface TaskPayload{
    updatedTasks:Task[]
}

export interface TodoTasksSlice{
    todoTasks:Task[],
    inProgressTasks:Task[],
    completeTasks:Task[]
}