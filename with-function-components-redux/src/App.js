import React from "react";
import { connect } from "react-redux";
import { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct } from "./redux/actions";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import styles from "./styles/main.module.css";

function App({ addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct, todos }) {
  const addTodo = (text) => {
    addTodoAct({ name: text, isDone: false });
  };

  const deleteTodo = (id) => {
    removeTodoAct({ id });
  };

  const changeTodoState = (id) => {
    changeTodoAct({ id });
  };

  const reOrderTodos = (positionChange, id) => {
    reOrderTodoAct({ positionChange, id });
  };

  return (
    <div className={styles.center}>
      <AddTodo add={addTodo} />
      {todos
        ? todos.map((el) => (
            <Todo
              key={el.id}
              id={el.id}
              text={el.name}
              done={el.isDone}
              remove={deleteTodo}
              changeState={changeTodoState}
              reOrder={reOrderTodos}
            />
          ))
        : null}
    </div>
  );
}

function mapStateToProps(state) {
  return { todos: state.todos.todos };
}

export default connect(mapStateToProps, { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct })(App);
