import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Navigate } from "react-router-dom";
class AllUsers extends Component {
  constructor() {
    super();
    this.userArray = [];
    this.state = {
      userArray: [],
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email")
    };
  }
  componentDidMount() {
    this.getAllUsers();
  }
  componentDidUpdate() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios
      .get(`http://localhost:8080/api/v1.0/tweets/users/all`)
      .then((res) => {
        this.userArray = res.data;
        this.setState({ userArray: res.data });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  render() {
    if(this.state.email===null)
    {
      alert("please signin to access the app");
      return <Navigate to="/" />; 
    }
    return (
      <div>
        <Nav />

        <ul>
          {this.state.userArray.map((data) => (
            <div key={data.id} className="card" id="allUsers">
              <div className="row">
                <div className="col-sm">
                  <span>
                    <b>UserName:</b>
                    {data.username}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <span>
                    <b>Email:</b>
                    {data.email}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <span>
                    <b>Age:</b>
                    {data.age}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <span>
                    <b>Sex:</b>
                    {data.sex}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllUsers;
