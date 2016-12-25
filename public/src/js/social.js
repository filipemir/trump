function _getTwitterUrl(text = '', hashtags = ['bestwords', 'shittrumpsays']) {
  const baseUrl = 'https://twitter.com/intent/tweet',
    textURI = encodeURIComponent(`"${text}" @realDonaldTrump`),
    urlURI = encodeURIComponent('http://www.test.io/'),
    hashtagsQuery = hashtags.join(','),
    href = `${baseUrl}?text=${textURI}&url=${urlURI}&hashtags=${hashtagsQuery}`;

  return href;
}

function updateTwitterButton(text) {
  const button = window.document.querySelectorAll('#twitter-link')[0],
    href = _getTwitterUrl(text);

  button.setAttribute('href', href);
}

export { updateTwitterButton };