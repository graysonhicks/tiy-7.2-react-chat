var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var UserModel = require('./models/user.js').UserModel;
var MessageCollection = require('./models/messages.js').MessageCollection;
var userModel = new UserModel();
var messageCollection = new MessageCollection();
var WelcomeComponent = require('./components/welcome.jsx').WelcomeComponent;
var ChatComponent = require('./components/chat.jsx').ChatComponent;

var Router = Backbone.Router.extend({
  routes: {
    '': 'indexLoad',
    'chat': 'chatLoad'
  },
  indexLoad: function(){
    ReactDOM.render(
      <WelcomeComponent model={userModel}/>,
      document.getElementById("main-container")
    );
  },
  chatLoad: function(){
    ReactDOM.render(
      <ChatComponent model={userModel}/>,
      document.getElementById("main-container")
    );
  }
});

module.exports = new Router();
