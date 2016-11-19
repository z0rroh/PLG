/*
* app Semana
*/

import React, { Component } from 'react';
import Dia from './Dia'

export default class Semana extends Component{
  constructor(){
    super();
  }
  render(){
    const Dias = this.props.dias.map((day) => {
      return <Dia key={day.id} name={day.name} data={day.data}/>
    });
    return(
      <div className="Semana col-lg-10">
        <div className="SemanaTitle">
          <div className="row">
            <div className="col-xs-6"><p> {this.props.semana.title}</p></div>
            <div className="col-xs-6"><p> {this.props.semana.user}</p></div>
          </div>
        </div>
        <div className="SemanaContent">
          { Dias }
        </div>
      </div>
    )
  }
}
