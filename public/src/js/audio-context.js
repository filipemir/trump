let AudioContextInstance;

if (window.AudioContext) {
  AudioContextInstance = new window.AudioContext();
  AudioContextInstance._implementation_ = 'standard';
} else if (window.webkitAudioContext) {
  AudioContextInstance = new window.webkitAudioContext();
  AudioContextInstance._implementation_ = 'webkit';
} else {
  AudioContextInstance = null;
  // TODO: Update the alerting for outdated browsers to not use an alert
  alert("Oops. Audio is not gonna work because you're using an old browser");
}

export default AudioContextInstance;