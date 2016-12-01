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
    audioUrl = required(),
    text = required(),
    audioTag = required()
  }) {
    this.audioUrl = audioUrl;
    this.text = text;
    this.audioTag = audioTag;
    this.played = false;
  }

  /**
   * Plays audio of quote
   *
   * @chainable
   */
  play() {
    const audioTag = this.audioTag;

    audioTag.setAttribute('src', this.audioUrl);

    audioTag.addEventListener('canplaythrough', () => {
      audioTag.play();
      this.played = true;
    })

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