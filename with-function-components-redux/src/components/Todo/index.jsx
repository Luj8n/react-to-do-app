import React, { useState, useEffect } from "react";
import styles from "./todo.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdDragHandle } from "react-icons/md";
import { FiSquare, FiCheckSquare } from "react-icons/fi";

const Todo = ({ text, remove, id, done, changeState, reOrder }) => {
  const [offSetY, setOffSetY] = useState(0);
  const [initialY, setInitialY] = useState(undefined);
  const [moving, setMoving] = useState(false);

  const startDrag = (e) => {
    setMoving(true);
    setInitialY(e.clientY);
  };

  const drag = (e) => {
    setOffSetY(e.clientY - initialY);
  };

  const endDrag = (e) => {
    setOffSetY(0);
    setInitialY(undefined);
    // calculates position change relative to the body (0 - no change)
    let positionChange;
    if (e.clientY - initialY >= 0) {
      positionChange = Math.floor((e.clientY - initialY) / 50);
    } else {
      positionChange = Math.ceil((e.clientY - initialY) / 50);
    }
    if (positionChange !== 0) reOrder(positionChange, id);
    setMoving(false);
  };

  const addListeners = () => {
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", endDrag);
  };

  const removeListeners = () => {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mouseup", endDrag);
  };

  useEffect(() => {
    if (moving) {
      addListeners();
    } else {
      removeListeners();
    }
    return () => {
      setOffSetY(0);
      removeListeners();
    };
  }, [moving]);

  let isDoneIcon;
  let textStyle;
  let bodyStyle;
  if (done) {
    isDoneIcon = <FiCheckSquare className={styles.checkboxIcon} size="30px" onClick={() => changeState(id)} />;
    textStyle = `${styles.striked} ${styles.text}`;
  } else {
    isDoneIcon = <FiSquare className={styles.checkboxIcon} size="30px" onClick={() => changeState(id)} />;
    textStyle = styles.text;
  }
  //if the body is moving, then translate the Y of the body and make user-select: none
  if (moving) {
    bodyStyle = {
      transform: `translateY(${offSetY}px)`,
      userSelect: "none",
    };
  }
  return (
    <div className={styles.body} style={bodyStyle}>
      {isDoneIcon}
      <span className={styles.box}>
        <span className={textStyle}>{text}</span>
        <MdDragHandle className={styles.dragIcon} size="25px" onMouseDown={startDrag} />
      </span>
      <AiFillDelete className={styles.deleteIcon} size="30px" onClick={() => remove(id)} />
    </div>
  );
};

export default Todo;
