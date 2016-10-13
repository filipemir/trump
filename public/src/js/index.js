import $ from 'jquery';
import _ from 'lodash';
import Quote from './quote';

const makeRequest = function(params) {
  const test = {
    url: params.path,
    type: 'GET',
    data: params.data,
    dataType: params.responseType || 'json',
    success: params.callback
  };
  $.ajax(test);
};

const quotes = [];
makeRequest({
  method: 'GET',
  path: 'trumpism',
  data: {
    num: 10
  },
  callback: function(response, status, jqXHR) {
    _.forEach(response, (responseItems) => {
      quotes.push(Quote.create(responseItems));
    });
  }
});

$('#trumpMe').on('click', () => {
  const quote = quotes.shift();

  if (quote) {
    quote.play();
  }
});
