import React from "react";
//style
import style from "./FormControl.module.css";

export const EmailControl = ({ props }) => {
  return (
    <div className={style.wrapperControl}>
      <input
        placeholder="Email"
        autoComplete="off"
        className={style.wrapperControl__control}
        type="text"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.email}
        name="email"
      />
      {props.errors.email && (
        <div className={style.wrapperControl__error}>{props.errors.email}</div>
      )}
    </div>
  );
};
