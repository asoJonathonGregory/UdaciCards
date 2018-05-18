import * as api from "../utils/api";

export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

function fetchDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    };
}

function fetchDeck(deck) {
    return {
        type: GET_DECK,
        deck
    };
}

function saveDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}

function saveCard(card, title) {
    return {
        type: ADD_CARD,
        card,
        title
    };
}

export const getDecks = () => dispatch => {
    api.getDecks().then(decks => dispatch(fetchDecks(decks)));
};

export const getDeck = title => dispatch => {
    api.getDeck(title).then(deck => dispatch(fetchDeck(deck)));
};

export const saveDeckTitle = deckTitle => dispatch => {
    api.saveDeckTitle(deckTitle).then(deck => dispatch(saveDeck(deck)));
};

export const saveNewCard = (card, title) => dispatch => {
    api.addCardToDeck(card, title).then(() => dispatch(saveCard(card, title)));
};
