var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var UserModel = require('./models/user.js').UserModel;
var OutsideMessageCollection = require('./models/messages.js').OutsideMessageCollection;
var userModel = new UserModel();
var outsideMessageCollection = new OutsideMessageCollection();
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
      <WelcomeComponent model={userModel}/>,
      document.getElementById("main-container")
    );
  },
  chatLoad: function(username){
    console.log('chat');
    if(username){
        ReactDOM.render(
          <ChatComponent model={userModel} collection={outsideMessageCollection}/>,
          document.getElementById("main-container")
        );
    } else {
      Backbone.history.navigate('', {trigger: true});
   }
  }
});

module.exports = new Router();
