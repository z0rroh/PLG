/*
* app SemamaTitle
*/

import React, { Component } from 'react';

export default class SemanaTitle extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="SemanaTitle">
        <div className="row">
          <div className="col-xs-6"><p> {this.props.title}</p></div>
          <div className="col-xs-6"><p> {this.props.user}</p></div>
        </div>
      </div>
    )
  }
}
