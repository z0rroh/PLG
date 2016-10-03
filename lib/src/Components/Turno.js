/*
* app Turno
*/

import React, { Component } from 'react';
import TurnoInfo from './TurnoInfo.js';
import TurnoRango from './TurnoRango.js';

export default class Turno extends Component{
  constructor(props){
    super(props);
    this.state = {data:props.data};
  }
  handleRemove(ev){
     var data = {id:this.props.data.id};
      io.socket.post('/turnolog/entrar/',data,(resData, jwres) => {
        this.setState({
          data: resData
        })
      });
  }
  render(){
    let porcentaje = (parseInt(this.state.data.cupoActual) * 100)/parseInt(this.state.data.cupoTotal);
    porcentaje = porcentaje+"%";
    let datermianteStyle = { width: porcentaje};
    return(
      <section className="Turno col-xs-4 card">
        <div className="Turno-Content">
          <div className="row start-lg">
            <TurnoInfo data={this.state.data} />
            <TurnoRango data={this.state.data} />
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
