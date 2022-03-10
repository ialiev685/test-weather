import React from "react";
//style
import styles from "./FormControl.module.css";

export const SearchControl = ({ onChange, value }) => {
  return (
    <div className={styles.wrapperControl}>
      <input
        placeholder="serach"
        autoComplete="off"
        className={styles.wrapperControl__control}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name="search"
      />
    </div>
  );
};
