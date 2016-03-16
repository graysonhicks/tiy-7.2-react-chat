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
    var newMessage = function(message){ // each message is broken down into parts in this to generate div
      return ( // the backbone mixin tracks this state so only the new message is added
        <div key={message.id} className="alert alert-info user-message" role="alert">
          <div className="user-message-text-container">
            {message.userMessage}
          </div>
          <div className="user-message-name-and-date-container">
            <div className="user-message-name-and-date">message sent at {message.time} by {message.username}</div>
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
    )// the userMessages array is mapped above^^
  }
});

var OutsideMessageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
      var newMessage = function(message){
        return (
          <div key={message.id} className="alert alert-success outside-message" role="alert">
            <div className="outside-message-text-container">
              {message.userMessage}
            </div>
            <div className="outside-message-name-and-date-container">
              <div className="outside-message-name-and-date">message sent at {message.time} by {message.username}</div>
            </div>
          </div>
        )
      }
    return (
      <div className="col-md-12 outside-message-container">
        <div className="col-md-9">

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
    )// properties above are accessible because they were passed in below from parent
  }
});

var ChatComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function () {
    return {
      bgimageurl: "images/bg2.jpg",
      userMessages: [], // set empty array to hold messages
      userMessage: "", //empty string to hold message
      outsideMessages: this.props.collection
     };
  },
  validateForm: function(){
    var formTrue = $("#chat-form").parsley().validate();
    if(formTrue){
      $('#chat-submit-button').attr("disabled", false);
    } else {
      $('#chat-submit-button').attr("disabled", true);
    }
  },
  handleChange: function(e){
    this.validateForm(); // on change check to make sure at least one character has been typed
    this.setState({userMessage: e.target.value}); // constantly set userMessage to the input value
  },
  handleSubmit: function(e){
    e.preventDefault();
    var date = new Date();
    var newUserMessage = this.state.userMessages.concat([ // concat this new message with old ones
      { 'id': Date.now(), // gives unique id
        'userMessage': this.state.userMessage, //this is set on handleChange above
        'username': this.props.model.get("username"),
        'time': date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2)
      }
    ]);
    this.setState({userMessages: newUserMessage, userMessage: ''}); // now userMessages is set to the new bigger group of messages and current usermessage is cleared
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
      //pass in messages array and user
      // methods and properties are passed in below so that component can access
  }
});



module.exports = {
  ChatComponent: ChatComponent
}
