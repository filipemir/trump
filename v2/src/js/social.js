export default class Social {
  static setup(pageElements = required()) {
    return new Social(pageElements);
  }

  constructor(pageElements = required()) {
    this._presentQuote = null;
    this._pageElements = pageElements;
  }

  update(newQuote) {
    this._presentQuote = newQuote;
    this._updateTwitterShare();
  }

  // -------------------------------------------------------------------------------------- //

  _generateTwitterUrl() {
    const baseUrl = "https://twitter.com/intent/tweet",
      text = this._presentQuote.text,
      textURI = encodeURIComponent(`"${text}" @realDonaldTrump`),
      urlURI = encodeURIComponent(SITE_URL),
      hashtagsQuery = ["bestwords", "shittrumpsays"].join(","),
      href = `${baseUrl}?text=${textURI}&url=${urlURI}&hashtags=${hashtagsQuery}`;

    return href;
  }

  _updateTwitterShare() {
    const twitter = this._pageElements.twitter,
      href = this._generateTwitterUrl();

    twitter.attr("href", href);
  }
}
