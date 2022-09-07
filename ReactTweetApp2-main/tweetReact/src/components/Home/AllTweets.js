import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import Tweet from "./Tweet";
import Edit from "./Edit";
import Like from "./Like";
import DisLike from "./DisLike";
import { FaReply } from "react-icons/fa";
import Reply from "./Reply";
import { Navigate } from "react-router-dom";
class AllTweet extends Component {
  constructor() {
    super();
    
    this.dataArray=[];
    this.state = {
      dataArray: [],
      replies: [],
      tweet: "",
      name: window.sessionStorage.getItem("username"),
      email: window.sessionStorage.getItem("email"),
      disabled: true,
      show: false,
      reply: false
    };
  }
  componentDidMount() { this.getTweets()}
  componentDidUpdate() {this.getTweets()}

  disableReply = () => {
    this.setState({ reply: false });
  };

  disableEdit = () => {
    this.setState({ show: false });
  };
  getTweets = () => {
    axios
      .get(`http://localhost:8080/api/v1.0/tweets/all`)
      .then((res) => {
        this.dataArray=res.data;
        this.setState({dataArray:res.data})
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
        <Nav/>
        <Tweet />
        <h1>All Tweets!</h1>
        <ul>
        {this.state.dataArray.map((data) => (
            <div key={data.id} className="card" id="myTweets">
              <div className="row">
              <div className="col-sm">
                  <span title={data.email}><b>UserName:</b>{data.username}</span>
                </div>
                </div>
                <div className="row">
                <div className="col-sm">
                  <b>{data.tweets}</b>
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
                  email={data.email}
                  state={this.disableReply}
                />
              ) : null}
              {data.replies.map((data1, index) => (
                <div key={index} className="card" id="reply">
                  <div className="row">
                    <div className="col-sm-4">
                      <b >UserName:</b>
                      <span title={data1.email}>{data1.username}</span>
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
                    onClick={() => this.setState({ show: false, reply: true })}
                  >
                    <FaReply />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllTweet;
