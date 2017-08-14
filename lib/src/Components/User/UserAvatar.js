import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Intent, Popover, PopoverInteractionKind, Position} from "@blueprintjs/core";

class UserAvatar extends Component{
    constructor(props){
      super(props);
      this.state = {
        avatarName: "Seleccionar foto de perfil..."
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
      e.preventDefault();
      var avatar = new FormData();
      this.setState({avatarName: "Seleccionar foto de perfil..."})
    }
    handleChange(e){
      console.log(e.target.files[0]);
      this.setState({avatarName: e.target.files[0].name})
    }
    render(){

      return(
        <div className="User-Edit-img">
          <img src={"/images/avatars/"+this.props.user.id+"/"+this.props.user.user_image}/>
          <div className="upload-icon">
            <a href="archivo/index"><i className="material-icons">add_a_photo</i></a>
          </div>
          <Popover
             interactionKind={PopoverInteractionKind.CLICK}
             popoverClassName="pt-popover-content-sizing"
             position={Position.RIGHT}>
              <button><i className="material-icons">add_a_photo</i></button>
              <div className="Popover-Avatar">
                  <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <label className="pt-file-upload">
                      <input
                        onChange={(e)=> this.handleChange(e)}
                        className="upload-file"
                        type="file"
                        name={"avatar"}
                        accept=".png, .jpg, .jpeg"/>
                      <span className="pt-file-upload-input">{this.state.avatarName}</span>
                    </label>
                    <input
                      type="submit"
                      className="pt-button submit-file" />
                  </form>
              </div>
          </Popover>
        </div>
      )
    }
}

export default UserAvatar;
