/*
* app Semana
*/

import React, { Component } from 'react';
import Dia from './Dia'

export default class Semana extends Component{
  constructor(props){
    super(props);
    this.state = {
      turnos:[],
      tokens: 0
    };
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }
  componentWillMount(){
      io.socket.get('/turnolog/entrar', function(turnos) {
        //console.log(turnos);
        this.setState({turnos: turnos});
      }.bind(this));
      io.socket.get('/turnolog/tokens', function(tokens) {
        console.log(tokens);
        this.setState(tokens);
      }.bind(this));
      io.socket.on('turnolog', function serverSentEvent(updateTurno) {
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
      console.log(tokens);
    });
  }

  render(){

    const Dias = this.state.turnos.map((day) => {
      return <Dia key={day.id} name={day.name} data={day.data} onPostTurno={this.handlePostTurno}/>
    });
    return(
      <div className="Semana col-lg-12">
        <div className="SemanaTitle">
          <div className="row">
            <div className="col-xs-6"><p> {this.props.semana.title}</p></div>
            <div className="col-xs-6"><p>  Tokens: {this.state.tokens}</p></div>
          </div>
        </div>
        <div className="SemanaContent row center-xs">
          { Dias }
        </div>
      </div>
    )
  }
}
