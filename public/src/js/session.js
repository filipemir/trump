import $ from 'jquery';
import _ from 'lodash';
import Quote from './quote';
import Social from './social';
import VisualEffects from './visual-effects';

export default class Session {
  /**
   * Static method used to create and initialize a new session.
   *
   * @return {Session}
   */
  static initialize() {
    const s = new Session(),
      pageElements = {
        audio: $('audio'),
        button: $('#button'),
        face: $('#face'),
        fb: $('#fb-link'),
        hoverableElements: $('#button, .social-icon, #text'),
        social: $('#social'),
        text: $('#text'),
        twitter: $('#twitter-link'),
        window: $(window)
      };

    s.pageElements = pageElements;
    s.visuals = VisualEffects.setup(pageElements);
    s.getQuotes()
      .setupNewQuoteListeners();
    s.social = Social.setup(pageElements);

    return s;
  }

  /**
   * Creates a new Session instance
   *
   * @param {Number} quoteStashSize
   *  Number of quotes to cache in this._quoteStash array.
   * @constructor
   */
  constructor(quoteStashSize = 10) {
    /**
     * Object that stores the static page elements to be used throughout
     * the various functions. Page elements are expected to be jQuery
     * elements
     *
     * @property {Objects}
     */
    this.pageElements = {};

    /**
     * Reference to the class that controls the functionality of the
     * sharing buttons
     *
     * @property {Social}
     */
    this.social = null;

    /**
     * Reference to the class that controls the visual effects and the
     * associated listeners
     *
     * @property {VisualEffects}
     */
    this.visuals = null;

    /**
     * Stash of quote objects created from
     *
     * @private
     * @property {Array}
     */
    this._quoteStash = null;

    /**
     * Size of quote stash
     *
     * @private
     * @property {Number}
     */
    this._quoteStashSize = quoteStashSize;

    /**
     * Quote currently active
     *
     * @private
     * @property {Quote}
     */
    this._presentQuote = null;

    /**
     * Number of rpesent round (i.e. how many quotes have been loaded)
     *
     * @private
     * @property {Number}
     */
    this._round = 0;
  }

  /**
   * Makes an ajax request for the number of quotes specified
   *
   * @param {Integer} num
   * @chainable
   */
  getQuotes(num = this._quoteStashSize) {
    $.ajax({
      url: 'trumpism',
      type: 'GET',
      data: { num },
      success: (response) => {
        return this._stashQuotes(response);
      }
    });

    return this;
  }

  /**
   * Function for requesting a new quote. This is the function that
   * starts the process whenever the user clicks the button or otherwise
   * requests a new quote
   *
   * @chainable
   */
  newQuote() {
    this._round++;

    if (this._round === 1) {
      this._firstQuoteSetup();
    }

    this.visuals.glowFaceTillPlay();
    this._playQuote();

    return
  }

  /**
   * Setup the listeners that monitor for requests from the user for new quotes
   *
   * @chainable
   */
  setupNewQuoteListeners() {
    // On button click:
    this.pageElements.button.on('click', () => {
      this.newQuote();
    })

    // On click of the page title, which is the text when the page loads:
    $('#text.first-round').one('click', () => {
      this.newQuote();
    })

    // On pressing the space bar:
    $(window).on('keydown', () => {
      if (event.keyCode === 32) {
        this.newQuote();
      }
    })

    return this;
  }

  // -------------------------------------------------------------------------------------- //

  /**
   * Function that takes acre of all the work that happens when the user first
   * requests a new quote (e.g. first button click)
   *
   * @chainable
   */
  _firstQuoteSetup() {
    this.pageElements.button.removeClass('unclicked');
    this.visuals.bounceInSocialButtons();

    this.pageElements.text.removeClass('first-round')
      .off('click')
      .on('click', () => {
        window.open(this._presentQuote.sourceUrl, "blank");
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
      this.social.update(this._presentQuote);
    }
    this.getQuotes(1);

    return this;
  }

  /**
   * Plays present quote from the quote stash, if it hasn't been played,
   * or loads and plays a new one if it has.
   *
   * @chainable
   */
  _playQuote() {
    if (!this._presentQuote || this._presentQuote.played) {
      this._loadQuote();
    }

    const presentQuote = this._presentQuote;

    if (presentQuote) {
      presentQuote.play();
      this.visuals.displayTextOnPlay(presentQuote.text);
    }

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
      const audioTag = this.pageElements.audio[0],
        quoteArgs = _.defaults(rawQuote, { audioTag }),
        newQuote = new Quote(quoteArgs);

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
      this.getQuotes(this._quoteStashSize);
    }

    return this;
  }

}