import Session from './session';

const session = Session.create();

session.displayText('Shit Trump Says');

document.getElementById('button').addEventListener('click', () => {
  document.getElementById('button').className = 'loading';
  session.newQuote();
})

window.addEventListener('keydown', (event) => {
  document.getElementById('button').className = 'loading';
  if (event.keyCode == 32) {
    session.newQuote();
  }
})
