


import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ChatMessage = React.createClass({
  render: function() {
    return (
      <li className="ChatMessage">
        <span className="author">Mostrar el autor</span>
        <span className="message">Mostrar el mensaje</span>
      </li>
    );
  }
});
