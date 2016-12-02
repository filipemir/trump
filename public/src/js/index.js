import Session from './session';

const session = Session.create();

session.displayQuote('Shit Trump Says');

document.getElementById('banner').addEventListener('click', () => {
  session.newQuote();
})

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 32) {
    session.newQuote();
  }
})


