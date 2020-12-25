//~ true means front side and false means back

import {
  SET_AUTO_PLAY_DURATION,
  TOGGLE_AUTO_PLAY_DURATION,
  UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE,
  SAVED_FLASHCARD_SETTINGS_FROM_MODAL,
  UPDATE_FLASHCARD_ORDER,
} from '../actions/types'

export enum arrangmentOpt {
  ascending,
  descending,
  random,
  sorted,
}

export interface FlashcardSettingsTypes {
  flashcardItemDisplayedFront: {
    [index: number]: {
      [index: string]: boolean
    }
  }
  autoPlayFlashcards: {
    play: boolean
    duration: number
  }
  flashcardOrder: arrangmentOpt
}

const initialState: FlashcardSettingsTypes = {
  flashcardItemDisplayedFront: [
    { number: true },
    { person: true },
    { action: true },
    { object: false },
  ],
  autoPlayFlashcards: { play: false, duration: 5 },
  flashcardOrder: arrangmentOpt.sorted,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTO_PLAY_DURATION:
      return {
        ...state,
        autoPlayFlashcards: {
          ...state.autoPlayFlashcards,
          duration: payload,
        },
      }

    case TOGGLE_AUTO_PLAY_DURATION:
      return {
        ...state,
        autoPlayFlashcards: {
          ...state.autoPlayFlashcards,
          play: !state.autoPlayFlashcards.play,
        },
      }

    case UPDATE_FLASHCARD_ORDER:
      return {
        ...state,
        flashcardOrder: payload,
      }

    case UPDATE_FLASHCARD_ITEM_DISPLAY_ON_WHAT_SIDE:
    case SAVED_FLASHCARD_SETTINGS_FROM_MODAL:
      return payload

    default:
      return state
  }
}

// const [flashcardItemDisplayedFront, setflashcardItemDisplayedFront] = useState([
//   { number: true },
//   { person: false },
//   { action: false },
//   { object: false },
// ])
// const [autoPlayFlashcards, setautoPlayFlashcards] = useState( { play: false, duration: 5 } ) //rename to flashcard related
