import React, { Component } from 'react'


class ComentarioItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      comentario: this.props.comentario
    }
  }

  render(){
    const comment = this.state.comentario;

    return(
      <div className="Comentario col-lg-10">
        <div className="row start-lg">
           <div className="Comentario-Image col-lg-1"><img src={"/images/avatars/default_user.png"}/></div>
           <div className="Comentario-Info col-lg-10">
               <div className="box">
                 <div className="row start-lg">
                   <div className="col-lg-12">
                     <h5 className="Comentario-User">{comment.name}</h5><p className="Comentario-Text">{comment.text}</p>
                   </div>
                   <div className="col-lg-12">
                     <h6 className="Comentario-Time">{comment.time}</h6>
                   </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    )


  }
}

export default ComentarioItem;
