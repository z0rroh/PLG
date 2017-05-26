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
      <section className="col-lg-12 row center-lg">
            {AnunciosRender}
      </section>
    )
  }

}

export default AnunciosList;
