var $ = require('jquery');
var Backbone = require('backbone');

var UserModel = Backbone.Model.extend({
  defaults: {
    username: "Anonymous"
  }
});

module.exports = {
  UserModel: UserModel
};
