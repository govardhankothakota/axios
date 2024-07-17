import React from "react";
import DashBoard from "./DashBoard";
import { useDispatch } from "react-redux";

function More() {
  let dispatch = useDispatch();
  return (
    <div>
      <DashBoard />
      <h1>Welcome to More</h1>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "applyLeave", data: 1 });
        }}
      >
        Apply Leave
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "postponeLeave", data: 2 });
        }}
      >
        Postpone Leave
      </button>
      <button type="button"
      
        onClick={() => {
          dispatch({ type: "cancelLeave", data: 3 });
        }}
      >
        Cancel Leave
      </button>
    </div>
  );
}

export default More;
