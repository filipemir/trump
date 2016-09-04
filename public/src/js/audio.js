import $ from 'jquery';
import Quote from './quote';

// const makeRequest = function(params) {
//   const request = new XMLHttpRequest();

//   request.open(params.method, params.path, true);
//   request.responseType = params.responseType ? params.responseType : 'json';
//   request.send(null);

//   request.onload = function() {
//     if (request.readyState === XMLHttpRequest.DONE) {
//       params.callback(request.response);
//     }
//   };
// };

const makeRequest = function(params) {
  const test = {
    url: params.path,
    type: 'GET',
    dataType: params.responseType || 'json',
    success: params.callback
  };
  $.ajax(test);
}

// const playAudio = function(url) {
//   makeRequest({
//     method: 'GET',
//     path: url,
//     responseType: 'arraybuffer',
//     callback: function(response) {
//       // const context = new AudioContext(),
//       //   undecodedAudio = response;


//       // context.decodeAudioData(undecodedAudio, function(buffer) {
//       //   const sourceBuffer = context.createBufferSource();
//       //   sourceBuffer.buffer = buffer;
//       //   sourceBuffer.connect(context.destination);
//       //   sourceBuffer.start(context.currentTime);
//       // });
//     }
//   });
// };


$('#trumpMe').on('click', () => {
  makeRequest({
    method: 'GET',
    path: 'trumpism',
    callback: function(response) {
      const quote = new Quote(response.quote);
      quote.playQuote();
      debugger;
      // playAudio(response.quote.audio);
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
