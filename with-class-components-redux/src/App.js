import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct } from "./redux/actions";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import styles from "./styles/main.module.css";

class App extends Component {
  addTodo = (text) => {
    this.props.addTodoAct({ name: text, isDone: false });
  };

  deleteTodo = (id) => {
    this.props.removeTodoAct({ id });
  };

  changeTodoState = (id) => {
    this.props.changeTodoAct({ id });
  };

  reOrderTodos = (positionChange, id) => {
    this.props.reOrderTodoAct({ positionChange, id });
  };

  render() {
    return (
      <div className={styles.center}>
        <AddTodo add={this.addTodo} />
        {this.props.todos
          ? this.props.todos.map((el) => (
              <Todo
                key={el.id}
                id={el.id}
                text={el.name}
                done={el.isDone}
                remove={this.deleteTodo}
                changeState={this.changeTodoState}
                reOrder={this.reOrderTodos}
              />
            ))
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos.todos };
}

export default connect(mapStateToProps, { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct })(App);
