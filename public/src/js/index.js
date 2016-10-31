import $ from 'jquery';
import Session from './session';

const session = Session.create();

session.displayOpeningText();

$('#banner').on('mousedown keydown touchstart', () => {
  session.newQuote();
});


