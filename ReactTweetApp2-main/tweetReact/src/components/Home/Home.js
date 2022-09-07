import React, { Component } from "react";
import Main from "./Main";
import Tweet from "./Tweet";
import Nav from "./Nav";
import { Navigate } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email"),
    };
  }
  render() {
    if(this.state.email===null)
    {
      alert("please signin to access the app");
      return <Navigate to="/" />; 
    }
    return (
      <div>
         <Nav/>
        <Tweet />
        <Main />
      </div>
    );
  }
}

export default Home;
