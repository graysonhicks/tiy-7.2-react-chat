var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var WelcomeComponent = require('./components/welcome.jsx').WelcomeComponent;
var ChatComponent = require('./components/chat.jsx').ChatComponent;

var Router = Backbone.Router.extend({

  routes: {
    '': 'indexLoad',
    'chat': 'chatLoad'
  },
  indexLoad: function(){
    ReactDOM.render(
      <WelcomeComponent />,
      document.getElementById("main-container")
    );
  },
  chatLoad: function(){
    ReactDOM.render(
      <ChatComponent />,
      document.getElementById("main-container")
    );
  }
});

module.exports = new Router();
