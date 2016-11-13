import Session from './session';
import $ from 'jquery';

const session = Session.create();

session.displayOpeningText();


$('#banner').on('click touchend', () => {
  session.newQuote();
})

$(window).on('keydown', (event) => {
  if (event.keyCode == 32) {
    session.newQuote();
  }
})


