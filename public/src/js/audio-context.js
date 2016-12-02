let AudioContextInstance;

if (window.AudioContext) {
  AudioContextInstance = new window.AudioContext();
  AudioContextInstance._implementation_ = 'standard';
} else if (window.webkitAudioContext) {
  AudioContextInstance = new window.webkitAudioContext();
  AudioContextInstance._implementation_ = 'webkit';
} else {
  AudioContextInstance = null;
  alert("Oops. Audio is not gonna work because you're using an old browser");
}

export default AudioContextInstance;