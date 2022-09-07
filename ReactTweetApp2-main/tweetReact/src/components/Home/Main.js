import React, { Component } from "react";
import "./Main.css";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import Reply from "./Reply";
import Edit from "./Edit";
import Like from "./Like";
import DisLike from "./DisLike";
import Delete from "./Delete";
import { Navigate } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.tweetDesc = React.createRef();
    this.edit = React.createRef();
    this.replyTweet = React.createRef();
    this.state = {
      dataArray: [],
      replies: [],
      tweet: "",
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email"),
      disabled: true,
      show: false,
      reply: false,
    };
  }

  componentDidMount() {
    this.getMyTweets();
  }

  componentDidUpdate() {
    this.getMyTweets();
  }
  getMyTweets = () => {
    axios
      .get(`http://localhost:8080/api/v1.0/tweets/${this.state.email}`)
      .then((res) => {
        this.setState({ dataArray: res.data });
      })
      .catch((err) => {
        console.log("error:" + err);
      });
  };

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

  disableReply = () => {
    this.setState({ reply: false });
  };

  disableEdit = () => {
    this.setState({ show: false });
  };

  render() {
    if(this.state.email===null)
    {
      alert("please signin to access the app");
      return <Navigate to="/" />; 
    }
    return (
      <div>
        <div>
          <h1>My Tweets!</h1>
          {this.state.dataArray.map((data) => (
            <div key={data.id} className="card" id="myTweets">
              <div className="row">
                <div className="col-sm">
                  <h4>{data.tweets}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <small>Date:{data.date}</small>
                </div>
              </div>
              <br />
              {this.state.show ? (
                <Edit id={data.id} state={this.disableEdit} />
              ) : null}
              {this.state.reply? (
                <Reply
                  id={data.id}
                  email={this.state.email}
                  state={this.disableReply}
                />
              ) : null}
              {data.replies.map((data1, index) => (
                <div key={index} className="card" id="reply">
                  <div className="row">
                    <div className="col-sm-4">
                      <b>UserName:</b>
                      <span>{data1.username}</span>
                    </div>
                    <div className="col-sm">
                      <b>Reply:</b>
                      <span>{data1.reply}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <small>{data1.date}</small>
                    </div>
                  </div>
                </div>
              ))}

              <div className="row">
                <div className="col-sm-1">
                  <Like id={data.id} like={data.like} email={data.email} />
                </div>
                <div className="col-sm-1">
                  <DisLike
                    id={data.id}
                    email={data.email}
                    dislike={data.dislike}
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-success"
                    onClick={() => this.setState({ show: true, reply: false })}
                  >
                    <BiEdit />
                  </button>
                </div>
                <div className="col-sm-1">
                  <Delete id={data.id} email={data.email} />
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-success"
                    onClick={() => this.setState({ show: false, reply: true })}
                  >
                    <FaReply />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Main;
