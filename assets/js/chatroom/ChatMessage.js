


import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ChatMessage = React.createClass({
  render: function() {
    return (
      <li className="ChatMessage">
        <span className="author">{this.props.author}</span>
        <span className="message">{this.props.text}</span>
      </li>
    );
  }
});
