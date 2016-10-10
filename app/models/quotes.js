const mongoose = require('../db'),
  collectionName = 'quotes';

const quoteSchema = new mongoose.Schema({
  text: String,
  date: Date,
  location: String,
  audioUrl: String,
  sourceUrl: String
});

/**
* Function for retrieving random quotes from the database.
* Returns a promise of an array of quote objects
*
* @params {Integer}
*  Number of quotes request
* @returns {Promise}
*  Promise resolves to array
*/
quoteSchema.statics.findRandom = function(num) {
  const quotesModel = this;

  // First retrieve a promise for the total number of quotes in the database.
  // Calling .exec() is what determines that the returned value will be a promise
  var totalQuotes = quotesModel.count().exec();

  // Once the total number of quotes is returned, grab a random one
  var randomQuote = totalQuotes.then((count) => {
    const randomNum = Math.floor(Math.random() * count);
    num = num > count ? count : num;

    return this.find().skip(randomNum).limit(num).exec();
  })

  return randomQuote;
};

module.exports = mongoose.model(collectionName, quoteSchema);