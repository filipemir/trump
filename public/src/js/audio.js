import required from './required';

const audioContext = new AudioContext();

export default class Audio {

  static create(url) {
    return new Audio(url)._setup();
  }

  /**
   * Creates a new Audio instance
   *
   * @constructor
   * @param {String} [url]
   *  URL where audio file stored
   */
  constructor(url = required()) {
    this.url = url;
    this.ready = false;
    this._binary = null;
    this._bufferSource = null;
  }

  play() {
    const source = this._bufferSource;

    if (this.ready) {
      source.start();
    }

    return this;
  }

  stopPlaying() {
    const source = this._bufferSource;

    if (this.ready) {
      source.stop();
    }

    return this;
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
      this._decodeBinary(response);
    });

    return this;
  }

  _decodeBinary(binary) {
    const source = this._bufferSource;

    this._binary = binary;

    audioContext.decodeAudioData(binary).then((buffer) => {
      source.buffer = buffer;
      source.connect(audioContext.destination);
      this.ready = true;
    });
  }

  _setup() {
    if (!this._bufferSource) {
      this._bufferSource = audioContext.createBufferSource();
    }

    if (!this._binary) {
      this._getBinary();
    }

    return this;
  }
}