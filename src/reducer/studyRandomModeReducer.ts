import {
  FLIP_STUDY_RANDOM_MODE_CARDS,
  FLIP_STUDY_RANDOM_MODE_CARDS_FALSE,
  FLIP_STUDY_RANDOM_MODE_CARDS_TRUE,
  TOGGLE_STUDY_RANDOM_MODE,
  TOGGLE_STUDY_RANDOM_MODE_TRUE,
  TOGGLE_STUDY_RANDOM_MODE_FALSE,
} from "../actions/types"
import randomlyGeneratedPaoList from "../screens/flashcard-screen/functions/randomlyGeneratedPaoList";

export interface StudyRandomModeT {
  isFlipped: boolean
  isRandomStudyMode: boolean
  person: StudyRandomListItemT[]
  action: StudyRandomListItemT[]
  object: StudyRandomListItemT[]
}

interface StudyRandomListItemT {
  item: string
  number: number
}

const initialState = {
  isFlipped: false,
  isRandomStudyMode: true,
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
      const { person, action, object } = randomlyGeneratedPaoList({ pao: payload })
      return {
        isRandomStudyMode: type === TOGGLE_STUDY_RANDOM_MODE_TRUE ? true : !state.isRandomStudyMode,
        person, action, object
      }

    case FLIP_STUDY_RANDOM_MODE_CARDS:
      return { ...state, isFlipped: !state.isFlipped }
    case FLIP_STUDY_RANDOM_MODE_CARDS_TRUE:
      return { ...state, isFlipped: true }
    case FLIP_STUDY_RANDOM_MODE_CARDS_FALSE:
      return { ...state, isFlipped: false }
    default:
      return state
  }
}
