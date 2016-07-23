var request = new XMLHttpRequest();
var context = new AudioContext();

request.open(
  'GET', 
  'https://s3.amazonaws.com/trump-says/you_will_get_bored_of_winning.mp3',
  true
);

request.responseType = 'arraybuffer';

 
request.onload = function () {
  var undecodedAudio = request.response;

  context.decodeAudioData(undecodedAudio, function (buffer) {
    var sourceBuffer = context.createBufferSource();
    sourceBuffer.buffer = buffer;
    sourceBuffer.connect(context.destination);
    sourceBuffer.start(context.currentTime);
  });
};
 
request.send();
