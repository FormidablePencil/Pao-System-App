import { TOGGLE_FAB_VISIBILITY_FALSE, TOGGLE_FAB_VISIBILITY_TRUE } from "../actions/types"

const initialState: boolean = false

export default (state = initialState, { type, payload }) => {
  switch (type) {

    // case TOGGLE_FAB_VISIBILITY_FALSE:
    //   return false
    // case TOGGLE_FAB_VISIBILITY_TRUE:
    //   return true

    default:
      return state
  }
}
