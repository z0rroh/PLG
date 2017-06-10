import React, { Component } from 'react'

class ComentarioForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
  }


  onChange(e){
    this.setState({text:e.target.value})

  }

  onSubmit(e){
    e.preventDefault();
    this.setState({text:''});
    io.socket.post('/comentario/create/',{anuncio: this.props.anuncioId,text: this.state.text}, (comentario)=> {
        this.props.onSubmit(comentario);
        this.setState({text:''});
    })
  }
  handleKeyDown (e) {
    if (e.key === 'Enter' && e.shiftKey === false && e!=='') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render(){
    return(
        <div className="col-lg-12">
          <div className="ComentarioNuevo">
            <div className="row start-lg">
              <div className="ComentarioNuevo-Image col-lg-1"><img src={"/images/avatars/default_user.png"}/></div>
              <div className="ComentarioNuevo-Form col-lg-10">
                  <form onSubmit={(e) => this.onSubmit(e)}
                        onKeyDown={(e) => { this.handleKeyDown(e); }}
                        className="box" acceptCharset="utf-8">
                    <div className="row start-lg">
                      <div className="col-lg-12">
                        <textarea
                          value={this.state.text}
                          onChange={(e) => this.onChange(e)}
                          name="text" id="text" className="ComentarioNuevo-Text" placeholder="Responder anuncio..." required></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default ComentarioForm;
