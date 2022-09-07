import React, { Component } from 'react';
import axios from 'axios';
import Nav from "./Nav";
import { Navigate } from "react-router-dom";
class Search extends Component{
    constructor(){
        super();
        this.username=React.createRef();
        this.dataArray=[];
        this.state={
            userTweets:[],
            replies: [],
            name: window.sessionStorage.getItem("username"),
            email: window.sessionStorage.getItem("email"),
            disabled: true,
            show: false,
            reply: false,
            refresh:false,
            null:""
        }
    }


    getTweetsByUser = (event) => {
        axios
          .get(`http://localhost:8080/api/v1.0/tweets/${this.username.current.value}`)
          .then((res) => {
            this.dataArray=res.data;
            if(this.dataArray.length===0){
                this.setState({null:"No Users found!",userTweets:[]});
            }
            else if(this.dataArray.length>0){
                this.setState({userTweets:res.data,null:""})
            }
           
              })
          .catch((err) => {
            console.log(err.data);
          });
          event.preventDefault();
      };
      disableReply = () => {
        this.setState({ reply: false });
      };
    

    render(){
        if(this.state.email===null)
        {
          alert("please signin to access the app");
          return <Navigate to="/" />; 
        }
        return(
           <div>
               <Nav/>
               <form onSubmit={this.getTweetsByUser}>
                   <div className='row'>
                   <div className='col-3'>
                     Email <input type="email" required placeholder='Enter the user email' ref={this.username}/> <button className='btn btn-sm btn-primary'>Search</button>
                   </div>

                   </div>
                   
               </form>
               <b>{this.state.null}</b>
               <ul>
        {this.state.userTweets.map((data) => (
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
            </div>
          ))}
        </ul>
           </div>
        )
    }
}

export default Search;