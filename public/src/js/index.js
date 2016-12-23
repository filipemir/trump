import Session from './session';
import $ from 'jquery';

import uiInteractions from './ui-interactions';

const session = Session.create(),
  ui = new uiInteractions();

session.displayText('Shit Trump Says');


// function endFaceGlow() {
//    $('#button').removeClass('loading');
// }

$('#button, #text.first-round').on('click', () => {
  ui.startFaceGlow();
  session.newQuote();
  $('#text.first-round').off('click');
})

$(window).on('keydown', (event) => {
  if (event.keyCode == 32) {
    $('#button').addClass('active');
    session.newQuote();
    setTimeout(() => {
      $('#button').addClass('loading');
      $('#button').removeClass('active');
    }, 100)
  }
});



ui.makeElementsHoverable('#button, .social-icon, #text');

ui.makeButtonPressable();