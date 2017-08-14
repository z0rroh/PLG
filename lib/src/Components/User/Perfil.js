import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserInfo from './UserInfo';
import UserTurnos from './UserTurnos'
import UserAvatar from './UserAvatar'

class Perfil extends Component{

  constructor(){
    super();
    this.state ={
      user: {},
      turnos: [],
      uploadedFiles: ""
    };
  }
  handleSubmit(e){
    e.preventDefault();
    var avatar = new FormData();
    var file = this.state.uploadedFiles;
    console.log(file);
  }
  componentWillMount(){
    io.socket.get('/user/getUser',function(user) {
      this.setState({user: user, turnos: user.turnos})
    }.bind(this));

    io.socket.on('user', function serverSentEvent(user) {
      console.log("paso algo en users");
    }.bind(this));

  }

  render(){

    return(
      <div className="Perfil-Container row center-lg">
        <div className="User-Edit col-lg-8 col-xs-12">
          <UserAvatar user={this.state.user}/>
        </div>
        <div className="User-Edit-Tittle col-lg-8 col-xs-12"><h1>PERFIL DE USUARIO</h1></div>
      <div className="User-Info col-lg-8 col-xs-12">
            <UserInfo
              user={this.state.user}/>
            <UserTurnos
              turnos={this.state.turnos}/>
        </div>
    </div>
    )
  }
}
export default Perfil;
