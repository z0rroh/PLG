/*
* app first node
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Components/Semana.js'

const semana = {
  title: "MAY 10 - 15 / 2016",
  user: "Tokens: 4"
}

class TurnoApp extends Component{
  constructor(){
    super();
    this.state = {turnos:[]};
  }
  componentDidMount(){
    io.socket.on('connect', function() {
      io.socket.get('/turnolog/entrar', function(turnos) {
        this.setState({turnos: turnos});
      }.bind(this));

    }.bind(this));
  }
  render(){
    return(
      <Semana semana={semana} dias={this.state.turnos} />
    )
  }
}

ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
