var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ChatComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function () {
  return { bgimageurl: "images/bg2.jpg" };
  },
  render: function(){
    var style = {
      backgroundImage: 'url(' + this.state.bgimageurl + ')'
     };
    console.log(style);
      return (
        <div className="container-fluid chat-panel-container" style={style}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default chat-panel">
                <div className="panel-body">
                  <h1 className="welcome-heading">
                    <span className="fa-stack logo-container">
                      <img className="panda-logo" src="images/panda.png" alt="" />
                    </span>
                    <span>ChattyPanda!</span>
                  </h1>
                  <div className="row well chat-area">
                    <div className="col-md-12 outside-message-container">
                      <div className="col-md-9">
                        <div className="alert alert-success outside-message" role="alert">Message from friend</div>
                      </div>
                    </div>
                    <div className="col-md-12 user-message-container">
                      <div className="col-md-9 col-md-offset-3">
                        <div className="alert alert-info user-message" role="alert">User message</div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-input-container">
                   <form id="chat-form" className="input-group">
                     <input type="text" className="form-control" id="chat-input" />
                     <button className="btn btn-primary btn-lg pull-right chat-submit-button" role="button">Say!</button>
                   </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
});

module.exports = {
  ChatComponent: ChatComponent
}
