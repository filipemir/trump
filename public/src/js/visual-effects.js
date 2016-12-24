import $ from 'jquery'

export default class VisualEffects {
  static setup() {
    const visuals = new VisualEffects();

    visuals.displayText('Shit Trump Says')
    visuals._enableHoverables();
    visuals._makeButtonPressable();
    visuals._makeSpaceBarPressable();

    return visuals;
  }

  constructor() {
    this._audioTag = $('audio');
    this._button = $('#button');
    this._face = $('#face');
    this._hoverableElements = $('#button, .social-icon, #text');
    this._text = $('#text');
    this._window = $(window);
  }

  glowFaceTillPlay() {
    this._changeButtonLoadingState(true);
    this._audioTag.one('playing', () => {
      this._stopFaceGlow();
    });
  }

  displayText(text) {
    const html = this._getTextHtml(text);

    this._hideTextTemporarily(100)
      .empty()
      .append(html);

    this._removeWordDelayOnHover();

    return this
  }

  displayTextOnPlay(text) {
    this._audioTag.one('playing', () => {
      this.displayText(text);
    });
  }

  // ---------------------------------------------------------------------- //

  _changeButtonActiveState() {
    this._button.toggleClass('active');
  }

  _changeButtonLoadingState(turnOn = null) {
    this._button.toggleClass('loading', turnOn);
  }

  _enableHoverables() {
    this._hoverableElements.on('mouseover', function() {
      $(this).toggleClass('hover', true);
    })

    this._hoverableElements.on('mouseout', function() {
      $(this).toggleClass('hover', false);
    })
  }

  _getTextHtml(text){
    const words = text.split(' '),
      wordCount = words.length;
    let html = '';

    for (let i = 0; i < wordCount; i++) {
      const word = words[i],
        delay = i * 1/wordCount;

      html += `<span class="word" style="transition-delay: ${delay}s;">${word}</span>`;
    }

    return html;
  }

  _hideTextTemporarily(time) {
    this._text.addClass('intro');

    setTimeout(() => {
      this._text.removeClass('intro');
    }, time);

    return this._text;
  }

  _makeButtonPressable() {
    this._button.on('mousedown mouseup touchstart touchend', () => {
      this._changeButtonActiveState();
    });
  }

  _makeSpaceBarPressable() {
    this._window.on('keydown keyup', (event) => {
      if (event.keyCode === 32) {
        this._changeButtonActiveState();
      }
    })
  }

  _removeWordDelayOnHover() {
    this._text.one('mouseenter touchstart', () => {
      $('.word').css('transition-delay', '0s');
    })
  }

  _stopFaceGlow() {
    this._face.one('animationiteration', () => {
      setTimeout(this._changeButtonLoadingState(false), 500)
    })
  }
}
