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
    this.props.onSubmit(this.state.text);
    this.setState({text:''});
  }
  handleKeyDown (e) {
    if (e.key === 'Enter' && e.shiftKey === false && e!=='') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render(){
    return(
    <div className="Anuncio col-lg-12">
      <div className="AnuncioNuevo">
        <div className="row start-lg">
          <div className="Anuncio-Image col-lg-1"><img src={"/images/avatars/default_user.png"}/></div>
          <div className="AnuncioNuevo-Form col-lg-10">
              <form onSubmit={(e) => this.onSubmit(e)}
                    onKeyDown={(e) => { this.handleKeyDown(e); }}
                    className="box" acceptCharset="utf-8">
                <div className="row start-lg">
                  <div className="col-lg-12">
                    <textarea
                      value={this.state.text}
                      onChange={(e) => this.onChange(e)}
                      name="text" id="text" className="AnuncioNuevo-Text" placeholder="Responder anuncio..." required></textarea>
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
