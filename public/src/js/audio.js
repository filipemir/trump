var makeRequest = function(params) {
  var request = new XMLHttpRequest();

  request.open(params.method, params.path, true);
  request.responseType = params.responseType ? params.responseType : 'json'; 
  request.send(null);

  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      params.callback(request.response);
    }
  };
};

makeRequest({
  method: 'GET',
  path: 'trumpism/another-one', 
  callback: function(response) {
    playAudio(response.audio);
  }
});

var playAudio = function(url) {
  makeRequest({
    method: 'GET', 
    path: url,
    responseType: 'arraybuffer', 
    callback: function(response) {
      var context = new AudioContext(),
        undecodedAudio = response;

      context.decodeAudioData(undecodedAudio, function(buffer) {
        var sourceBuffer = context.createBufferSource();
        sourceBuffer.buffer = buffer;
        sourceBuffer.connect(context.destination);
        sourceBuffer.start(context.currentTime);
      });
    }
  });
};
