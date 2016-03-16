var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var parsley = require('parsleyjs');

var UserMessageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    console.log(this.props.user);
    var newMessage = function(message){
      console.log(message);
      return (
        <div key={message.id} className="alert alert-info user-message" role="alert">
          <div className="user-message-text-container">
            {message.userMessage}
          </div>
          <div className="user-message-name-and-date-container">
            <div className="user-message-name-and-date">message sent at {message.id} by {message.username}</div>
          </div>
        </div>
      )
    }
    return (
      <div className="col-md-12 user-message-container">
        <div className="col-md-9 col-md-offset-3">
           {this.props.userMessages.map(newMessage)}
        </div>
      </div>
    )
  }
});

var OutsideMessageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div className="col-md-12 outside-message-container">
        <div className="col-md-9">
          <div className="alert alert-success outside-message" role="alert">Message from friend</div>
        </div>
      </div>
    )
  }
});

var ChatInputComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return(
    <form data-validate="parsley" onSubmit={this.props.handleSubmit} id="chat-form" className="input-group">
      <input
        parlsey-type="text"
        className="form-control"
        id="chat-input"
        data-required="true"
        data-parsley-minlength="1"
        value={this.props.userMessage}
        onChange={this.props.handleChange}
        />
      <button className="btn btn-primary btn-lg pull-right" id="chat-submit-button" disabled="true" role="button">Say!</button>
    </form>
    )
  }
});

var ChatComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function () {
    return {
      bgimageurl: "images/bg2.jpg",
      userMessages: [],
      userMessage: ""
     };
  },
  validateForm: function(){
    var formTrue = $("#chat-form").parsley().validate();
    console.log(formTrue);
    if(formTrue){
      console.log('true');
      $('#chat-submit-button').attr("disabled", false);
    } else {
      $('#chat-submit-button').attr("disabled", true);
    }
  },
  handleChange: function(e){
    this.validateForm();
    this.setState({userMessage: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newUserMessage = this.state.userMessages.concat([
      {'id': Date.now(), 'userMessage': this.state.userMessage, 'username': this.props.model.get("username")}
    ]);
    this.setState({userMessages: newUserMessage, userMessage: ''});
  },
  render: function(){
    var style = {
      backgroundImage: 'url(' + this.state.bgimageurl + ')'
     };
      return (
        <div className="container-fluid chat-panel-container" style={style}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default chat-panel">
                <div className="panel-body">
                  <h1 className="chat-heading">
                    <span className="fa-stack logo-container">
                      <img className="panda-logo" src="images/panda.png" alt="" />
                    </span>
                    <span>ChattyPanda!</span>
                  </h1>
                  <div className="row well chat-area" id="messages-container">
                    <OutsideMessageComponent collection={this.props.collection} model={this.props.model}/>
                    <UserMessageComponent userMessages={this.state.userMessages} user={this.props.model}/>
                  </div>
                  <div className="chat-input-container">
                    <ChatInputComponent
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
                      validateForm={this.validateForm}
                      userMessage={this.state.userMessage}
                    />
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
