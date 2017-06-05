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
      console.log("suscrito a anuncios");
    })

    io.socket.get('/comentario/subscribe', ()=> {
        console.log("suscrito a comentarios");
    })
  }

  render() {
    return (
      <Anuncios />
    );
  }
}

export default AnunciosApp;
