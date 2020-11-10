import React, { Component } from "react";
import styles from "../styles/todo.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdDragHandle } from "react-icons/md";
import { FiSquare, FiCheckSquare } from "react-icons/fi";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offSetY: 0,
      initialY: undefined,
      moving: false,
    };
  }

  startDrag = (e) => {
    this.setState((prevState) => ({ ...prevState, initialY: e.clientY, moving: true }));

    window.addEventListener("mousemove", this.drag);
    window.addEventListener("mouseup", this.endDrag);
  };

  drag = (e) => {
    console.log(this.state.initialY);
    this.setState((prevState) => ({ ...prevState, offSetY: e.clientY - this.state.initialY }));
  };

  endDrag = (e) => {
    window.removeEventListener("mousemove", this.drag);
    window.removeEventListener("mouseup", this.endDrag);

    this.setState((prevState) => ({ ...prevState, offSetY: 0, moving: false }));

    // calculates position change relative to the body (0 - no change)
    let positionChange =
      e.clientY - this.state.initialY >= 0
        ? Math.floor((e.clientY - this.state.initialY) / 50)
        : Math.ceil((e.clientY - this.state.initialY) / 50);

    if (positionChange !== 0) this.props.reOrder(positionChange, this.props.id);
  };

  render() {
    const { text, remove, id, done, changeState } = this.props;
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
    // if the body is moving, then translate the Y of the body and make user-select: none
    if (this.state.moving) {
      bodyStyle = { transform: `translateY(${this.state.offSetY}px)`, userSelect: "none" };
    }
    return (
      <div className={styles.body} style={bodyStyle}>
        {isDoneIcon}
        <span className={styles.box}>
          <span className={textStyle}>{text}</span>
          <MdDragHandle className={styles.dragIcon} size="25px" onMouseDown={this.startDrag} />
        </span>
        <AiFillDelete className={styles.deleteIcon} size="30px" onClick={() => remove(id)} />
      </div>
    );
  }
}

export default Todo;
