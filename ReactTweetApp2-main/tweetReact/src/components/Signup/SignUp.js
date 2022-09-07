import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();

    this.username = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
    this.age = React.createRef();
    this.sex = React.createRef();
    this.state = {
      error: "",
      success:""
    };
  }

  onSubmitHandler = (event) => {
    let body = {
      username: this.username.current.value,
      password: this.password.current.value,
      email: this.email.current.value,
      age: this.age.current.value,
      sex: this.sex.current.value,
    };
    axios
      .post("http://localhost:8080/api/v1.0/tweets/register", body, {
        data: {},
        headers: { "Content-Type": "application/json" },
        responseType: "text",
      })
      .then((res) => {
        console.log(res.data);
        this.setState({success:"registration completed!"});
        this.setState({error:""});
      })
      .catch((err) => {
        this.setState({
          error:
            "email already exist in the database. Try with different email!..",
        });
      });
    this.username.current.value = "";
    this.password.current.value = "";
    this.email.current.value = "";
    this.age.current.value = "";
    this.sex.current.value = "";
    event.preventDefault();
  };
  render() {
    return (
      <div className="container">
        <h2>Sign Up!</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>UserName</label>
              </div>
              <div className="col-sm">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your name!"
                  ref={this.username}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>Password</label>
              </div>
              <div className="col-sm">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter the password!"
                  ref={this.password}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>Email</label>
              </div>
              <div className="col-sm">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email!"
                  ref={this.email}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>Age</label>
              </div>
              <div className="col-sm">
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  min="1"
                  max="100"
                  ref={this.age}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>Sex</label>
              </div>
              <div className="col-sm">
                <select className="form-control" ref={this.sex}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
          <div className="col-sm-3">
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn  btn-success">
                Submit
              </button>
            </div>
          </div>
          <b>{this.state.error}</b>
          <b>{this.state.success}</b>
        </form>
      </div>
    );
  }
}

export default SignUp;
