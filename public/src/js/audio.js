import $ from 'jquery';

const makeRequest = function(params) {
  const request = new XMLHttpRequest();

  request.open(params.method, params.path, true);
  request.responseType = params.responseType ? params.responseType : 'json';
  request.send(null);

  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      params.callback(request.response);
    }
  };
};

const playAudio = function(url) {
  makeRequest({
    method: 'GET',
    path: url,
    responseType: 'arraybuffer',
    callback: function(response) {
      const context = new AudioContext(),
        undecodedAudio = response;

      context.decodeAudioData(undecodedAudio, function(buffer) {
        const sourceBuffer = context.createBufferSource();
        sourceBuffer.buffer = buffer;
        sourceBuffer.connect(context.destination);
        sourceBuffer.start(context.currentTime);
      });
    }
  });
};



$('#trumpMe').on('click', () => {
  makeRequest({
    method: 'GET',
    path: 'trumpism/another-one',
    callback: function(response) {
      debugger;
      playAudio(response.audio);
    }
  });
});

// $('#trumpMe').on('click', makeRequest({
//   method: 'GET',
//   path: 'trumpism/another-one',
//   callback: function(response) {
//     playAudio(response.audio);
//   }
// }));
