import { ADD_TODO, REMOVE_TODO, CHANGE_TODO, REORDER_TODO, INCREMENT, DECREMENT } from "../types";

export function addTodoAct(payload) {
  return {
    type: ADD_TODO,
    payload,
  };
}

export function removeTodoAct(payload) {
  return {
    type: REMOVE_TODO,
    payload,
  };
}

export function changeTodoAct(payload) {
  return {
    type: CHANGE_TODO,
    payload,
  };
}

export function reOrderTodoAct(payload) {
  return {
    type: REORDER_TODO,
    payload,
  };
}

export function incrementAct(payload) {
  return {
    type: INCREMENT,
    payload,
  };
}

export function decrementAct(payload) {
  return {
    type: DECREMENT,
    payload,
  };
}
