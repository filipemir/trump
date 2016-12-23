import Session from './session';
import $ from 'jquery';

// import uiInteractions from './ui-interactions';

const session = Session.create();

session.displayText('Shit Trump Says');


function startFaceGlow() {
  $('#button').addClass('loading');
}

// function endFaceGlow() {
//    $('#button').removeClass('loading');
// }

$('#button, #text.first-round').on('click', () => {
  startFaceGlow();
  session.newQuote();
  $('#text.first-round').off('click');
})

$(window).on('keydown', (event) => {
  if (event.keyCode == 32) {
    $('#button').addClass('active');
    session.newQuote();
    setTimeout(() => {
      $('#button').addClass('loading');
      $('#button').removeClass('active');
    }, 100)
  }
});


// Using native hover leaves button selected in mobile:
function makeElementsHoverable(selector) {
  $(selector).on('mouseover mouseout', function() {
    $(this).toggleClass('hover');
  })
}

makeElementsHoverable('#button, .social-icon, #text');

function depressButton() {
  $('#button').toggleClass('active');
}

$('#button').on('mousedown mouseup touchstart touchend', () => {
  depressButton();
})