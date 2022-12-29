import { createSlice, Slice } from "@reduxjs/toolkit";



export const UI: Slice = createSlice({
  name: "ui",
  initialState: {taskForm:{display:false,defaultTaskType:"Todo"},mode:true},
  reducers: {
    updateTaskForm(state,action){
        state.taskForm.display=action.payload.taskFormDisplay;
        state.taskForm.defaultTaskType=action.payload.defaultTaskType;
    },
    toggleMode(state){
      state.mode=!state.mode
    }
  },
});

export const uiSliceActions=UI.actions
export default UI;
