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