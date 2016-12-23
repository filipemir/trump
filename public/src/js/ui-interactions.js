import $ from 'jquery'

export default class UIInteractions {
  constructor() {
    this._audioTag = $('audio');
    this._button = $('#button');
    this._face = $('#face');
    this._hoverableElements = $('#button, .social-icon, #text');
  }

  startFaceGlow() {
    this._button.addClass('loading');
  }

  stopFaceGlow() {
    this._face.one('animationiteration', () => {
      this._button.removeClass('loading');
    })
  }

  glowFaceWhileLoading() {
    this._startFaceGlow();

    this._audioTag.on('playing', this._stopFaceGlow);
  }

  makeElementsHoverable(selector) {
    this._hoverableElements.on('mouseover mouseout', function() {
      $(this).toggleClass('hover');
    })
  }
}
