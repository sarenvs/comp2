import React, { Component } from 'react';

import axios from 'axios';

class Tweet extends Component {

    constructor(){
      super();
      this.tweetDesc = React.createRef();
      this.state = {
        name: window.sessionStorage.getItem("username"),
        email: window.sessionStorage.getItem("email"),
      };
    }

    onSubmitHandler = (event) => {
        let body = this.tweetDesc.current.value;
        console.log(body);
        axios
          .post(
            `http://localhost:8080/api/v1.0/tweets/${this.state.email}/add`,
            body
          )
          .then((res) => {
            this.tweetDesc.current.value = "";
          })
          .catch((err) => {
            console.log("error" + err);
          });
        event.preventDefault();
      };

    render(){
        return(
           
            <div>
                <form className="border" onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <div className="row">
              <h3>Post a New Tweet here!</h3>
            </div>
            <div className="row" id="tweetRow">
              <div className="col-sm-1">
                <label>Tweet</label>
              </div>
              <div className="col-sm-4">
                <textarea
                  required
                  placeholder="Enter the tweet"
                  id="tweet"
                  name="tweet"
                  ref={this.tweetDesc}
                />
              </div>
              <div className="col-sm">
                <button className="btn btn-lg btn-primary">post</button>
              </div>
            </div>
          </div>
        </form>
            </div>

        )
    }
}

export default Tweet;