import todos from "./todos";
import counter from "./counter";

function mergeReducers(reducers) {
  // input should be an object;
  if (typeof reducers !== "object") {
    console.error("Argument, passed to the combineReducers, is not an object");
    return null;
  }

  // Creates a new object for the store state
  // the keys are the reducer keys
  // an the values are just reducers' defaults
  let defaultStoreState = {};

  for (const key in reducers) {
    const reducer = reducers[key];
    defaultStoreState[key] = reducer(undefined, { type: null });
  }

  return (storeState = defaultStoreState, action) => {
    // creates a new state, which is later returned
    let newStoreState = {};
    for (const key in reducers) {
      const reducer = reducers[key];
      // if the action is undefined, then action.type is null
      if (typeof action === "undefined") {
        console.error("No action passed to the reducer");
        action = { type: null };
      }
      newStoreState[key] = reducer(storeState[key], action);
    }
    return newStoreState;
  };
}

export default mergeReducers({ todos, counter });
