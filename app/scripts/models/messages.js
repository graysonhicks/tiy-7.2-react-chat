var $ = require('jquery');
var Backbone = require('backbone');

var MessageModel = Backbone.Model.extend({});

var MessageCollection = Backbone.Collection.extend({
  model: MessageModel
});

module.exports = {
  MessageCollection: MessageCollection
};
