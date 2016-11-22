/*
* app Turno
*/

import React, { Component } from 'react';

const Turno = ({data,onPostTurno}) => {
  const handleClick = (event, id) => {
    onPostTurno(id);
  };
  let porcentaje = (parseInt(data.cupoActual) * 100)/parseInt(data.cupoTotal);
    porcentaje = porcentaje+"%";
  let datermianteStyle = { width: porcentaje};
  return(
    <section className="Turno col-xs-4 card">
      <div className="Turno-Content">
        <div className="row start-lg">
          <div className="Turno-Info col-lg-4">
            <h5>{data.name}</h5>
            <p>{data.start} - {data.end}</p>
          </div>
          <div className="Turno-Log col-lg-4">
            <h4> {data.cupoActual}/{data.cupoTotal}</h4>
          </div>
          <div className="Turno-Button col-lg-4">

            <a onClick={event => handleClick(event,data.id)} className="btn-floating btn-large">
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
