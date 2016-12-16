import required from './required';

export default class Quote {
  /**
   * Static class method to create and initialize a new instance
   */
  static create(args) {
    return new Quote(args)._setup();
  }

  /**
   * Creates a new quote instance
   *
   * @constructor
   * @param {Object} [args]
   *  @params {String} audioUrl
   *    URL where audio file stored
   *  @params {String} text
   *    Text of quote
   */
  constructor({
    audioTag = required(),
    audioUrl = required(),
    text = required(),
    sourceUrl = required(),
  }) {
    this.audioTag = audioTag;
    this.audioUrl = audioUrl;
    this.text = text;
    this.sourceUrl = sourceUrl;
    this.played = false;
  }

  /**
   * Plays audio of quote
   *
   * @chainable
   */
  play() {
    this.load();
    const audioTag = this.audioTag;
    setTimeout(() => {
      audioTag.play();
    }, 500);
    this.played = true;

    return this;
  }

  load() {
    const audioTag = this.audioTag;

    audioTag.setAttribute('src', this.audioUrl);
    document.getElementById('text').setAttribute('href', this.sourceUrl);

    return this;
  }

  // --------------------------------------------------------- //

  /**
   * Starts the initialization of a quote by creating its audio
   *
   * @chainable
   */
  _setup() {
    return this;
  }
}