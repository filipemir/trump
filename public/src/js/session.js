import $ from 'jquery';
import _ from 'lodash';
import Quote from './quote';

export default class Session {
  /**
   * Static class method to create and initialize a new instance
   */
  static create() {
    return new Session()._setup();
  }

  /**
   * Creates a new Session instance
   *
   * @constructor
   */
  constructor() {
    this._quoteStash = null;
    this._quoteStashSize = 10;
    this._requestPath = 'trumpism';
    this._presentQuote = null;
  }

  /**
   * Plays a quote from the quote stash.
   *
   * @chainable
   */
  playPresentQuote() {
    if (!this._presentQuote) {
      this._loadQuote();
    }

    if (this._presentQuote) {
      if (this._presentQuote.played) {
        this._presentQuote.stopPlaying();
        this._loadQuote();
      }
      this._presentQuote.play();
    }

    return this;
  }

  displayPresentQuoteText() {
    $('#quoteText').text(this._presentQuote.text);

    return this
  }

  newQuote() {
    this.playPresentQuote();
    this.displayPresentQuoteText();
  }

  // --------------------------------------------------------- //

  /**
   * Makes an ajax request for the number of quotes specified
   *
   * @param {Integer} num
   * @chainable
   */
  _getQuotes(num) {
    $.ajax({
      url: this._requestPath,
      type: 'GET',
      data: { num },
      success: (response) => {
        return this._stashQuotes(response);
      }
    });

    return this;
  }

  /**
   * Loads a quote from the quote stash to present quote and makes a
   * request for a new quote to add to the stash
   *
   * @chainable
   */
  _loadQuote() {
    this._presentQuote = this._quoteStash.shift();
    this._getQuotes(1);

    return this;
  }

  /**
   * Loops through an array of raw quotes (as received from service),
   * creates a Quote object for each, and adds them to the log stash
   *
   * @param {Array} rawQuotes
   * @chainable
   */
  _stashQuotes(rawQuotes) {
    const quotes = this._quoteStash ? this._quoteStash : [];

    _.forEach(rawQuotes, (rawQuote) => {
      const newQuote = Quote.create(rawQuote);

      quotes.push(newQuote);
    });

    this._quoteStash = quotes;

    return this;
  }

  /**
   * Starts the intialization of a session by making the request for
   * quotes and initiatilizing the stash
   *
   * @chainable
   */
  _setup() {
    if (!this._quoteStash) {
      this._getQuotes(this._quoteStashSize);
    }

    return this;
  }
}