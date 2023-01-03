import { type } from "os";
import React, { useState } from "react";
import classes from "./CustomSelect.module.scss";

type CustomSelectType = {
  onChange: (st: string) => void;
  default: string;
  options: string[];
  label:string;
  id:string
};

const CustomSelect: React.FC<CustomSelectType> = (props) => {
  const {options,id,label}=props
  const [currentValue, setCurrentValue] = useState<string>(props.default);
  const [listView, setListView] = useState<boolean>(false);

  const newValueHandler = (event: React.MouseEvent<HTMLLIElement>): void => {
    const li = event.target as HTMLLIElement;
    setCurrentValue(li.innerText);
    setListView(!listView);
    props.onChange(li.innerHTML);
  };

  return (
    <div className={classes.customSelect}>
      <label htmlFor={id}>{label}</label>
      <input
        readOnly={true}
        className={classes.customInput__value}
        value={currentValue}
        onClick={() => setListView(!listView)}
      />
      <ul
        className={`${classes.customInput__options} ${
          listView ? classes.customInput__optionsOpen : ""
        }`}
      >
        {options.map((e) => (
          <li key={e} onClick={newValueHandler}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
