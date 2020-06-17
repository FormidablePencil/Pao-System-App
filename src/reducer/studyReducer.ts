import { STUDY_MODE_TOGGLE, CURRENT_STUDY_CARD, GENERATED_STUDY_SETS, DELETE_STUDY_SETS, STUDY_MODE_TOGGLE_OFF } from "../actions/types"

export interface listItemsT {
    number: number
    item: string
}

export interface StudyModeT {
  study: boolean
  currentStudyCard: null | number
  paoStudySets: {
    person: listItemsT[]
    action: listItemsT[]
    object: listItemsT[]
  }
}
const initialState: StudyModeT = {
  study: false,
  currentStudyCard: null,
  paoStudySets: {
    person: [],
    action: [],
    object: [],
  }
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STUDY_MODE_TOGGLE:
      return { ...state, study: !state.study, paoStudySets: payload } //generated random pao
    case CURRENT_STUDY_CARD: //* this is what tells the pao tables which ones were already seen
      return { ...state, currentStudyCard: payload }
    case GENERATED_STUDY_SETS:
      return { ...state, paoStudySets: payload }
    case DELETE_STUDY_SETS:
      return { ...state, paoStudySets: [] }
    case STUDY_MODE_TOGGLE_OFF:
      return { ...state, study: false }

    default:
      return state
  }
}
