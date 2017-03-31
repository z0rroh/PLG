

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/** @jsx React.DOM */
var ChatBox = React.createClass({

  getInitialState: function() {
    return {messages: []};
  },
  componentDidMount: function() {
      io.socket.on('connect', function() {

        io.socket.get(this.props.apiUrl, function(messages) {
          this.setState({messages: messages});
        }.bind(this));

        io.socket.on('new message', function(newMessage) {
          this.setState({messages: this.state.messages.concat([newMessage])});
        }.bind(this));

      }.bind(this));
    },
    handleNewMessage: function (newMessage) {
      io.socket.post(this.props.apiUrl, newMessage);
    },
  render: function() {
    return (
      <div className="ChatBox">
        <h2>Lista de mensajes</h2>
        <ChatList messages={this.state.messages} />
        <ChatForm onNewMessage={this.handleNewMessage} />
      </div>
    )
  }
});


ReactDOM.render(<ChatBox apiUrl="/message" />, document.getElementById('chatapp'));
