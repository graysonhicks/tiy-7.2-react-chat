var $ = require('jquery');
var Backbone = require('backbone');

var MessageModel = Backbone.Model.extend({
    defaults: {
      email: localStorage.email || "email@email.com",
      user_avatar: "http://unsplash.it/40"
    }
});

var MessageCollection = Backbone.Collection.extend({
  url: "http://tiny-lasagna-server.herokuapp.com/collections/messages",
  parse: function(data){
    return data;
  },
  model: MessageModel
});

module.exports = {
  MessageCollection: MessageCollection
};
