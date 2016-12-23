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
    this._round = 0;
  }

  /**
   * Plays a quote from the quote stash.
   *
   * @chainable
   */
  playPresentQuote() {
    if (!this._presentQuote || this._presentQuote.played) {
      this._loadQuote();
    }

    const presentQuote = this._presentQuote;

    if (presentQuote) {
      presentQuote.play();

      $('audio').one('playing', () => {
        const displayText = this.displayText.bind(this);
        setTimeout(displayText, 100, presentQuote.text);

      });
    }

    return this;
  }

  displayText(text) {
    const words = text.split(' '),
      wordCount = words.length,
      quoteElement = $('#text');

    if (this._round === 0 || this._round === 1) {
      quoteElement.toggleClass('first-round');
    }

    if (this._round === 1) {
      quoteElement.on('click', () => {
        window.open(this._presentQuote.sourceUrl, "blank");
      });
    }

    quoteElement.empty();

    quoteElement.toggleClass('intro');

    for (let i = 0; i < wordCount; i++) {
      const word = words[i],
        delay = i * 1/wordCount,
        html = `<span class="word" style="transition-delay: ${delay}s;">${word}</span>`;

      quoteElement.append(html);

      quoteElement.one('mouseenter touchstart', () => {
        $('.word').css('transition-delay', '0s');
      })
    }

    setTimeout(() => {
      quoteElement.toggleClass('intro');

      $('#face').on('animationiteration', () => {
        $('#button').removeClass('loading');
        $('audio').off('animationiteration');
      })
    }, 100);

    return this
  }

  newQuote() {
    this._round++;
    $('#text').empty();
    this.playPresentQuote();
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
      const audioTag = document.getElementById('audio-tag'),
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