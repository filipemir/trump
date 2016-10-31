import Session from './session';

const session = Session.create();

session.displayOpeningText();

const banner = document.getElementById('banner');

banner.addEventListener('keydown', () => {
  session.newQuote();
})


