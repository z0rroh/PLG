import React, {Component} from 'react';


class PerfilApp extends Component{

  constructor(){
    super();
    this.state = {
      name: "Carlos Riquelme",
      email: "caarlos@live.cl",
      phone: "949292944",
      dir: "Psj. Papa San Eleuterio 529B",
      grupo: "Tottus",
      tokens: "10"
    }
  }
  onSubmit(e){
    console.log("hola");
  }
  render(){
    return(
      <div className="Perfil-Container row center-lg">
        <div className="User-Edit col-lg-8">
            <div className="User-Edit-img">
              <img src={"/images/avatars/default_user.png"}/>
              <div className="upload-icon">
                <a ><i className="material-icons">add_a_photo</i></a>
              </div>
            </div>
        </div>
        <div className="User-Edit-Tittle col-lg-8"><h1>Informacion de usuario</h1></div>
        <div className="User-Info col-lg-8">
            <form className="">
              <div className="User-element col-lg-6">
                <strong>Nombre:</strong>
                <span>{this.state.name}</span>
              </div>
              <div className="User-element col-lg-6">
                <strong>Email:</strong>
                <span>{this.state.email}</span>
              </div>
              <div className="User-element col-lg-6">
                <strong>Telefono:</strong>
                <span>{this.state.phone}</span>
              </div>
              <div className="User-element col-lg-6">
                <strong>Direccion:</strong>
                <span>{this.state.dir}</span>
              </div>
              <div className="User-element col-lg-6">
                <strong>Tokens:</strong>
                <span>{this.state.tokens}</span>
              </div>
              <div className="User-element col-lg-6">
                <strong>Grupo:</strong>
                <span>{this.state.grupo}</span>
              </div>
            </form>
          </div>

      </div>
    )
  }
}
export default PerfilApp;
