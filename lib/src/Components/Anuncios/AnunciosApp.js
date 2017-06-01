import React, { Component } from 'react';
import Anuncios from './Anuncios.js'



class AnunciosApp extends Component {
  constructor(){
    super();
    this.state = {
      userName: "",
      userGroup: ""
    }
  }

  componentDidMount(){
    io.socket.get('/anuncios/subscribe', (userInfo)=> {
      this.setState({
        userName: userInfo.name,
        userGroup: userInfo.group
      })
    })
  }

  render() {
    return (
      <Anuncios />
    );
  }
}

export default AnunciosApp;
