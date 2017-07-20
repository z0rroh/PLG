import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class UserInfo extends Component{

    constructor(props){
      super(props);
    }

    render(){
      return(
        <div className="User-Info-Datos col-lg-6">
            <div className="Tittle-Element col-lg">
              <h4>Detalles Cuenta</h4>
            </div>
            <div className="User-element col-lg">
              <strong>Nombre:</strong>
              <span>{this.props.user.name}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Grupo:</strong>
              <span>{this.props.user.group}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Email:</strong>
              <span>{this.props.user.email}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Telefono:</strong>
              <span>{this.props.user.phone}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Direccion:</strong>
              <span>{this.props.user.adress}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Tokens:</strong>
              <span>{this.props.user.tokens}</span>
            </div>
            <div className="User-element col-lg">
              <strong>Tipo usuario:</strong>
              <span>{this.props.user.admin}</span>
            </div>
        </div>
      )
    }

}

export default UserInfo;
