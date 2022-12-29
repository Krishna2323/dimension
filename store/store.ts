import { configureStore } from "@reduxjs/toolkit";
import Tasks from "./Tasks/TaskSlice";
import TasksForm from "./UI/UiSlice";

const store = configureStore({
  reducer: {
    tasks:Tasks.reducer,
    ui:TasksForm.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
