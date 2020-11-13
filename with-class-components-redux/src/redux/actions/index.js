export function addTodoAct(data) {
  return {
    type: "ADD_TODO",
    payload: data,
  };
}

export function removeTodoAct(data) {
  return {
    type: "REMOVE_TODO",
    payload: data,
  };
}

export function changeTodoAct(data) {
  return {
    type: "CHANGE_TODO",
    payload: data,
  };
}

export function reOrderTodoAct(data) {
  return {
    type: "REORDER_TODO",
    payload: data,
  };
}
