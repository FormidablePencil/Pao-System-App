import { enumFabAction, fabOpt } from "../constants/fabConstants"
import { TOGGLE_EDIT_MODE, TOGGLE_FAB_VISIBILITY_FALSE, TOGGLE_FAB_VISIBILITY_TRUE } from "../actions/types"

export interface fabPropertiesT {
  fabVisibility
  screen
  config
  fabActionsProperties
  mainFabProperties
  keyword
}

const initialState = {
  fabVisibility: true,
  screen: null,
  config: { editMode: false, pagination: true },
  fabActionsProperties: null,
  mainFabProperties: null,
  keyword: enumFabAction.paoTableFabActions
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_EDIT_MODE:
      return { ...state, config: { ...state.config, editMode: !state.config.editMode } }

    case TOGGLE_FAB_VISIBILITY_FALSE:
      return { ...state, fabVisibility: false }

    case TOGGLE_FAB_VISIBILITY_TRUE:
      return { ...state, fabVisibility: true }

    default:
      return state
  }
}
