import { ADD_TODO, REMOVE_TODO, CHANGE_TODO, REORDER_TODO } from "../types";

let defaultTodos = [
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
];

function todos(state = defaultTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      let { name, isDone } = action.payload;
      let nextId = state ? state.reduce((maxId, el) => Math.max(maxId, el.id), 0) + 1 : 0;
      return [...state, { name, isDone, id: nextId }];
    case REMOVE_TODO:
      return state.filter((el) => el.id !== action.payload.id);
    case CHANGE_TODO:
      return state.map((el) => (el.id === action.payload.id ? { ...el, isDone: !el.isDone } : el));
    case REORDER_TODO:
      let currentIndex;
      let item;

      let todosWithoutItem = state.filter((el, index) => {
        if (action.payload.id === el.id) {
          // get the item we are moving and its index
          item = el;
          currentIndex = index;
          return false;
        } else {
          return true;
        }
      });

      let nextIndex = currentIndex + action.payload.positionChange;
      if (nextIndex < 0) {
        nextIndex = 0;
      } else if (nextIndex > state.length) {
        nextIndex = state.length;
      }

      return [...todosWithoutItem.slice(0, nextIndex), item, ...todosWithoutItem.slice(nextIndex)];
    default:
      return state;
  }
}

export default todos;
