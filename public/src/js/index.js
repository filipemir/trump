import Session from './session';
import $ from 'jquery';

const session = Session.setup();

$('#text.first-round').on('click', () => {
  session.newQuote();
})

$('#button').on('click', () => {
  session.newQuote();
})

$(window).on('keydown', () => {
  if (event.keyCode === 32) {
    session.newQuote();
  }
})