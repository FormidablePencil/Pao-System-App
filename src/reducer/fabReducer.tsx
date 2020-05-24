import { arrangmentOpt } from "./flashcardOptionsReducer"
import { tabScreens } from "../constants/constants"
import { enumFabAction, fabOpt } from "../constants/fabConstants"
import { PAOTABLE_SCREEN_SETTINGS, FLASHCARDS_SCREEN_SETTINGS, TOGGLE_EDIT_MODE } from "../actions/types"

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
      return state

    // case PAOTABLE_SCREEN_SETTINGS:
    //   return ({
    //     fabVisibility: true,
    //     screen: tabScreens.Paotable,
    //     config: { editMode: false, pagination: true, showHints: false }, //move to reducer 
    //     keyword: enumFabAction.paoTableFabActions,
    //     mainFabProperties: fabOpt.standby
    //   })
    //   break

    // case FLASHCARDS_SCREEN_SETTINGS:
    //   return ({
    //     fabVisibility: true,
    //     screen: tabScreens.Flashcards,
    //     config: { editMode: false, pagination: true, showHints: false },
    //     keyword: enumFabAction.flashcardFabActions,
    //     mainFabProperties: fabOpt.standby
    //   })
    //   break

    // case TOGGLE_EDIT_MODE:
    //   return { ...state, fabVisibility: !state.fabVisibility }

    default:
      return state
  }
}
