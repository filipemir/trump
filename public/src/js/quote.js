import required from './required';

export default class Quote {

  constructor({ audioUrl = required(), text = required() }) {
    this.audioBinary = null;
    this.audioUrl = audioUrl;
    this.text = text;
  }

  /*
  * jQuery's AJAX function doesn't work for binary data, so we can't
  * use it to retrieve mp3 files and have to used the old-fashioned
  * XMLHttpRequest instead
  *
  * @returns
  */
  setAudioBinary() {
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

    // const audioBinary = promise.then((response) => {
    //   return response;
    // }).catch(() => {
    //   return null;
    // })

    // this.audioBinary = audioBinary;

    return promise;
  }

  playAudioBinary(undecodedAudio) {
    const context = new AudioContext();
    context.decodeAudioData(undecodedAudio, function(buffer) {
      const sourceBuffer = context.createBufferSource();
      sourceBuffer.buffer = buffer;
      sourceBuffer.connect(context.destination);
      sourceBuffer.start(context.currentTime);
    });
  }

  playQuote() {
    this.setAudioBinary().then((response) => {
      this.playAudioBinary(response);
    }).catch((error) => {
      console.log(error);
    });

    return this;
  }
}