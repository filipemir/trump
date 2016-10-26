import $ from 'jquery';
import Session from './session';

const session = Session.create();

$('#banner').on('click', () => {
  session.newQuote();
});


