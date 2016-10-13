import $ from 'jquery';
import _ from 'lodash';
import Quote from './quote';

export default class Session {

  static create() {
    return new Session()._setup();
  }

  /**
   * Creates a new Session instance
   *
   * @constructor
   */
  constructor() {
    this.quoteStash = null;
    this._quoteStashSize = 10;
    this._requestPath = 'trumpism';
  }

  getQuotes(num) {
    $.ajax({
      url: this._requestPath,
      type: 'GET',
      data: { num },
      success: (response) => {
        return this._stashQuotes(response);
      }
    });
  }

  playAQuote() {
    const quote = this.quoteStash.shift();

    this.getQuotes(1);

    if (quote) {
      quote.play();
    }
  }

  // --------------------------------------------------------- //

  _stashQuotes(rawQuotes) {
    const quotes = this.quoteStash ? this.quoteStash : [];

    _.forEach(rawQuotes, (rawQuote) => {
      const newQuote = Quote.create(rawQuote);

      quotes.push(newQuote);
    });

    this.quoteStash = quotes;
  }

  _setup() {
    if (!this.quoteStash) {
      this.getQuotes(10);
    }

    return this;
  }
}