import { ADD_TO_FAV_LIST, DELETE_ID_FAV_LIST } from "../actions/types"

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ADD_TO_FAV_LIST:
    return { ...state, ...payload }
  case DELETE_ID_FAV_LIST:
    return { ...state, ...payload }

  default:
    return state
  }
}
