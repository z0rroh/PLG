/*
* app first node
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TurnoApp from './Components/Turnolog/TurnoApp.js';
import AnunciosApp from './Components/Anuncios/AnunciosApp.js';


if (window.location.pathname === "/anuncios/index"){
  ReactDOM.render(<AnunciosApp />, document.getElementById('anunciosapp'));
}
else{
  if(window.location.pathname === "/turnolog/index"){
    ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
  }
}
