import React, { Component } from 'react'
import AnuncioItem from './AnuncioItem'

class AnunciosList extends Component {

  constructor(props){
    super(props)
  }


  render(){
    const AnunciosRender = this.props.anuncios.map( anuncio => {
        return(
          <AnuncioItem key={anuncio.id} anuncio={anuncio} />
        )
    })

    return (
      <div className="comments-container">
        <ul id="comments-list" className="comments-list">
            {AnunciosRender}
        </ul>
      </div>
    )
  }

}

export default AnunciosList;
