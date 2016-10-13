import $ from 'jquery';
import Session from './session';

const session = Session.create();

$('#trumpMe').on('click', () => {
  session.playAQuote();
});


