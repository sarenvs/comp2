import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
class Forgot extends Component {
  constructor() {
    super();
    this.email = React.createRef();
    this.password1 = React.createRef();
    this.password2 = React.createRef();
    this.state = {
      username: "",
      email: "",
      age: "",
      sex: "",
      password: "",
      confirm: "",
      error: "",
      enable: false,
    };
  }

  getUserDetails = (event) => {
    axios
      .get(
        `http://localhost:8080/api/v1.0/tweets/${this.email.current.value}/forgot`
      )
      .then((res) => {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          age: res.data.age,
          sex: res.data.sex,
          enable: true,
          redirect: false,
          error:""
        });
        this.email = "";
        console.log(res.data.username);
      })

      .catch((err) => {
        console.log(err.data);
        this.setState({ error: "Please check the email" });
      });
    event.preventDefault();
  };

  updatePassword = (event) => {
      console.log(this.password1.current.value);
    if (this.password1.current.value === this.password2.current.value) {
      this.setState({ error: "" });
      let body = {
        username: this.state.username,
        email: this.state.email,
        password: this.password1.current.value,
        age: this.state.age,
        sex: this.state.sex,
      };
      console.log(body);
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put("http://localhost:8080/api/v1.0/tweets/updateUser", body, config)
        .then((res) => {
          console.log(res.data);

          this.setState({ redirect: true });
        })
        .catch((err) => {
          this.setState({ error: "something went wrong" });
        });
    } else {
      this.setState({ error: "Passwords did not match" });
      this.password1.current.value = "";
      this.password2.current.value = "";
    }

    event.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      alert("password resetted successfully!");
      return <Navigate to="/" />;
    }
    return (
      <div className="container">
        {!this.state.enable ? (
          <form onSubmit={this.getUserDetails}>
            <div className="row">
              <div className="col-sm-3">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="Enter your email"
                  ref={this.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <button className="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        ) : null}
        {this.state.enable ? (
          <form onSubmit={this.updatePassword}>
            <div className="row">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter the password"
                  ref={this.password1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Re-Enter the password"
                  ref={this.password2}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        ) : null}
        {this.state.error}
      </div>
    );
  }
}
export default Forgot;
