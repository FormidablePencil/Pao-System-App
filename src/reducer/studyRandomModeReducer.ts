import {
  FLIP_STUDY_RANDOM_MODE_CARDS,
  FLIP_STUDY_RANDOM_MODE_CARDS_FALSE,
  FLIP_STUDY_RANDOM_MODE_CARDS_TRUE,
  TOGGLE_STUDY_RANDOM_MODE,
  TOGGLE_STUDY_RANDOM_MODE_TRUE,
  TOGGLE_STUDY_RANDOM_MODE_FALSE,
  ROW_TO_DISPLAY_TRUE,
  ROW_TO_DISPLAY_FALSE,
  DISPLAY_NUMBERS_IN_FRONT_FALSE,
  DISPLAY_NUMBERS_IN_FRONT_TRUE,
  SET_STUDY_RANDOM_AMOUNT,
} from "../actions/types"
import randomlyGeneratedPaoList from "../screens/flashcard-screen/functions/randomlyGeneratedPaoList";

export interface StudyRandomModeT {
  isFlipped: boolean
  isRandomStudyMode: boolean
  toggleRow: boolean
  displayNumberInFront: boolean
  studyAmount: number
  person: StudyRandomListItemT[]
  action: StudyRandomListItemT[]
  object: StudyRandomListItemT[]
}

interface StudyRandomListItemT {
  item: string
  number: number
}

const initialState: StudyRandomModeT = {
  isFlipped: false,
  isRandomStudyMode: true,
  toggleRow: false,
  displayNumberInFront: false,
  studyAmount: 100,
  person: [],
  action: [],
  object: [],
}

export default (state: StudyRandomModeT = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_STUDY_RANDOM_MODE_FALSE:
      return { ...state, isRandomStudyMode: false, }
    case TOGGLE_STUDY_RANDOM_MODE_TRUE:
    case TOGGLE_STUDY_RANDOM_MODE:
      const { person, action, object } = randomlyGeneratedPaoList({ pao: payload, studyAmount: state.studyAmount })
      return {
        ...state,
        isRandomStudyMode: type === TOGGLE_STUDY_RANDOM_MODE_TRUE ? true : !state.isRandomStudyMode,
        person, action, object
      }

    case FLIP_STUDY_RANDOM_MODE_CARDS:
      return { ...state, isFlipped: !state.isFlipped }
    case FLIP_STUDY_RANDOM_MODE_CARDS_TRUE:
      return { ...state, isFlipped: true }
    case FLIP_STUDY_RANDOM_MODE_CARDS_FALSE:
      return { ...state, isFlipped: false }

    case ROW_TO_DISPLAY_TRUE:
      return { ...state, toggleRow: true }
    case ROW_TO_DISPLAY_FALSE:
      return { ...state, toggleRow: false }

    case DISPLAY_NUMBERS_IN_FRONT_TRUE:
      return { ...state, displayNumberInFront: true }
    case DISPLAY_NUMBERS_IN_FRONT_FALSE:
      return { ...state, displayNumberInFront: false }

    case SET_STUDY_RANDOM_AMOUNT:
      return { ...state, studyAmount: payload }


    default:
      return state
  }
}
