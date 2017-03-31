

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ChatForm = React.createClass({
  render: function() {
    return (
      <form className="ChatForm">
        <input type="text" placeholder="author" className="author" ref="author"/>
        <input type="text" placeholder="message..." className="text" ref="text" />
        <input type="submit" value="Send" />
      </form>
    );
  }
});
