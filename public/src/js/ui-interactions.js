import $ from 'jquery'

export default class UIInteractions {
  constructor() {
    this._audioTag = $('audio');
    this._button = $('#button');
    this._face = $('#face');
    this._hoverableElements = $('#button, .social-icon, #text');
  }

  faceGlowTilPlay() {
    this._startFaceGlow();
    this._audioTag.on('playing', this._stopFaceGlow);
  }

  startFaceGlow() {
    this._button.addClass('loading');
  }

  stopFaceGlow() {
    this._face.one('animationiteration', () => {
      this._button.removeClass('loading');
    })
  }

  makeElementsHoverable(selector) {
    this._hoverableElements.on('mouseover mouseout', function() {
      $(this).toggleClass('hover');
    })
  }

  pressButton() {
    this._button.toggleClass('active');
  }

  makeButtonPressable() {
    this._button.on('mousedown mouseup touchstart touchend', this.pressButton);
  }
}
