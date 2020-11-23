import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct, incrementAct, decrementAct } from "../redux/actions";
import { getTodos, getCounter } from "../redux/selectors";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import styles from "./main.module.css";

function App({ addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct, todos, incrementAct, decrementAct, counter }) {
  useEffect(() => {
    console.log(counter);
  }, [counter]);

  const addTodo = (text) => {
    addTodoAct({ name: text, isDone: false });
    incrementAct(1);
  };

  const deleteTodo = (id) => {
    removeTodoAct({ id });
    decrementAct(1);
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

const mapStateToProps = (state) => {
  return {
    todos: getTodos(state),
    counter: getCounter(state),
  };
};

const mapDispatchToProps = { addTodoAct, removeTodoAct, changeTodoAct, reOrderTodoAct, incrementAct, decrementAct };

export default connect(mapStateToProps, mapDispatchToProps)(App);
