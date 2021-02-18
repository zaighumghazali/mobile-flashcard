import AsyncStorage from '@react-native-community/async-storage'
import { call } from 'react-native-reanimated'
export const DECK_STORAGE_KEY = 'MobileFlashCard:Decks'

export function fetchAllDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function submitAddDeck(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]:{
            title: title,
            questions:[]
        }
    }))
}
export function submitAddCard(title, card) {
    AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const allDecks = JSON.parse(results)
        const questions = allDecks[title].questions.concat(card)
        return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title]:{
                title: title,
                questions: questions
            }
        }))
    }) 
}