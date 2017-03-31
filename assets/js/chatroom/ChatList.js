
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


var ChatList = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function (message, index) {
      return (<ChatMessage
                author={message.author}
                text={message.text}
                key={index}/>
             );
    });
    return (
      <ul className="ChatList">
         {messages}
      </ul>
    );
  }
});
