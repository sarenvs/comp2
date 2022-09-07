import React,{Component} from 'react';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
class Delete extends Component{

    constructor(props){
        super(props);
    }
    deleteHandler = (event) => {
        axios
          .delete(
            `http://localhost:8080/api/v1.0/tweets/${this.props.email}/delete/${this.props.id}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log("error" + err);
          });
          event.preventDefault();
      };

    render(){
        return(
         <div>
             <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (
                        window.confirm("Are you sure you want to delete this?")
                      ) {
                        this.deleteHandler(this.props.id);
                      }
                    }}
                  >
                    <AiFillDelete />
                  </button>
         </div>
        )
    }
}

export default Delete;