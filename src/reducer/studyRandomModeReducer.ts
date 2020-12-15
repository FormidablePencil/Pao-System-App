import { FLIP_STUDY_RANDOM_MODE_CARDS, TOGGLE_STUDY_RANDOM_MODE } from "../actions/types"
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

    case TOGGLE_STUDY_RANDOM_MODE:
      const { person, action, object } = randomlyGeneratedPaoList({ pao: payload })
      return {
        isRandomStudyMode: !state.isRandomStudyMode,
        person, action, object
      }

    case FLIP_STUDY_RANDOM_MODE_CARDS:
      return { ...state, isFlipped: !state.isFlipped }

    default:
      return state
  }
}
