import React, { Component } from "react";
import axios from "axios";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.edit = React.createRef();
    this.state = {
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email"),
      disabled: true,
      show: false,
    };
  }

  editHandler = (event) => {
    let content = this.edit.current.value;
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(content);
    axios
      .put(
        `http://localhost:8080/api/v1.0/tweets/${this.state.email}/update/${this.props.id}`,
        content,
        config
      )
      .then((res) => {
        this.edit.current.value = "";
        this.props.state();
      })
      .catch((err) => {
        console.log("error" + err.data);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.editHandler}>
          <div className="row">
            <div className="col-sm-2">
              <textarea
                required
                placeholder="Enter the tweet"
                id="tweet"
                name="tweet"
                ref={this.edit}
              />
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
