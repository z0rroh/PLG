

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ChatForm = React.createClass({

  handleNewMessage: function(e) {
      e.preventDefault();
      var author = this.refs.author.getDOMNode().value;
      var text = this.refs.text.getDOMNode().value;

      this.props.onNewMessage({author: author, text: text});

      this.refs.text.getDOMNode().value = '';
    },
  render: function() {
    return (
      <form className="ChatForm" onSubmit={this.handleNewMessage}>
        <input type="text" placeholder="author" className="author" ref="author"/>
        <input type="text" placeholder="message..." className="text" ref="text" />
        <input type="submit" value="Send" />
      </form>
    );
  }
});
