/*
* app Semana
*/

import React, { Component } from 'react';
import Dia from './Dia'
import moment from "moment"

export default class Semana extends Component{
  constructor(props){
    super(props);
    this.state = {
      turnos:[],
      tokens: null,
      fecha: [],
      hora: new Date()
    };
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }

  getDate(){
    var fecha = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var hoy = new Intl.DateTimeFormat('es-Ch',options).format(fecha);
    this.setState({fecha: hoy})
  }
  componentDidMount(){
    this.getDate();
    io.socket.get('/turnolog/tokens', function(tokens) {
      this.setState(tokens);
      console.log(tokens);
    }.bind(this));
  }
  componentWillMount(){
      io.socket.get('/turnolog/entrar', function(turnos) {
        //console.log(turnos);
        this.setState({turnos: turnos});
      }.bind(this));

      io.socket.on('turnolog', function serverSentEvent(updateTurno) {
        console.log(updateTurno);
        let prevState = [];
        let nextState = [];
        prevState = this.state.turnos;
        nextState = this.state.turnos;
        console.log(updateTurno);
        for(let i = 0;i<prevState[updateTurno.data.day].data.length;i++){
          if(prevState[updateTurno.data.day].data[i].id === updateTurno.id){
            console.log(nextState[updateTurno.data.day].data[i]);
            Object.assign(nextState[updateTurno.data.day].data[i], updateTurno.data);
          }
        }
        this.setState({turnos: nextState});
      }.bind(this));
  }
  handlePostTurno(id){
    var data = {id:id};
    io.socket.post('/turnolog/entrar/',data,(resData) => {
      this.setState({tokens: resData.tk});
      console.log(this.state.tokens);
    });
  }

  render(){
    const Dias = this.state.turnos.map((day) => {
      return <Dia key={day.id} name={day.name} data={day.data} onPostTurno={this.handlePostTurno}/>
    });
    return(
      <div className="Semana col-lg-12">
        <div className="SemanaTitle">
          <div className="row between-lg">
            <div className="col-lg-4 col-xs-12"><p> Fecha: {this.state.fecha}</p></div>
            <div className="col-lg-4 col-xs-12"><p> Hora: </p></div>
            <div className="Tokens col-lg-4 col-xs-12"><p>  Tokens: {this.state.tokens}</p></div>

          </div>
        </div>
        <div className="MesName"><span>Agosto</span></div>
        <div className="SemanaContent row center-xs">
          { Dias }
        </div>
      </div>
    )
  }
}
