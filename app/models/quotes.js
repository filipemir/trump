const mongoose = require('../db'),
  collectionName = 'quotes',
  quoteSchema = new mongoose.Schema({
    text: String,
    date: Date,
    location: String,
    sourceUrl: String,
    audio: String
  });

quoteSchema.statics.findRandom = function(callback) {
  return this.count(function(err, count) {
    const rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = mongoose.model(collectionName, quoteSchema);