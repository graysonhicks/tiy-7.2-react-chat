var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
// var models = require('../models/models.js');

var WelcomeComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function () {
  return { bgimageurl: "images/welcomebg.jpg" };
  },
  render: function(){
    var style = {
      backgroundImage: 'url(' + this.state.bgimageurl + ')'
     };
    console.log(style);
      return (
        <div className="container-fluid welcome-panel-container" style={style}>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h1 className="welcome-heading">
                    <div className="fa-stack logo-container">
                      <img className="panda-logo" src="images/panda.png" alt="" />
                    </div>
                    <div>Welcome to ChattyPanda!</div>
                  </h1>
                   <p className="welcome-form-caption">Enter your username to login:</p>
                     <form id="username-form" className="input-group">
                      <input type="text" className="form-control" id="username-input" placeholder="USERNAME" />
                    </form>
                   <div className="welcome-button-container"><button className="btn btn-primary btn-lg pull-right" form="username-form" role="button">Chat!</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
});

module.exports = {
  WelcomeComponent: WelcomeComponent
}
