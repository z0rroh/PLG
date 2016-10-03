/*
* app Semana
*/

import React, { Component } from 'react';
import SemanaTitle from './SemanaTitle.js'
import SemanaDias from './SemanaDias.js'

export default class Semana extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="Semana col-lg-10">
        <SemanaTitle title='' user=''/>
        <SemanaDias dias={this.props.dias} />
      </div>
    )
  }
}
