import React from "react";
import DashBoard from "./DashBoard";
import { useDispatch } from "react-redux";

function Task() {
  let dispatch = useDispatch();

  return (
    <div>
      <DashBoard />
      <h1>Welcome to Task</h1>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "addTask", data: 1 });
        }}
      >
        Add Task
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "submitTask", data: 2 });
        }}
      >
        Submit Task
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "deleteTask", data: 3 });
        }}
      >
        Delete Task
      </button>
    </div>
  );
}

export default Task;
