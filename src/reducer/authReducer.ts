import { SIGNED_IN, SIGNED_OUT, REFRESHED_TOKENS, SIGNED_UP } from "../actions/types"
import { authState } from "../reducerTypes/authTypes"

const initialState = {
  username: null,
  accessToken: null,
  refreshToken: null,
}

export default (state: authState = initialState, { type, payload }: any) => {
  switch (type) {

    case SIGNED_IN:
    case SIGNED_UP:
      return { username: payload.username, accessToken: payload.accessToken, refreshToken: payload.refreshToken }

    case SIGNED_OUT:
      return initialState

    case REFRESHED_TOKENS:
      return { ...state, accessToken: payload }

    default:
      return state
  }
}