import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnunciosForm from './AnunciosForm';
import AnunciosList from './AnunciosList';


class Anuncios extends Component{
  constructor(){
    super()
      this.state = {
        anuncios: [],
      };
  }

  componentWillMount(){
    io.socket.get('/anuncios/getAnuncios', function(anuncios) {
      this.setState({anuncios:anuncios})
    }.bind(this));

    io.socket.on('anuncio', function serverSentEvent(anuncio) {
      let newAnuncio = {autor: anuncio.data.autor, id: anuncio.data.id, text: anuncio.data.text, fecha: anuncio.data.fecha, comment: anuncio.data.comment}
      let newState = this.state.anuncios;
      newState.splice(0,0,newAnuncio)
      this.setState({anuncios: newState})
    }.bind(this));

  }

  onSubmit(data){

  }


  render(){
    return (
        <section className="Layout-Content row center-lg">
          <AnunciosForm
            onSubmit={(e) => this.onSubmit(e)}/>

          <AnunciosList
            anuncios={this.state.anuncios }/>
        </section>
    )}
}

export default Anuncios;
