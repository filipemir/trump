import required from './required';

export default class Audio {

  static create(url) {
    return new Audio(url)._setup();
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
  constructor(url = required()) {
    this.url = url;
    this.ready = false;
    this._binary = null;
  }

  play() {
    const context = new AudioContext();

    context.decodeAudioData(this._binary, function(buffer) {
      const sourceBuffer = context.createBufferSource();
      sourceBuffer.buffer = buffer;
      sourceBuffer.connect(context.destination);
      sourceBuffer.start(context.currentTime);
    });
  }

  // --------------------------------------------------------- //

  /**
   * Retrieves promise for the audio binary of audio file.
   *
   * jQuery's AJAX function doesn't work for binary data, so we can't
   * use it to retrieve mp3 files and have to used the old-fashioned
   * XMLHttpRequest instead
   *
   * @returns {Promise}
   */
  _getBinary() {
    if (this._binary) {
      return this;
    }

    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open('GET', this.url, true);
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
      this._binary = response;
      this.ready = true;
    });

    return this;
  }

  _setup() {
    if (!this._binary) {
      this._getBinary();
    }

    return this;
  }
}