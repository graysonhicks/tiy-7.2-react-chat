var $ = require('jquery');
var Backbone = require('backbone');

var OutsideMessageModel = Backbone.Model.extend({});

var OutsideMessageCollection = Backbone.Collection.extend({
  url: "http://tiny-lasagna-server.herokuapp.com/collections/messages",
  model: OutsideMessageModel
});

module.exports = {
  OutsideMessageCollection: OutsideMessageCollection
};
