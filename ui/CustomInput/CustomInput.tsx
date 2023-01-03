import React from "react";
import classes from "./CustomInput.module.scss";

interface CustomInputInterface {
  onChange: (val: string) => void;
  placeholder?: string;
  label: string;
  id:string,
  type:React.HTMLInputTypeAttribute
}
const CustomInput: React.FC<CustomInputInterface> = (props) => {
  const { onChange, label, placeholder="",id,type } = props;
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onChange(target.value);
  };
  return (
    <div className={classes.customInput}>
      <label htmlFor={id}>{label}</label>
      <input onChange={onChangeHandler} type={type} id={id}  placeholder={placeholder}/>
    </div>
  );
};

export default CustomInput;
