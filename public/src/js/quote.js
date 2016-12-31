import required from './required';

export default class Quote {
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
    sourceUrl = required()
  }) {
    /**
     * Audio element on the page
     *
     * @private
     * @property {HTMLNode}
     */
    this.audioTag = audioTag;

    /**
     * URL of audio of quote
     *
     * @private
     * @property {String}
     */
    this.audioUrl = audioUrl;

    /**
     * Text of quote
     *
     * @private
     * @property {String}
     */
    this.text = text;

    /**
     * URL of source
     *
     * @private
     * @property {String}
     */
    this.sourceUrl = sourceUrl;

    /**
     * Boolen indicating whether or not quote was played
     *
     * @private
     * @property {Boolean}
     */
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

  /**
   * Places the appropriate url as the audio tag's source
   *
   * @chainable
   */
  load() {
    const audioTag = this.audioTag;

    audioTag.setAttribute('src', this.audioUrl);

    return this;
  }
}