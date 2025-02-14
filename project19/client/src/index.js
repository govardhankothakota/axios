import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";

let initialStore = {
  loginDetails: {},
  leaves: [],
  tasks: [],
};

let loginReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("Inside Reducer");

  if ((dispatchedObj.type = "login")) {
    return {
      ...latestStore,
      loginDetails: dispatchedObj.data,
    };
  }
  return latestStore;
};

let leavesReducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type == "applyLeave") {
    return {
      ...latestStore,
      leaves: latestStore.leaves.concat([dispatchedObj.data]),
    };
  } else if (dispatchedObj.type == "postponeLeave") {
    return {
      ...latestStore,
      leaves: latestStore.leaves.concat([dispatchedObj.data]),
    };
  } else if (dispatchedObj.type == "cancelLeave") {
    return {
      ...latestStore,
      leaves: latestStore.leaves.concat([dispatchedObj.data]),
    };
  }

  return latestStore;
};
let taskReducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type == "addTask") {
    return {
      ...latestStore,
      tasks: latestStore.tasks.concat([dispatchedObj.data]),
    };
  } else if (dispatchedObj.type == "submitTask") {
    return {
      ...latestStore,
      tasks: latestStore.tasks.concat([dispatchedObj.data]),
    };
  } else if (dispatchedObj.type == "deleteTask") {
    return {
      ...latestStore,
      tasks: latestStore.tasks.concat([dispatchedObj.data]),
    };
  }

  return latestStore;
};

let store = createStore(
  combineReducers({ loginReducer, leavesReducer, taskReducer }),
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
