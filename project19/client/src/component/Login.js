import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  axios.defaults.baseURL = "http://localhost:13189";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      // validateToken();
    }
  }, []);

  let validateToken = async () => {
    let formData = new FormData();
    formData.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: formData,
    };
    let JSONData = await fetch(
      "http://localhost:13189/validateToken",
      reqOptions
    );
    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/home");
    } else {
      alert(JSOData.msg);
    }
  };

  let valiadateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("http://localhost:13189/login", reqOptions);
    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      localStorage.setItem("token", JSOData.data.token);
      navigate("/home");
    } else {
      alert(JSOData.msg);
    }

    console.log(JSOData);
  };

  let valiadateLogin2 = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let response = await axios.post("/login", dataToSend);

      console.log(response.data);

      if (response.data.status == "success") {
        dispatch({ type: "login", data: response.data.data });
        localStorage.setItem("token", response.data.data.token);
        navigate("/home");
      } else {
        alert(response.data.msg);
      }

      console.log(response.data);
    };
  };

  return (
    <div className="formCountainer">
      <form>
        <div>
          <h2>Sign In</h2>
          <div>
            <input
              className="loginInput"
              type="email"
              placeholder="Enter Your Email"
              ref={emailInputRef}
            ></input>
          </div>
          <div>
            <input
              className="loginInput"
              type="password"
              placeholder="Enter Your Password"
              ref={passwordInputRef}
            ></input>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                // valiadateLogin();
                dispatch(valiadateLogin2());
              }}
            >
              Login
            </button>
          </div>
          <div className="signUp">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
