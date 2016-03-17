var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var parsley = require('parsleyjs');


var WelcomeComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function () {
  return { bgimageurl: "images/welcomebg.jpg" };
  },
  validateForm: function(){
    var formTrue = $("#username-form").parsley().validate();
    console.log($("#username-input").attr("placeholder"));
    console.log($("#username-input").val());
    if(!formTrue || $("#username-input").val() == ""){
      $('#username-submit-button').attr("disabled", true);
    } else {
      $('#username-submit-button').attr("disabled", false);
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var usernameInput = $('#username-input').val();
    var emailInput = $('#email-input').val();
    localStorage.setItem("username", usernameInput);
    this.props.model.set({"username": localStorage.username});
    localStorage.setItem("email", emailInput);
    this.props.model.set({"email": localStorage.email});
    localStorage.setItem("user_avatar", this.props.model.get("user_avatar"));
    console.log(localStorage.user_avatar);
    Backbone.history.navigate("chat/" + this.props.model.get("username"), {trigger: true});
  },
  render: function(){
      var style = {
        backgroundImage: 'url(' + this.state.bgimageurl + ')'
       };
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
                     <form data-validate="parsley" id="username-form" className="input-group" onSubmit={this.handleSubmit}>
                      <input
                        placeholder="USERNAME"
                        data-parlsey-type="text"
                        data-parsley-length="[5,20]"
                        data-parsley-trigger="change"
                        className="form-control"
                        required=""
                        id="username-input"
                        onChange={this.validateForm}
                      />
                      <input
                        type="email"
                        data-parsley-trigger="change"
                        required=""
                        className="form-control"
                        id="email-input"
                        onChange={this.validateForm}
                        placeholder="EMAIL"
                      />
                    </form>
                   <div className="welcome-button-container">
                     <button
                       className="btn btn-primary btn-lg pull-right"
                       form="username-form"
                       disabled="true"
                       id="username-submit-button"
                       role="button">Chat!
                     </button>
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
  WelcomeComponent: WelcomeComponent
}
