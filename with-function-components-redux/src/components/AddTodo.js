import React, { useState } from "react";
import styles from "../styles/addTodo.module.css";
import { AiFillPlusSquare } from "react-icons/ai";

function AddTodo({ add }) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function addTodo() {
    add(inputValue);
    setInputValue("");
  }

  return (
    <div className={styles.body}>
      <input type="text" className={styles.input} value={inputValue} onChange={handleInput} />
      <AiFillPlusSquare className={styles.icon} size="30px" onClick={addTodo} />
    </div>
  );
}

export default AddTodo;
