import required from './required';
import audioContext from './audio-context';

export default class Audio {

  static create(url) {
    return new Audio(url)._setup();
  }

  static unmute() {
    const buffer = audioContext.createBuffer(1, 1, 22050),
      source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    if (audioContext && audioContext._implementation_ === "webkit") {
      source.noteOn(0);
    } else {
      source.start();
    }
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
      if (audioContext && source.start) {
        source.start();
      } else {
        source.noteOn(0);
      }
    }

    return this;
  }

  stopPlaying() {
    const source = this._bufferSource;

    if (this.ready) {
      if (audioContext && source.stop) {
        source.stop();
      } else {
        source.noteOff(0);
      }
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

  _connectAudioSource(decodedBuffer) {
    const source = this._bufferSource;

    source.buffer = decodedBuffer;
    source.connect(audioContext.destination);
    this.ready = true;
  }

  _decodeBinary(binary) {
    this._binary = binary;

    if (audioContext) {
      if (audioContext._implementation_ === "webkit") {
        const decodedBuffer = audioContext.createBuffer(binary, false);
        this._connectAudioSource(decodedBuffer);
      } else {
        audioContext.decodeAudioData(binary).then((decodedBuffer) => {
          this._connectAudioSource(decodedBuffer);
        });
      }
    }
  }

  _setup() {
    if (audioContext && !this._bufferSource) {
      this._bufferSource = audioContext.createBufferSource();
    }

    if (!this._binary) {
      this._getBinary();
    }

    return this;
  }
}