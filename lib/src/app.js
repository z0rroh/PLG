/*
* app first node
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Components/Semana.js';

const semana = {
  title: "MAY 10 - 15 / 2016",
  user: "Tokens: 4"
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

ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
