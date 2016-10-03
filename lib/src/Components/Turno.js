/*
* app Turno
*/

import React, { Component } from 'react';

export default class Turno extends Component{
  constructor(){
    super();
  }
  handleRemove(ev){
     var data = {id:this.props.data.id};
     io.socket.post('/turnolog/entrar/',data,function(resData,jwres){
       console.log(resData);
     });
  }
  render(){
    let datermianteStyle = { width: this.props.data.porcentaje};
    return(
      <section className="Turno col-xs-3 card">
        <div className="Turno-Content">
          <div className="row start-lg">
            <div className="Turno-Info col-lg-4">
              <h5>{this.props.data.name}</h5>
              <p>{this.props.data.horario}</p>
            </div>
            <div className="Turno-Log col-lg-4">
              <h4> {this.props.data.cupoActual}/{this.props.data.cupoTotal}</h4>
            </div>
            <div className="Turno-Button col-lg-4">
              <a onClick={this.handleRemove.bind(this)} className="btn-floating btn-large">
                <i className="material-icons">add</i>
              </a>
            </div>
          </div>
        </div>
        <div className="Turno-progress progress">
          <div className="determinate" style={datermianteStyle}></div>
        </div>
      </section>
    )
  }
}
