/*
* app Turno
*/

import React, { Component } from 'react';

export default class TurnoInfo extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="Turno-Info col-lg-4">
        <h5>{this.props.data.name}</h5>
        <p>{this.props.data.start} - {this.props.data.end}</p>
      </div>
    )
  }
}
