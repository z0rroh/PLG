import React, { Component } from 'react'

import ComentarioForm from './ComentarioForm'
import ComentarioItem from './ComentarioItem'

class AnuncioItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      anuncio : this.props.anuncio
    }
  }
  onSubmit(data){
    let ComentarioNuevo = {name:'juan',time:'9:00',text:data}
    let newState = this.state.anuncio;
    newState.comment.push(ComentarioNuevo)
    this.setState({anuncio: newState})
  }
  render(){
    const anuncio = this.state.anuncio;
    console.log(anuncio);
    /*
    const CommentsRender = anuncio.comment.map(comment =>{
      console.log(comment);
      return(

        <ComentarioItem key={comment.id} comentario={comment} />
      )
    })*/
    return(
      <section className="col-lg-8 card">
        <div className="Anuncio" id={anuncio.id}>
          <div className="row start-lg">
            <div className="Anuncio-Image col-lg-1"><img src={"/images/avatars/default_user.png"}/></div>
            <div className="Anuncio-Info col-lg-10">
              <div className="box">
                <div className="row start-lg">
                  <div className="col-lg-12">
                    <h5 className="Anuncio-User">{anuncio.autor}</h5>
                  </div>
                  <div className="col-lg-12">
                    <h6 className="Anuncio-Time">{anuncio.fecha}</h6>
                  </div>
                  <div className="col-lg-12">
                    <p className="Anuncio-Text">{anuncio.text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider col-lg-12"></div>
            <ComentarioForm
                onSubmit={(e) => this.onSubmit(e)}/>
              
          </div>
        </div>
      </section>
    )


  }
}

export default AnuncioItem;
