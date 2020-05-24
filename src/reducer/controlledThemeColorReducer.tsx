import { RESET_CONTROLLED_THEME_COLOR, SAVE_CONTROLLED_THEME_COLOR } from "../actions/types"

const initialState = null
//controlledThemeColor, setControlledThemeColor
export default (state = initialState, { type, payload }) => {
  switch (type) {

    case SAVE_CONTROLLED_THEME_COLOR:
      return payload

    case RESET_CONTROLLED_THEME_COLOR:
      return initialState

    default:
      return state
  }
}
