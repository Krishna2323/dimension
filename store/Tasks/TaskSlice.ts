import { createSlice, PayloadAction, Reducer, Slice } from "@reduxjs/toolkit";
import { dummmyTasks} from "../../data/DummyTasks";
import { Task } from "../../model/Task";
import { TaskPayload } from "../../model/TaskPayload";

export type TasksSliceState = {
    todoTasks: Task[];
    inProgressTasks: Task[];
    completedTasks: Task[];
};

const initialState: TasksSliceState = {
    todoTasks: dummmyTasks[0],
    inProgressTasks: dummmyTasks[1],
    completedTasks: dummmyTasks[2],
};

export const Tasks: Slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    updateTodoTasks: (state, action: PayloadAction<TaskPayload>) => {
      state.todoTasks = action.payload.updatedTasks;
    },
    updateInProgressTasks: (state, action: PayloadAction<TaskPayload>) => {
      state.inProgressTasks = action.payload.updatedTasks;
    },
    updateCompletedTasks: (state, action: PayloadAction<TaskPayload>) => {
      state.completedTasks = action.payload.updatedTasks;
    },
  },
});

export default Tasks;
