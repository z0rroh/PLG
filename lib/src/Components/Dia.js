/*
* app Dia
*/

import React, { Component } from 'react';
import Turno from './Turno.js'

export default class Dia extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="Dia">
        <div className="row start-xs">
          <div className="Dia-Title col-xs-12">
              <p>{this.props.name}</p>
              <div className="divider"></div>
          </div>
          <div className="Dia-Content col-xs-12">
            <div className="Turnos">
              <div className="row center-xs">
                {
                  this.props.data.map((turno) => {
                    return <Turno data={turno}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}