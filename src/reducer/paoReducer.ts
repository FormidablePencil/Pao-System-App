import { NEW_PAO_LIST, ADD_TO_PAO_LIST, UPDATE_PAO_LIST, DELETE_PAO_LIST, DELETE_PAO_DOC, FETCHED_PAOLIST } from "../actions/types"
import { PaoReducer, PaoState } from "../reducerTypes/paoTypes"

const initialState: any = [
]

export default (state: PaoState = initialState, { type, payload }: any) => {
  switch (type) {

    case NEW_PAO_LIST:
      return payload

    case FETCHED_PAOLIST:
      return payload

    case ADD_TO_PAO_LIST:
      return { ...state, ...payload }

    case UPDATE_PAO_LIST:
      return {
        ...state,
        [payload.index]:
          state[payload.index],
        ...payload[payload.index] as {}
      }

    case DELETE_PAO_LIST:
      return initialState

    case DELETE_PAO_DOC:
      return state.list.filter((doc: any) => doc !== payload.deletedDocId)

    default:
      return state
  }
}
