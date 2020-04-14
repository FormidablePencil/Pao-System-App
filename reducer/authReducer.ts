import { SIGNED_IN, SIGNED_OUT, REFRESHED_TOKENS } from "../actions/types"
import { AuthReducer, authState } from "../reducerTypes/authTypes"

const initialState = {
  username: undefined,
  accessToken: undefined,
  refreshToken: undefined,
}

export default (state: authState = initialState, { type, payload }: AuthReducer) => {
  switch (type) {

    case SIGNED_IN:
      return payload

    case SIGNED_OUT:
      return initialState

    case REFRESHED_TOKENS:
      return { ...state, ...payload.refreshToken as {} }

    default:
      return state
  }
}