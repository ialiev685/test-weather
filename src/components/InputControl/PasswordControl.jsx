import React from "react";
//style
import style from "./FormControl.module.css";

export const PasswordControl = ({ props }) => {
  return (
    <div className={style.wrapperControl}>
      <input
        placeholder="password"
        autoComplete="off"
        className={style.wrapperControl__control}
        type="text"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.password}
        name="password"
      />
      {props.errors.password && (
        <div className={style.wrapperControl__error}>
          {props.errors.password}
        </div>
      )}
    </div>
  );
};
