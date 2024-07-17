import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConformationPopup from "./ConformationPopup";
import axios from "axios";

function Home() {
  let navigate = useNavigate();

  let [conformationPopup, setConformationPopup] = useState(false);

  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });
  let store = useSelector((store) => {
    return store;
  });
  useEffect(() => {
    if (
      store &&
      store.loginReducer &&
      store.loginReducer.loginDetails &&
      store.loginReducer.loginDetails.email
    ) {
    } else {
      navigate("/");
    }
  });

  let onDeleteProfile = async () => {
    let formData = new FormData();
    formData.append("email", storeObj.loginDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: formData,
    };
    let JSONData = await fetch(
      "http://localhost:13189/deleteProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();
    alert(JSOData.msg);

    if (JSOData.status == "success") {
      navigate("/");
    }
  };

  let handleDelete = () => {
    setConformationPopup(true);
  };

  let handleConformYes = () => {
    setConformationPopup(false);
    onDeleteProfile();
  };

  let handleConformNo = () => {
    setConformationPopup(false);
  };

  return (
    <div>
      <DashBoard />
      <h1>Welcome To Home</h1>
      <div>
        <div className="accountDetails">
          <img
            src={`http://localhost:13189/${storeObj.loginReducer.loginDetails.profilePic}`}
          ></img>
          <h2>
            Welcome {storeObj.loginReducer.loginDetails.firstName}{" "}
            {storeObj.loginReducer.loginDetails.lastName}
          </h2>
          <h3>Gender : {storeObj.loginReducer.loginDetails.gender}</h3>
          <h3>Age : {storeObj.loginReducer.loginDetails.age}</h3>
          <h3>Email : {storeObj.loginReducer.loginDetails.email}</h3>
          <h3>MobileNo : {storeObj.loginReducer.loginDetails.mobileNo}</h3>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete account
        </button>
        <button
          onClick={async () => {
            let response = await axios.get("/usersList");
            console.log(response);
          }}
        >
          Get Details
        </button>
      </div>
      <ConformationPopup
        isVisible={conformationPopup}
        onConformYes={handleConformYes}
        onConformNo={handleConformNo}
        message="Do you want to Delete this account?"
      ></ConformationPopup>
    </div>
  );
}

export default Home;
