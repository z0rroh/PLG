/*
* app Turno
*/

import React, { Component } from 'react';
import TurnoInfo from './TurnoInfo.js';

export default class Turno extends Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="Turno-Log col-lg-4">
        <h4> {this.props.data.cupoActual}/{this.props.data.cupoTotal}</h4>
      </div>
    )
  }
}
