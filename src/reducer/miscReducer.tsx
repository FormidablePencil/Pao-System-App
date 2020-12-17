import { SET_PAO_TABLE_ROW_HEIGHT } from "../actions/types"

export interface MiscT { paoTableRowHeight: number }

const initialState: MiscT = {
  paoTableRowHeight: 0
}

export default (state: MiscT = initialState, { type, payload }) => {
  switch (type) {

    case SET_PAO_TABLE_ROW_HEIGHT:
      return { ...state, paoTableRowHeight: payload }

    default:
      return state
  }
}
