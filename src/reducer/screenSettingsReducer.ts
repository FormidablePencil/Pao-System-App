import { TOGGLE_CONFIGURATION_PAGINATION, TOGGLE_CONFIGURATION_EDIT_MODE, SAVE_CURRENT_SCREEN, TOGGLE_FAB_VISIBILITY, UPDATE_FAB_ACTION_PROPERTIES, UPDATE_MAIN_FAB_PROPERTIES, UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE } from "../actions/types"

const initialState = {
  fabVisibility: false,
  screen: null,
  config: { editMode: false, pagination: true },
  fabActionsProperties: null,
  mainFabProperties: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_FAB_VISIBILITY:
      return { ...state, fabVisibility: !state.fabVisibility }

    case SAVE_CURRENT_SCREEN:
      return { ...state, ...payload }

    case TOGGLE_CONFIGURATION_EDIT_MODE:
      return { ...state, config: { ...state.config, editMode: !state.config.editMode } }

    case TOGGLE_CONFIGURATION_PAGINATION:
      return { ...state, config: { ...state.config, pagination: !state.config.pagination } }

    case UPDATE_FAB_ACTION_PROPERTIES:
      return { ...state, fabActionsProperties: payload }

    case UPDATE_MAIN_FAB_PROPERTIES:
      return { ...state, mainFabProperties: payload }

    case UPDATE_MANY_SCREEN_CONFIGURATIONS_AT_ONCE:
      return {
        fabVisibility: payload.fabVisibility,
        screen: payload.screen,
        config: payload.config,
        fabActionsProperties: payload.fabActionsProperties,
        mainFabProperties: payload.mainFabProperties
      }

    default:
      return state
  }
}
