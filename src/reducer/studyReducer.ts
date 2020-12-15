import { STUDY_MODE_TOGGLE, STUDY_MODE_TOGGLE_OFF, REMOVE_ITEM_FROM_STUDY, ADD_ITEM_TO_STUDY, ADD_OR_REMOVE_ITEM_STUDY, STUDY_MODE_TRUE, STUDY_MODE_FALSE } from "../actions/types"

export interface listItemsT {
  number: number
  item: string
}

export interface StudyModeT {
  study: boolean
  currentStudyCard: null | number
  list: []
  // paoStudySets: {
  //   person: listItemsT[]
  //   action: listItemsT[]
  //   object: listItemsT[]
  // }
}
const initialState: StudyModeT = {
  study: false,
  currentStudyCard: null,
  list: []
  // paoStudySets: {
  //   person: [],
  //   action: [],
  //   object: [],
  // }
}
export default (state: StudyModeT = initialState, { type, payload }) => {
  switch (type) {

    case STUDY_MODE_TOGGLE:
      return { ...state, study: !state.study } //generated random pao
    case STUDY_MODE_TRUE:
      return { ...state, study: true }
    case STUDY_MODE_FALSE:
      return { ...state, study: false }

    case ADD_ITEM_TO_STUDY:
      return { ...state, list: [...state.list, payload] }
    case REMOVE_ITEM_FROM_STUDY:
      return { ...state, list: state.list.filter(paoNum => paoNum !== payload) }
    case ADD_OR_REMOVE_ITEM_STUDY:
      if (state.list.filter(paoNum => paoNum === payload).length)
        return { ...state, list: state.list.filter(paoNum => paoNum !== payload) }
      else
        return { ...state, list: [...state.list, payload] }

    // case CURRENT_STUDY_CARD: 
    //   return { ...state, currentStudyCard: payload }
    // case GENERATED_STUDY_SETS:
    //   return { ...state, paoStudySets: payload }
    // case DELETE_STUDY_SETS:
    //   return { ...state, paoStudySets: [] }
    // case STUDY_MODE_TOGGLE_OFF:
    //   return { ...state, study: false }

    default:
      return state
  }
}
