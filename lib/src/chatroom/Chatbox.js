

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/** @jsx React.DOM */
var ChatBox = React.createClass({

  render: function() {
    return (
      <div className="ChatBox">
        <h2>Lista de mensajes</h2>
        <ChatList />
        <ChatForm />
      </div>
    )
  }
});


React.render(<ChatBox />, document.getElementById('chatapp'));
