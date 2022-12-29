import { AppDispatch } from "../store";
import UI from "./UiSlice";


export const setTaskForm=(taskFormDisplay:boolean,defaultTaskType:string)=>(dispatch:AppDispatch)=>{
    dispatch(UI.actions.updateTaskForm({taskFormDisplay,defaultTaskType}))
}