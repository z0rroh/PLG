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
  componentWillMount(){
    io.socket.on('comentario', function serverSentEvent(comentario) {
      var autor = {
        name: comentario.data.autor.name,
        id: comentario.data.autor.id,
        user_img: comentario.data.autor.user_img
      }
      let newComment= {autor: autor, id: comentario.data.id, text: comentario.data.text, fecha: comentario.data.fecha}
      let newState = this.state.anuncio;
      if (newState.id === comentario.data.anuncio){
        newState.comment.push(newComment)
        this.setState({anuncio: newState})
      }
    }.bind(this));

  }
 onSubmit(data){

  }
  render(){
    const anuncio = this.state.anuncio;

    const CommentsRender = anuncio.comment.map(comment =>{
      return(
        <ComentarioItem
          key={comment.id}
          comentario={comment} />
      )
    })
    return(
      <section className="col-lg-8 card">
        <div className="Anuncio" id={anuncio.id}>
          <div className="row start-lg">
            <div className="Anuncio-container col-lg-12">
              <div className="Anuncio-Image col-lg-1"><img src={"/images/avatars/"+anuncio.autor.id+"/"+anuncio.autor.user_img}/></div>
              <div className="Anuncio-Info col-lg-10">
                <div className="box">
                  <div className="row start-lg">
                    <div className="Info-content col-lg-12" >
                      <h5 className="Anuncio-User">{anuncio.autor.name}</h5>
                    </div>
                    <div className="Info-content col-lg-12">
                      <h6 className="Anuncio-Time">{anuncio.fecha}</h6>
                    </div>
                    <div className="Info-content col-lg-12">
                      <p className="Anuncio-Text">{anuncio.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ComentarioForm
                anuncioId={anuncio.id}
                onSubmit={(e) => this.onSubmit(e)}/>
            <div className="col-lg-12">
               {CommentsRender}
           </div>
          </div>
        </div>
      </section>
    )


  }
}

export default AnuncioItem;
