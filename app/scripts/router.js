var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var WelcomeComponent = require('./components/welcome.jsx').WelcomeComponent;

var Router = Backbone.Router.extend({

  routes: {
    '': 'indexLoad',
    'chat': 'chatLoad'
  },
  indexLoad: function(){
    console.log('load');
    // ReactDOM.render(
    //   <WelcomeComponent />,
    //   document.getElementById("main-container")
    // );
  },
  chatLoad: function(){
    console.log('chat');
  }
});

module.exports = new Router();
