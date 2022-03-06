import React from "react";
//style
import style from "./FormControl.module.css";

export const LoginControl = ({ props }) => {
  return (
    <div className={style.wrapperControl}>
      <input
        placeholder="login"
        autoComplete="off"
        className={style.wrapperControl__control}
        type="text"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.login}
        name="login"
      />
      {props.errors.login && (
        <div className={style.wrapperControl__error}>{props.errors.login}</div>
      )}
    </div>
  );
};
