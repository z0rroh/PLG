/*
* app Turno
*/

import React, { Component } from 'react';
import TurnoInfo from './TurnoInfo.js';

export default class TurnoButton extends Component{
  constructor(){
    super();

  }
  render(){
    console.log(this.props.func);
    return(
      <div className="Turno-Button col-lg-4">
        <a onClick={this.props.func} className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </a>
      </div>
    )
  }
}
