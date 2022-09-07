import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
  }

  onEmailHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onPassHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onSubmitHandler = (event) => {
    let body = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(body);

    axios
      .post("http://localhost:8080/api/v1.0/tweets/login", body)
      .then((res) => {
        console.log(res.data);
        window.sessionStorage.setItem("username", res.data.username);
        window.sessionStorage.setItem("email", res.data.email);

        this.setState({ redirect: true });
      })
      .catch((err) => {
        this.setState({ error: "Please Check your credentials!" });
      });

    event.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/Home" />;
    }
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <label>Email</label>
              </div>
              <div className="col-sm">
                <input
                  type="email"
                  className="form-control"
                  id="email1"
                  placeholder="Enter your email!"
                  required
                  onChange={this.onEmailHandler}
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
                  id="exampleInputPassword1"
                  placeholder="Enter the password!"
                  required
                  onChange={this.onPassHandler}
                />
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-sm-3">
              <button type="submit" className="btn  btn-success">
                Submit
              </button>
            </div>
            <div className="col-sm-4">
            <Link to="/forgot" className="btn btn-primary">Forget Password</Link>
            </div>
          </div>
          <b>{this.state.error}</b>
        </form>
      </div>
    );
  }
}

export default Login;
