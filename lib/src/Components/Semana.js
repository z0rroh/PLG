/*
* app Semana
*/

import React, { Component } from 'react';
import Dia from './Dia'

export default class Semana extends Component{
  constructor(){
    super();
    this.state = {turnos:[]};
  }
  componentWillMount(){
      io.socket.get('/turnolog/entrar', function(turnos) {
        //console.log(turnos);
        this.setState({turnos: turnos});
      }.bind(this));
      io.socket.on('turnolog', function serverSentEvent(updateTurno) {
        const prevState = {};
        let nextState = {};
        Object.assign(prevState,this.state);
        Object.assign(nextState,prevState);
        for(let i = 0;i<prevState.turnos[updateTurno.data.day].data.length;i++){
          if(prevState.turnos[updateTurno.data.day].data[i].id === updateTurno.id){
            nextState.turnos[updateTurno.data.day].data[i] = updateTurno.data;
          }
        }
        console.log(nextState);
        this.setState(nextState);
      }.bind(this));
  }
  handlePostTurno(id){
    var data = {id:id};
    io.socket.post('/turnolog/entrar/',data,(resData, jwres) => {
      console.log('data enviada');
   });
  }
  render(){
    const Dias = this.state.turnos.map((day) => {
      return <Dia key={day.id} name={day.name} data={day.data} onPostTurno={this.handlePostTurno}/>
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
