import $ from 'jquery'

export default class VisualEffects {

  static setup(args) {
    const visuals = new VisualEffects(args);

    visuals.displayText('Shit Trump Says')
    visuals._enableHoverables();
    visuals._makeButtonPressable();
    visuals._makeSpaceBarPressable();

    return visuals;
  }

  constructor({ audio, button, face, hoverableElements, social, text, window }) {
    this._audio = audio;
    this._button = button;
    this._face = face;
    this._hoverableElements = hoverableElements;
    this._social = social;
    this._text = text;
    this._window = window;
  }

  bounceInSocialButtons() {
    this._audio.one('playing', () => {
      this._social.removeClass('hidden');
      this._social.addClass('bounce-in-up');
    });
  }

  glowFaceTillPlay() {
    this._changeButtonLoadingState(true);
    this._audio.one('playing', () => {
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
    this._audio.one('playing', () => {
      this.displayText(text);
    });
  }

  // ---------------------------------------------------------------------- //

  _changeButtonActiveState(turnOn = null) {
    this._button.toggleClass('active', turnOn);
  }

  _changeButtonLoadingState(turnOn = null) {
    this._button.toggleClass('loading', turnOn);
  }

  _enableHoverables() {
    this._hoverableElements.on('mouseover touchstart', function() {
      $(this).toggleClass('hover', true);
    })

    this._hoverableElements.on('mouseout', function() {
      $(this).toggleClass('hover', false);
    })

    this._hoverableElements.on('touchend', function() {
      const test = () => {
        $(this).toggleClass('hover', false);
      }
      setTimeout(test, 100);
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
    this._button.on('mousedown touchstart', () => {
      this._changeButtonActiveState(true);
    });

    this._button.on('mouseup touchend', () => {
      this._changeButtonActiveState(false);
    });
  }

  _makeSpaceBarPressable() {
    this._window.on('keydown keyup', (event) => {
      if (event.keyCode === 32) {
        // event.preventDefault();
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
