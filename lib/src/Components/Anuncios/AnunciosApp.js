import React, { Component } from 'react';
import Anuncios from './Anuncios.js'



class AnunciosApp extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
    io.socket.get('/anuncios/subscribe', ()=> {
      console.log("subscrito");
    })
  }

  render() {
    return (
      <Anuncios />
    );
  }
}

export default AnunciosApp;
