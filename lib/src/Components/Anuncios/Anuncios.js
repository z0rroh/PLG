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
  }



  onSubmit(data){
    let AnuncioNuevo = {id:'1',name: 'carlos', time:'das', text:data,comment:[]};
    let newState = this.state.anuncios;
    newState.splice(0,0,AnuncioNuevo)
    this.setState({anuncios: newState})
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
