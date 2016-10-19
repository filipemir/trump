import required from './required';
import Audio from './audio';

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
  constructor({ audioUrl = required(), text = required() }) {
    this.audioUrl = audioUrl;
    this.text = text;
    this.audio = null;
    this.played = false;
  }

  /**
   * Plays audio of quote
   *
   * @chainable
   */
  play() {
    const audio = this.audio;

    if (audio && audio.ready) {
      audio.play();
      this.played = true;
    }

    return this;
  }

  /**
   * Stops the playing of the audio of quote
   *
   * @chainable
   */
  stopPlaying() {
    const audio = this.audio;

    if (audio && audio.ready) {
      audio.stop();
    }

    return this;
  }

  // --------------------------------------------------------- //

  /**
   * Starts the initialization of a quote by creating its audio
   *
   * @chainable
   */
  _setup() {
    if (!this.audio) {
      this.audio = Audio.create(this.audioUrl);
    }

    return this;
  }
}