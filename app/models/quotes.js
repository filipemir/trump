const mongoose = require('../db'),
  collectionName = 'quotes';

const quoteSchema = new mongoose.Schema({
  text: String,
  date: Date,
  location: String,
  sourceUrl: String,
  audio: String
});

/**
* Function for retrieving a random quote from the database.
* Function returns a promise of a  quote object
*
* @returns {Promise}
*/
quoteSchema.statics.findRandom = function() {
  const quotesModel = this;

  // First retrieve a promise for the total number of quotes in the database.
  // Calling .exec() is what determines that the returned value will be a promise
  var totalQuotes = quotesModel.count().exec();

  // Once the total number of quotes is returned, grab a random one
  var randomQuote = totalQuotes.then((count) => {
    const randomNum = Math.floor(Math.random() * count);

    return this.findOne().skip(randomNum).exec();
  })

  return randomQuote;
};

module.exports = mongoose.model(collectionName, quoteSchema);