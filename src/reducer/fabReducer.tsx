import { arrangmentOpt } from "./flashcardOptionsReducer"
import { tabScreens } from "../constants/constants"
import { enumFabAction, fabOpt } from "../constants/fabConstants"
import { PAOTABLE_SCREEN_SETTINGS, FLASHCARDS_SCREEN_SETTINGS, TOGGLE_EDIT_MODE } from "../actions/types"


const initialState = {
  fabVisibility: true,
  screen: null,
  config: { editMode: null, pagination: true },
  fabActionsProperties: null,
  mainFabProperties: null,
  keyword: 'sharedFabActions'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case PAOTABLE_SCREEN_SETTINGS:
      return ({
        fabVisibility: true,
        screen: tabScreens.Paotable,
        config: { editMode: false, pagination: true, showHints: false }, //move to reducer 
        keyword: enumFabAction.sharedFabActions,
        mainFabProperties: fabOpt.standby
      })
      break

    case FLASHCARDS_SCREEN_SETTINGS:
      return ({
        fabVisibility: true,
        screen: tabScreens.Flashcards,
        config: { editMode: false, pagination: true, showHints: false },
        keyword: enumFabAction.sharedFabActions,
        mainFabProperties: fabOpt.standby
      })
      break
      
      case TOGGLE_EDIT_MODE:
        return { ...state, fabVisibility: !state.fabVisibility }
  
    default:
      return state
  }
}
