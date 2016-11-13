import Session from './session';
import $ from 'jquery';
import Audio from './audio';

const session = Session.create();

session.displayOpeningText();


$('#banner').on('click touchend', () => {
  Audio.unmute();
  session.newQuote();
})

$(window).on('keydown', (event) => {
  if (event.keyCode == 32) {
    session.newQuote();
  }
})


