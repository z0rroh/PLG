/*
* app Turno
*/

import React, { Component } from 'react';

const Turno = props => {
  const handleClick = (event, id) => {
    props.onPostTurno(id);
  };
  let porcentaje = (parseInt(props.data.cupoActual) * 100)/parseInt(props.data.cupoTotal);
    porcentaje = porcentaje+"%";
  let datermianteStyle = { width: porcentaje};
  return(
    <section className="Turno col-xs-4 card">
      <div className="Turno-Content">
        <div className="row start-lg">
          <div className="Turno-Info col-lg-4">
            <h5>{props.data.name}</h5>
            <p>{props.data.start} - {props.data.end}</p>
          </div>
          <div className="Turno-Log col-lg-4">
            <h4> {props.data.cupoActual}/{props.data.cupoTotal}</h4>
          </div>
          <div className="Turno-Button col-lg-4">

            <a onClick={event => handleClick(event,props.data.id)} className="btn-floating btn-large">
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>
      <div className="Turno-progress progress">
        <div className="determinate" style={datermianteStyle}></div>
      </div>
    </section>
  )
};

export default Turno;
