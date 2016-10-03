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

/*
const dias = [
    {
      id:'1',
      name:'Lunes',
      data:[
        {
          id: '123',
          name: "turno 1",
          horario: "15:00 - 17:00",
          cupoActual: "5",
          cupoTotal: "10",
          porcentaje: "50%"
        }
      ],
    },
    {
      id:'2',
      name:'Martes',
      data:[
        {
          id: '124',
          name: "turno 2",
          horario: "15:00 - 17:00",
          cupoActual: "8",
          cupoTotal: "11",
          porcentaje: "90%"
        },
        {
          id: '125',
          name: "turno 3",
          horario: "13:00 - 15:00",
          cupoActual: "3",
          cupoTotal: "10",
          porcentaje: "10%"
        }
      ],
    },
    {
      id:'3',
      name: 'Miercoles',
      data: [],
    }
]; */

class TurnoApp extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    io.socket.on('Turnolog', function(event){console.log(event)});
    io.socket.get('/turnolog/entrar',function(resData, jwres){
      this.setState({turnos:turnos})
    });
  }
  render(){
    return(
      <Semana semana={semana} dias={this.setState.turnos} />
    )
  }
}


window.onload = () =>{
  ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
}
