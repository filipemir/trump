import required from './required';
import Audio from './audio';

export default class Quote {

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
  constructor({ audioUrl = required(), text = required() }) {
    this.audioUrl = audioUrl;
    this.text = text;
    this.audio = null;
    this.played = false;
  }

  play() {
    const audio = this.audio;

    if (audio && audio.ready) {
      audio.play();
      this.played = true;
    }

    return this;
  }

  // --------------------------------------------------------- //

  _setup() {
    if (!this.audio) {
      this.audio = Audio.create(this.audioUrl);
    }

    return this;
  }
}