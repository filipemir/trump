import $ from 'jquery';
import _ from 'lodash';
import Quote from './quote';
import VisualEffects from './visual-effects';

export default class Session {

  static initialize() {
    const s = new Session(),
      permanentPageElements = {
        audio: $('audio'),
        button: $('#button'),
        face: $('#face'),
        hoverableElements: $('#button, .social-icon, #text'),
        text: $('#text'),
        window: $(window)
      };

    s._permanentPageElements = permanentPageElements;
    s._getQuotes(s._quoteStashSize);
    s._visuals = VisualEffects.setup(permanentPageElements);
    s.setupNewQuoteListeners();

    return s;
  }

  /**
   * Creates a new Session instance
   *
   * @constructor
   */
  constructor(quoteStashSize = 10) {
    this._quoteStash = null;
    this._quoteStashSize = quoteStashSize;
    this._requestPath = 'trumpism';
    this._presentQuote = null;
    this._round = 0;
    this._visuals = null;
    this._permanentPageElements = {};
  }

  /**
   * Plays a quote from the quote stash.
   *
   * @chainable
   */
  playQuote() {
    if (!this._presentQuote || this._presentQuote.played) {
      this._loadQuote();
    }

    const presentQuote = this._presentQuote;

    if (presentQuote) {
      presentQuote.play();
      this._visuals.displayTextOnPlay(presentQuote.text);
    }

    return this;
  }

  newQuote() {
    this._round++;

    if (this._round === 1) {
      this._firstQuoteSetup();
    }

    this._visuals.glowFaceTillPlay();
    this.playQuote();
  }

  setupNewQuoteListeners() {
    this._permanentPageElements.button.on('click', () => {
      this.newQuote();
    })

    $('#text.first-round').on('click', () => {
      this.newQuote();
    })

    $(window).on('keydown', () => {
      if (event.keyCode === 32) {
        this.newQuote();
      }
    })
  }

  // -------------------------------------------------------------------------------------- //

  _firstQuoteSetup() {
    this._permanentPageElements.button.removeClass('unclicked');

    this._permanentPageElements.text.removeClass('first-round')
      .on('click', () => {
        window.open(this._presentQuote.sourceUrl, "blank");
      });

    return this;
  }

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
    if (this._quoteStash && this._quoteStash.length > 0) {
      this._presentQuote = this._quoteStash.shift();
    }
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

    _.forEach(rawQuotes, (rawQuote, index) => {
      const audioTag = this._permanentPageElements.audio[0],
        quoteArgs = _.defaults(rawQuote, { audioTag }),
        newQuote = Quote.create(quoteArgs);

      quotes.push(newQuote);
    });

    this._quoteStash = quotes;

    return this;
  }

  /**
   * Starts the intialization of a session by making the request for
   * quotes and initializing the stash
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