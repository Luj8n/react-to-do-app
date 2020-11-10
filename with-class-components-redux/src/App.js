import React, { Component } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import styles from "./styles/main.module.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
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
      ],
    };
  }

  deleteTodo = (id) => {
    // remove a todo if its' id matches the input id
    this.setState((prevState) => ({ todos: prevState.todos.filter((el) => el.id !== id) }));
  };

  addTodo = (text) => {
    // newId = (currently max id in the list) + 1
    let newId = this.state.todos ? this.state.todos.reduce((maxId, el) => Math.max(maxId, el.id), 0) + 1 : 0;
    this.setState((prevState) => ({ todos: [...prevState.todos, { name: text, isDone: false, id: newId }] }));
  };

  changeTodoState = (id) => {
    // change the isDone state
    this.setState((prevState) => ({
      todos: prevState.todos.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : { ...el, isDone: el.isDone })),
    }));
  };

  reOrderTodos = (positionChange, id) => {
    let currentIndex;
    let item;

    let todosWithoutItem = this.state.todos.filter((el, index) => {
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
    } else if (nextIndex > this.state.todos.length) {
      nextIndex = this.state.todos.length;
    }

    const newTodos = [...todosWithoutItem.slice(0, nextIndex), item, ...todosWithoutItem.slice(nextIndex)];

    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div className={styles.center}>
        <AddTodo add={this.addTodo} />
        {this.state.todos
          ? this.state.todos.map((el) => (
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

export default App;
