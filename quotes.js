var mongoose = require('mongoose'),
  collectionName = 'quotes';

var quoteSchema = new mongoose.Schema({
    text: String,
    date: Date,
    location: String,
    sourceUrl: String,
    audio: String
  });

quoteSchema.statics.findRandom = function(callback) {
  return this.count(function(err, count) {
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = mongoose.model(collectionName, quoteSchema);