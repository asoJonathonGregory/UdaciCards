import { GET_DECKS, GET_DECK, ADD_DECK, ADD_CARD } from "../actions";

const initialState = {};

export default function decks(state = initialState, action) {
    const { decks, deck, card, title } = action;
    switch (action.type) {
        case GET_DECKS:
            return decks;

        case GET_DECK:
            return deck;

        case ADD_DECK:
            console.log(deck);
            return {
                ...state,
                [deck.title]: deck
            };

        case ADD_CARD:
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title].questions, card]
                }
            };
    }
}
