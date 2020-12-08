import todos from "./todos";
import counter from "./counter";

const mergeReducers = (reducers) => {
  // input should be an object;
  if (typeof reducers !== "object") {
    console.error("Argument, passed to the mergeReducers, is not an object");
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
      // if the action is undefined, return the previous state
      if (typeof action === "undefined") {
        console.error("No action passed to the reducer");
        return storeState;
      }
      newStoreState[key] = reducer(storeState[key], action);
    }
    return newStoreState;
  };
};

const mergeReducersFlat = (reducers) => {
  // input should be an object;
  if (typeof reducers !== "object") {
    console.error("Argument, passed to the mergeReducersFlat, is not an object");
    return null;
  }

  // Creates a new object for the store state
  // A reducer should return an object
  // Then that object is spread into the defaultStoreState
  let defaultStoreState = {};

  for (const key in reducers) {
    const reducer = reducers[key];
    const newData = reducer(undefined, { type: null });
    if (typeof newData === "object") defaultStoreState = { ...defaultStoreState, ...newData };
    else console.error("Reducer does not return an object");
  }

  return (storeState = defaultStoreState, action) => {
    // creates a new state, which is later returned
    let newStoreState = {};
    for (const key in reducers) {
      const reducer = reducers[key];
      // if the action is undefined, return the previous state
      if (typeof action === "undefined") {
        console.error("No action passed to the reducer");
        return storeState;
      }
      const newData = reducer(storeState, action);
      // A reducer should return an object
      // Then that object is spread into the newStoreState
      if (typeof newData === "object") newStoreState = { ...newStoreState, ...newData };
      else console.error("Reducer does not return an object");
    }
    return newStoreState;
  };
};

export default mergeReducers({ todos, counter });
