import {
  KEYBOARD_PRESENT_FALSE,
  KEYBOARD_PRESENT_TRUE,
  SET_PAO_TABLE_ROW_HEIGHT,
} from '../actions/types'

export interface MiscT {
  paoTableRowHeight: number
  keyboardPresent: boolean
}

const initialState: MiscT = {
  paoTableRowHeight: 0,
  keyboardPresent: false,
}

export default (state: MiscT = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAO_TABLE_ROW_HEIGHT:
      return { ...state, paoTableRowHeight: payload }

    case KEYBOARD_PRESENT_TRUE:
      return { ...state, keyboardPresent: true }
    case KEYBOARD_PRESENT_FALSE:
      return { ...state, keyboardPresent: false }

    default:
      return state
  }
}
