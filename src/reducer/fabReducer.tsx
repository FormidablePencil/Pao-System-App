import { enumFabAction, fabOpt } from "../constants/fabConstants"
import { TOGGLE_EDIT_MODE, TOGGLE_FAB_VISIBILITY_FALSE, TOGGLE_FAB_VISIBILITY_TRUE, TOGGLE_PAGINATION_MODE, TOGGLE_PAGINATION_MODE_FALSE, TOGGLE_PAGINATION_MODE_TRUE } from "../actions/types"

export interface fabPropertiesT {
  fabVisibility: boolean
  screen
  config: { editMode: boolean, pagination: boolean }
  fabActionsProperties
  mainFabProperties
  keyword: enumFabAction
}

const initialState = {
  fabVisibility: true,
  screen: null,
  config: { editMode: false, pagination: false },
  fabActionsProperties: null,
  mainFabProperties: null,
  keyword: enumFabAction.paoTableFabActions
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_EDIT_MODE:
      return { ...state, config: { ...state.config, editMode: !state.config.editMode } }

    case TOGGLE_PAGINATION_MODE:
      return { ...state, config: { ...state.config, pagination: !state.config.pagination } }

    case TOGGLE_PAGINATION_MODE_TRUE:
      return { ...state, config: { ...state.config, pagination: true } }
    case TOGGLE_PAGINATION_MODE_FALSE:
      return { ...state, config: { ...state.config, pagination: false } }

    case TOGGLE_FAB_VISIBILITY_FALSE:
      return { ...state, fabVisibility: false }

    case TOGGLE_FAB_VISIBILITY_TRUE:
      return { ...state, fabVisibility: true }

    default:
      return state
  }
}
