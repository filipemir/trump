import Session from './session';
import $ from 'jquery'

const session = Session.create();

session.displayText('Shit Trump Says');

$('#button, #text.first-round').on('click', () => {
  document.getElementById('button').className = 'loading';
  session.newQuote();
  $('#text.first-round').off('click');
})

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 32) {
    document.getElementById('button').className = 'active';
    session.newQuote();
    setTimeout(() => {
      document.getElementById('button').className = 'loading';
    }, 100)
  }
})

$('#button').on('mousedown touchstart', () => {
  $('#button').addClass('active');
})

$('#button').on('mouseup touchend', () => {
  $('#button').removeClass('active');
})

// Using native hover leaves button selected in mobile:
$('#button').on('mouseover', () => {
  $('#button').addClass('hover');
})

$('#button').on('mouseout', () => {
  $('#button').removeClass('hover');
})