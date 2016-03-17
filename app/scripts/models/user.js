var $ = require('jquery');
var Backbone = require('backbone');
var md5 = require('md5');

var UserModel = Backbone.Model.extend({
  defaults: {
    username: localStorage.username || "Anonymous",
    email: localStorage.email || "email@email.com",
    user_avatar: localStorage.user_avatar || "http://unsplash.it/40"
  },
  initialize: function(){
    var message = md5(this.get("email").trim().toLowerCase());
    var url = "http://www.gravatar.com/avatar/" + message;
    this.set("user_avatar", url);
  }
});

module.exports = {
  UserModel: UserModel
};
