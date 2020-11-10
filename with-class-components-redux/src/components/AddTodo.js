import React, { Component } from "react";
import styles from "../styles/addTodo.module.css";
import { AiFillPlusSquare } from "react-icons/ai";

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  handleInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  addTodo = () => {
    this.props.add(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <div className={styles.body}>
        <input type="text" className={styles.input} value={this.state.inputValue} onChange={this.handleInput} />
        <AiFillPlusSquare className={styles.icon} size="30px" onClick={this.addTodo} />
      </div>
    );
  }
}

export default AddTodo;
