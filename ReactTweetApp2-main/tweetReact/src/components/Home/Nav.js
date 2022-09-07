import React,{Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
class Nav extends Component{

    constructor(props) {
        super(props);
        this.state = {
          name: window.sessionStorage.getItem("username"),
          email: window.sessionStorage.getItem("email"),
        };
      }

      updateLogStatus=(event)=>{
    
        axios
          .post(`http://localhost:8080/api/v1.0/tweets/logout?email=${this.state.email}`)
          .then((res) => {
            console.log(res.data);
            window.sessionStorage.clear();
          })
          .catch((err) => {
            console.log("error "+err);
          });
    

      }
    render(){
        return(
            <div className="card">
            <ul id="ul">
              <li id="nav">
                <Link to="#" >Logged in as {this.state.name}</Link>
              </li>
              <li id="nav">
                <Link to="/Home">MyTweets</Link>
              </li>
              <li id="nav">
                <Link to="/All">All Tweets</Link>
              </li>
              <li id="nav">
                <Link to="/AllUsers">User Details</Link>
              </li>
              <li id="nav">
                <Link to="/search">Search</Link>
              </li>
              <li id="nav">
                <Link to="/" onClick={this.updateLogStatus}>Logout</Link>
              </li>

            </ul>
          </div>
        )
    }

}
export default  Nav;