import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Semana.js';

const semana = {
  title: "MAY 10 - 15 / 2016",
  user: ""
}

class TurnoApp extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <Semana semana={semana} />
    )
  }
}


export default TurnoApp
