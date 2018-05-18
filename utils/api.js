import { AsyncStorage } from "react-native";

const FLASHCARD_STORAGE_KEY = "UdaciCards:Decks";

export const getDecks = () => {
    return AsyncStorage.getItem(
        FLASHCARD_STORAGE_KEY,
        (error, string) => (string ? string : undefined)
    ).then(string => JSON.parse(string));
};

export const getDeck = title => {
    return AsyncStorage.getItem(
        FLASHCARD_STORAGE_KEY[title],
        (error, string) => (string ? string : undefined)
    ).then(string => JSON.parse(string));
};

export const saveDeckTitle = title => {
    /**
     * For the newDeckObject to work with the store,
     * the format has to be different than it is when
     * merging with Async Storage
     */
    const newDeckObj = {
        [title]: {
            title: title,
            questions: []
        }
    };
    const newDeck = newDeckObj[title];
    return AsyncStorage.mergeItem(
        FLASHCARD_STORAGE_KEY,
        JSON.stringify(newDeckObj)
    ).then(() => newDeck);
};

export const addCardToDeck = (card, title) => {
    return AsyncStorage.getItem(
        FLASHCARD_STORAGE_KEY,
        (error, string) => (string ? string : undefined)
    )
        .then(string => JSON.parse(string))
        .then(string => {
            string[title].questions.push(card);
            return AsyncStorage.mergeItem(
                FLASHCARD_STORAGE_KEY,
                JSON.stringify(string)
            );
        })
        .then(() => card);
};
