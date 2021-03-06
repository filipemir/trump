import $ from 'jquery';
import qs from 'query-string';
import loadGoogleAnalytics from './ga';
import Quote from './quote';
import Social from './social';
import VisualEffects from './visual-effects';
import QUOTES from '../quotes';

export default class Session {
    /**
     * Static method used to create and initialize a new session.
     *
     * @return {Session}
     */
    static initialize() {
        const s = new Session(),
            pageElements = {
                audio: $('audio'),
                button: $('#button'),
                face: $('#face'),
                hoverableElements: $('#button, .social-icon, #text'),
                social: $('#social'),
                text: $('#text'),
                twitter: $('#twitter-link'),
                window: $(window)
            };

        s.pageElements = pageElements;
        s.visuals = VisualEffects.setup(pageElements);
        s.loadQuotes().setupListeners();
        s.social = Social.setup(pageElements);
        loadGoogleAnalytics();

        return s;
    }

    /**
     * Creates a new Session instance
     *
     * @constructor
     */
    constructor() {
        /**
         * Object that stores the static page elements to be used throughout
         * the various functions. Page elements are expected to be jQuery
         * elements
         *
         * @property {Object}
         */
        this.pageElements = {};

        /**
         * Reference to the class that controls the functionality of the
         * sharing buttons
         *
         * @property {Social}
         */
        this.social = null;

        /**
         * Reference to the class that controls the visual effects and the
         * associated listeners
         *
         * @property {VisualEffects}
         */
        this.visuals = null;

        /**
         * Quote objects created from static data
         *
         * @private
         * @property {{ [string]: Quote }}
         */
        this._quotes = {};

        /**
         * Ids of quotes in {@link #_quotes}
         *
         * @type {Set<string>}
         * @private
         */
        this._unplayedQuoteIds = new Set();

        /**
         * Quote currently active
         *
         * @private
         * @property {Quote}
         */
        this._presentQuote = null;

        /**
         * Number of present round (i.e. how many quotes have been loaded)
         *
         * @private
         * @property {Number}
         */
        this._round = 0;
    }

    /**
     * Loads all the quotes into memory
     *
     * @chainable
     */
    loadQuotes() {
        const quotes = this._quotes ? this._quotes : [];

        for (const [id, quote] of Object.entries(QUOTES)) {
            const audioTag = this.pageElements.audio[0],
                newQuote = new Quote({ ...quote, id, audioTag });

            quotes[id] = newQuote;
        }

        this._quotes = quotes;
        this._resetUnplayedQuotes();

        return this;
    }

    /**
     * Function for requesting a new quote. This is the function that
     * starts the process whenever the user clicks the button or otherwise
     * requests a new quote
     *
     * @chainable
     */
    newQuote() {
        this._round++;
        let quoteId;

        if (this._round === 1) {
            quoteId = this._getFirstQuoteId();
            this._firstQuoteSetup();
        }

        this.visuals.glowFaceTillPlay();
        this._playQuote(quoteId);

        return this;
    }

    /**
     * Setup the listeners that monitor for requests from the user for new quotes
     *
     * @chainable
     */
    setupListeners() {
        // On button click:
        this.pageElements.button.on('click', () => {
            this.newQuote();
        });

        // On click of the page title, which is the text when the page loads:
        $('#text.first-round').one('click', () => {
            this.newQuote();
        });

        // On pressing the space bar:
        $(window).on('keydown', () => {
            if (event.keyCode === 32) {
                this.newQuote();
            }
        });

        return this;
    }

    // -------------------------------------------------------------------------------------- //

    /**
     * Function that takes care of all the work that happens when the user first
     * requests a new quote (e.g. first button click)
     *
     * @chainable
     */
    _firstQuoteSetup() {
        this.pageElements.button.removeClass('unclicked');
        this.visuals.bounceInSocialButtons();

        this.pageElements.text
            .removeClass('first-round')
            .off('click')
            .on('click', () => {
                window.open(this._presentQuote.sourceUrl, 'blank');
            });

        return this;
    }

    /**
     * Loads a quote from the quote stash to present quote and makes a
     * request for a new quote to add to the stash
     *
     * @param [quoteId] {string}
     * @chainable
     */
    _loadQuote(quoteId) {
        if (this._unplayedQuoteIds.size === 0) {
            this._resetUnplayedQuotes();
        }

        this._presentQuote = quoteId ? this._quotes[quoteId] : this._getRandomUnplayedQuote();
        this.social.update(this._presentQuote);

        return this;
    }

    /**
     * Returns a random quote object
     *
     * @returns {Quote}
     * @private
     */
    _getRandomUnplayedQuote() {
        const keyIndex = Math.floor(Math.random() * Math.floor(this._unplayedQuoteIds.size)),
            key = Array.from(this._unplayedQuoteIds)[keyIndex];

        return this._quotes[key];
    }

    /**
     * Plays present quote from the quote stash, if it hasn't been played,
     * or loads and plays a new one if it has.
     *
     * @param [quoteId] {string}
     * @chainable
     */
    _playQuote(quoteId) {
        if (!this._presentQuote || this._presentQuote.played) {
            this._loadQuote(quoteId);
        }

        const presentQuote = this._presentQuote;

        if (presentQuote) {
            presentQuote.play();
            this.visuals.displayTextOnPlay(presentQuote.text);
            this._updateUrl();
            this._unplayedQuoteIds.delete(presentQuote.id);
        }

        return this;
    }

    /**
     * Resets {@link #_unplayedQuoteIds} to include all ids in {@link #_quotes}
     *
     * @chainable
     */
    _resetUnplayedQuotes() {
        this._unplayedQuoteIds = new Set(Object.keys(this._quotes));
        return this;
    }

    /**
     * Updates URl to include the present quote id's in the query params
     *
     * @chainable
     */
    _updateUrl() {
        const { pathname } = window.document.location,
            { id } = this._presentQuote,
            existingParams = qs.parse(window.location.search),
            newParams = { ...existingParams, q: id };
        history.pushState(undefined, document.title, `${pathname}?${qs.stringify(newParams)}`);
        return this;
    }

    _getFirstQuoteId() {
        const queryParams = qs.parse(window.location.search),
            requestedQuoteId = queryParams['q'],
            requestedQuoteExists = requestedQuoteId && this._quotes[requestedQuoteId];

        return requestedQuoteExists ? requestedQuoteId : 'best_words';
    }
}
