import required from "./required";
import fbAppId from "webpack-runtime-config/fbAppId";

export default class Social {
  static setup(pageElements = required()) {
    const s = new Social(pageElements);
    s._loadFBApi();

    return s;
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

  _fbShare() {
    const fbUiParams = {
      method: "share",
      href: "http://the-best-words.com/",
      hashtag: "#shittrumpsays",
      quote: `"${this._presentQuote.text}" - Donald J. Trump`,
      mobile_iframe: true
    };

    window.FB.ui(fbUiParams);
  }

  _generateTwitterUrl() {
    const baseUrl = "https://twitter.com/intent/tweet",
      text = this._presentQuote.text,
      textURI = encodeURIComponent(`"${text}" @realDonaldTrump`),
      urlURI = encodeURIComponent("http://the-best-words.com/"),
      hashtagsQuery = ["bestwords", "shittrumpsays"].join(","),
      href = `${baseUrl}?text=${textURI}&url=${urlURI}&hashtags=${hashtagsQuery}`;

    return href;
  }

  _loadFBApi() {
    const fbShare = this._fbShare.bind(this);
    /* eslint-disable */
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: fbAppId,
        xfbml: true,
        version: "v2.8"
      });
      this._pageElements.fb.on("click", fbShare);
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    /*eslint-enable */
  }

  _updateTwitterShare() {
    const twitter = this._pageElements.twitter,
      href = this._generateTwitterUrl();

    twitter.attr("href", href);
  }
}
