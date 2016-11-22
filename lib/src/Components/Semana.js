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
        console.log(turnos);
        this.setState({turnos: turnos});
      }.bind(this));
  }
  handlePostTurno(id){
    console.log(id);
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
