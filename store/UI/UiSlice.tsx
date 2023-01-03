import { createSlice, Slice } from "@reduxjs/toolkit";
import { UiSliceType } from "./UiSliceType";

let initialState: UiSliceType = {
  taskForm: { display: false, defaultTaskType: "Todo" },
  loginForm: { display: false },
  userRepos: { display: false },
  mode: true,
};

export const UI: Slice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    updateTaskForm(state, action) {
      state.taskForm.display = action.payload.taskFormDisplay;
      state.taskForm.defaultTaskType = action.payload.defaultTaskType;
    },
    toggleMode(state) {
      state.mode = !state.mode;
    },
    toggleLoginForm(state) {
      state.loginForm.display = !state.loginForm.display;
    },
    toggleUserRepos(state) {
      state.userRepos.display = !state.userRepos.display;
    },
  },
});

export const uiSliceActions = UI.actions;
export default UI;
