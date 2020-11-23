import React, { useState } from "react";
import styles from "./addTodo.module.css";
import { AiFillPlusSquare } from "react-icons/ai";

function AddTodo({ add }) {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    add(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.body}>
      <input type="text" className={styles.input} value={inputValue} onChange={handleInput} />
      <AiFillPlusSquare className={styles.icon} size="30px" onClick={addTodo} />
    </div>
  );
}

export default AddTodo;
