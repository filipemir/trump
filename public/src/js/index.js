import Session from './session';

const session = Session.create();

session.displayText('Shit Trump Says');

document.getElementById('button').addEventListener('click', () => {
  session.newQuote();
})

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 32) {
    session.newQuote();
  }
})
