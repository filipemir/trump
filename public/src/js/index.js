import $ from 'jquery';
import Session from './session';

const session = Session.create();

$('#background-image-holder').on("load", () => {
  $('#curtain').css('opacity', '0').css('visibility', 'hidden');
  session.displayOpeningText();
})

$('#banner').on('click', () => {
  session.newQuote();
});


