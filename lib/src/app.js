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

const dias = [
    {
      name:'Lunes',
      data:[
        {
          name: "turno 1",
          horario: "15:00 - 17:00",
          cupoActual: "5",
          cupoTotal: "10",
          porcentaje: "50%"
        }
      ],
    },
    {
      name:'Martes',
      data:[
        {
          name: "turno 2",
          horario: "15:00 - 17:00",
          cupoActual: "8",
          cupoTotal: "11",
          porcentaje: "90%"
        },
        {
          name: "turno 3",
          horario: "13:00 - 15:00",
          cupoActual: "3",
          cupoTotal: "10",
          porcentaje: "10%"
        }
      ],
    },
    {
      name: 'Miercoles',
      data: [],
    }
];

class TurnoApp extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <Semana semana={semana} dias={dias} />
    )
  }
}


window.onload = () =>{
  ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
}
