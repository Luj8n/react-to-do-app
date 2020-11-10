import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import styles from "./styles/main.module.css";

function App() {
  const [todos, setTodos] = useState([
    {
      name: "Something",
      isDone: false,
      id: 0,
    },
    {
      name: "Something else",
      isDone: true,
      id: 1,
    },
  ]);

  function deleteTodo(id) {
    // remove a todo if its' id matches the input id
    setTodos(todos.filter((el) => el.id !== id));
  }

  function addTodo(text) {
    // newId = (currently max id in the list) + 1
    let newId = todos ? todos.reduce((maxId, el) => Math.max(maxId, el.id), 0) + 1 : 0;
    setTodos([...todos, { name: text, isDone: false, id: newId }]);
  }

  function changeTodoState(id) {
    // change the isDone state
    setTodos(todos.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : { ...el, isDone: el.isDone })));
  }
  function reOrderTodos(positionChange, id) {
    let currentIndex;
    let item;

    let todosWithoutItem = todos.filter((el, index) => {
      if (id === el.id) {
        // get the item we are moving and its' index
        item = el;
        currentIndex = index;
        return false;
      } else {
        return true;
      }
    });

    let nextIndex = currentIndex + positionChange;
    if (nextIndex < 0) {
      nextIndex = 0;
    } else if (nextIndex > todos.length) {
      nextIndex = todos.length;
    }

    const newTodos = [...todosWithoutItem.slice(0, nextIndex), item, ...todosWithoutItem.slice(nextIndex)];
    setTodos(newTodos);
  }
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

export default App;
