/*
* app Semana Dias
*/

import React, { Component } from 'react';
import Dia from './Dia.js';

export default class SemanaDias extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="SemanaContent">
        {
          this.props.dias.map((day) => {
            return <Dia name={day.name} data={day.data}/>
          })
        }
      </div>
    )
  }
}
