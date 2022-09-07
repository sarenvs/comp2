import React, { Component } from "react";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import "./Title.css";

window.sessionStorage.clear();
class Title extends Component {

  render() {
    return (
      <div className="container">
        
        <div className="card" id ="card">
          <Login />
        </div>
        <div className="card" id ="card">
          <SignUp />
        </div>
      </div>
    );
  }
}

export default Title;
