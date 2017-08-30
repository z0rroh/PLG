import React, { Component } from 'react'

import ComentarioForm from './ComentarioForm'
import ComentarioItem from './ComentarioItem'

class AnuncioItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      anuncio : this.props.anuncio,
      itemLimit: 2,
      showMore: true
    }
    this.showMore = this.showMore.bind(this);
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
  showMore(){
    var commentsLen = this.state.anuncio.comment.length;
    var prevLimit = this.state.itemLimit;
    var nextLimit = prevLimit + 3;
    if(nextLimit > commentsLen){
      nextLimit = commentsLen;
      this.setState({showMore: false});
    }
    this.setState({itemLimit: nextLimit});
  }
  onSubmit(data){

  }
  render(){
    const anuncio = this.state.anuncio;
    let button = null;
    if(anuncio.comment.length>this.state.itemLimit && this.state.showMore){
      button = <div className="showMore"><a className="showMoreClick" onClick={this.showMore}>Cargar mas comentarios</a></div>
    }
    const CommentsRender = anuncio.comment.slice(0,this.state.itemLimit).map(comment =>{
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
            {button}
            {CommentsRender}
          </ul>
        </li>
    )


  }
}

export default AnuncioItem;
