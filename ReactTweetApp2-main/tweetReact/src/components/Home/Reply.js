import React, { Component } from "react";
import axios from "axios";

class Reply extends Component {
  constructor(props) {
    super(props);
    this.replyTweet = React.createRef();
    this.state = {
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email"),
    };
  }

  replyHandler = (event) => {
    let content = this.replyTweet.current.value;
    console.log(content);

    let body = {
      username: this.state.name,
      email: this.state.email,
      reply: content,
    };
    axios
      .post(
        `http://localhost:8080/api/v1.0/tweets/${this.props.email}/reply/${this.props.id}`,
        body
      )
      .then((res) => {
        this.replyTweet.current.value = "";
        this.props.state();
      })
      .catch((err) => {
        console.log("error" + err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.replyHandler}>
          <div className="row">
            <div className="col-sm-2">
              <textarea
                required
                placeholder="Enter the Reply"
                id="tweet"
                name="tweet"
                ref={this.replyTweet}
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

export default Reply;
