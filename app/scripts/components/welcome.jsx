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
    if(formTrue){
      $('#username-submit-button').attr("disabled", false);
    } else {
      $('#username-submit-button').attr("disabled", true);
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var usernameInput = $('#username-input').val();
    this.props.model.set({"username": usernameInput});
    console.log(this.props.model.get("username"));
    Backbone.history.navigate("chat", {trigger: true});
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
                        parlsey-type="text"
                        data-parsley-length="[5,20]"
                        data-required="true"
                        className="form-control"
                        id="username-input"
                        onChange={this.validateForm}
                        placeholder="USERNAME"
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
