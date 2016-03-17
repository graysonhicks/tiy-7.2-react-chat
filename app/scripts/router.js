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
    'chat/:username': 'chatLoad'
  },
  indexLoad: function(){
    console.log('index');
    ReactDOM.render(
      React.createElement(WelcomeComponent, {
        model: userModel
      }),
      document.getElementById("main-container")
    );

  },
  chatLoad: function(username){
    console.log('chat');
    if (username){
      ReactDOM.render(
          React.createElement(ChatComponent, {
            model: userModel,
            collection: messageCollection
          }),
          document.getElementById("main-container")
        );
    } else {
      Backbone.history.navigate('', {trigger: true});
   }
  }
});

module.exports = new Router();
