import required from './required';

export default class Quote {

  static create(args) {
    return new Quote(args).setup();
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
    this.audioBinary = null;
    this.audioUrl = audioUrl;
    this.text = text;
  }

  setup() {
    if (!this.audioBinary) {
      this._getAudioBinary();
    }

    return this;
  }

  /**
   * Retrieves promise for the audio binary of audio file.
   *
   * jQuery's AJAX function doesn't work for binary data, so we can't
   * use it to retrieve mp3 files and have to used the old-fashioned
   * XMLHttpRequest instead
   *
   * @returns {Promise}
   */
  _getAudioBinary() {
    if (this.audioBinary) {
      return this;
    }

    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open('GET', this.audioUrl, true);
      request.responseType = 'arraybuffer';
      request.send(null);

      request.onload = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
          resolve(request.response);
        } else {
          reject('Failed to retrieve audio binary')
        }
      };
    });

    promise.then((response) => {
      this.audioBinary = response;
    });

    return this;
  }

  _playAudioBinary() {
    const context = new AudioContext();

    context.decodeAudioData(this.audioBinary, function(buffer) {
      const sourceBuffer = context.createBufferSource();
      sourceBuffer.buffer = buffer;
      sourceBuffer.connect(context.destination);
      sourceBuffer.start(context.currentTime);
    });
  }

  playQuote() {

    if (this.audioBinary) {
      this._playAudioBinary();
    }

    return this;
  }
}