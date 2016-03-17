var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var parsley = require('parsleyjs');
var moment = require('moment');


var MessageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var newMessage = function(message){ // each message is broken down into parts in this to generate div
      console.log(message.attributes.time);
      var time = moment(message.attributes.time);
      time = moment(time).format("h:mm a");
      if(message.attributes.username == this.props.user.get("username")){
      return ( // the backbone mixin tracks this state so only the new message is added
        <div className="col-md-9 col-md-offset-3">
          <div key={message.cid} className="alert alert-info user-message" role="alert">
              <div className="row">
                <div className="col-md-9">
                  <div className="user-message-text-container">
                    {message.attributes.content}
                  </div>
                  <div className="user-message-name-and-date-container">
                    <div className="user-message-name-and-date">message sent at {time} by {message.attributes.username}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="user-gravatar-container">
                    <img src={message.attributes.user_avatar}></img>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-md-9">
          <div key={message.cid} className="alert alert-success outside-message" role="alert">
            <div className="row">
              <div className="col-md-3">
                <div className="outside-gravatar-container">
                  <img src={message.attributes.user_avatar}></img>
                </div>
             </div>
             <div className="col-md-9">
              <div className="outside-message-text-container">
                {message.attributes.content}
              </div>
              <div className="outside-message-name-and-date-container">
                <div className="outside-message-name-and-date">message sent at {time} by {message.attributes.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
     }
    }
    return (
      <div className="col-md-12 message-container">
           {(_.sortBy(this.props.messageCollection.map(newMessage.bind(this)), "time")).reverse()}
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
  componentDidMount: function(){
    //this.handleFetch();
    setInterval(this.handleFetch, 5000);
  },
  getInitialState: function () {
    return {
      bgimageurl: "images/bg2.jpg",
      userMessage: "", //empty string to hold message
      messageCollection: this.props.collection,
      username: this.props.model.get('username')
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
  handleFetch: function(){
    this.state.messageCollection.fetch();
  },
  handleChange: function(e){
    this.validateForm(); // on change check to make sure at least one character has been typed
    this.setState({userMessage: e.target.value}); // constantly set userMessage to the input value
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newUserMessage = {
        'content': this.state.userMessage, //this is set on handleChange above
        'username': this.props.model.get("username"),
        'time': Date.now(),
        'user_avatar': this.props.model.get("user_avatar")
      };
    this.getCollection().create(newUserMessage);
    this.setState({userMessage: ""});
  },
  logOut: function(e){
    e.preventDefault();
    localStorage.clear();
    Backbone.history.navigate("", {trigger: true});
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
                    <button onClick={this.logOut} className="btn btn-danger btn-lg pull-right" id="logout-button" role="button">Logout</button>
                  </h1>
                  <div className="row well chat-area" id="messages-container">
                    <MessageComponent messageCollection={this.state.messageCollection} user={this.props.model}/>

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
