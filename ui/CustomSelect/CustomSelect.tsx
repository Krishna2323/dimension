import React, { useState } from "react";
import classes from "./CustomSelect.module.scss"

const CustomSelect:React.FC<{onChange:(st:string)=>void,default:string,options:string[]}> = (props) => {
    const [currentValue,setCurrentValue]=useState<string>(props.default);
    const [listView,setListView]=useState<boolean>(false)

    const newValueHandler=(event:React.MouseEvent<HTMLLIElement>):void=>{
        const li = event.target as HTMLLIElement;
        setCurrentValue(li.innerText)
        setListView(!listView)
        props.onChange(li.innerHTML)
    }

  return (
    <div className="custom-select">
        <input readOnly={true} className="custom-input__value" value={currentValue} onClick={()=>setListView(!listView)}/>
        <ul className={`custom-input__options ${listView?"custom-input__options--open" :""}`}>
            {props.options.map(e=>(
            <li key={e} onClick={newValueHandler}>{e}</li>
            ))}
        </ul>
    </div>
  );
};

export default CustomSelect;
