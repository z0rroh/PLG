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
    this.state = {turnos:[]};
    io.socket.on('turnolog', function serverSentEvent(turno) {
        console.log(turno);
    }.bind(this));
  }

  componentWillMount(){
      io.socket.get('/turnolog/entrar', function(turnos) {
        //console.log(turnos);
        this.setState({turnos: turnos});
      }.bind(this));


  }
  render(){
    return(
      <Semana semana={semana} dias={this.state.turnos} />
    )
  }
}

ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
