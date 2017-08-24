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
        <li id={this.state.anuncio.id}>
          <div className="comment-main-level">
            <div className="comment-avatar"><img src={"/images/avatars/"+anuncio.autor.id+"/"+anuncio.autor.user_img}/></div>
            <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author"><a>{this.state.anuncio.autor.name}</a></h6>
                  <span>{this.state.anuncio.fecha}</span>
                  <i className="reply material-icons">reply</i>
                  <i className="heart material-icons">favorite</i>
                </div>
                <div className="comment-content">
                  <p>{this.state.anuncio.text}</p>
                </div>
            </div>
          </div>
          <ul className="comments-list reply-list">
            {CommentsRender}
          </ul>
        </li>
    )


  }
}

export default AnuncioItem;
