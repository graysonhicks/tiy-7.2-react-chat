var $ = require('jquery');
var Backbone = require('backbone');

var MessageModel = Backbone.Model.extend({});

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
