import Session from './session';

const session = Session.create();

session.displayOpeningText();

const banner = document.getElementById('banner');

banner.addEventListener('mousedown', () => {
  session.newQuote();
})

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 32) {
    session.newQuote();
  }
})


