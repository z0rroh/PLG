import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserInfo from './UserInfo';
import UserTurnos from './UserTurnos'



class Perfil extends Component{

  constructor(){
    super();
    this.state ={
      user: {},
      turnos: []
    };
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
        <div className="User-Edit col-lg-8">
            <div className="User-Edit-img">
              <img src={"/images/avatars/"+this.state.user.id+"/"+this.state.user.user_image}/>
              <div className="upload-icon">
                <a href="archivo/index"><i className="material-icons">add_a_photo</i></a>
              </div>
            </div>
        </div>
        <div className="User-Edit-Tittle col-lg-8"><h1>PERFIL DE USUARIO</h1></div>
        <div className="User-Info col-lg-8">
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
