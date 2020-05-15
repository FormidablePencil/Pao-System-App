import { NEW_PAO_LIST, ADD_TO_PAO_LIST, UPDATE_PAO_LIST, DELETE_PAO_LIST, DELETE_PAO_DOC, FETCHED_PAOLIST, UPDATE_SPECIFIC_PAO_COLLECION } from "../actions/types"
import { PaoReducer, PaoState } from "../reducerTypes/paoTypes"

export const initialStatePao: any = [{ number: null, person: null, action: null, object: null }]

export default (state: PaoState = initialStatePao, { type, payload }: any) => {
  switch (type) {

    case NEW_PAO_LIST:
      return payload

    case FETCHED_PAOLIST:
      return payload

    case ADD_TO_PAO_LIST:
      // console.log(payload, 'add to list@@')
      // console.log(payload)
      return [...state, payload] //~ may need to add a uuid

    case UPDATE_PAO_LIST:
      console.log('update list')
      return state.map((document: any) => {
        if (document.number === payload.number) {
          document[payload.name] = payload.value
          return document
        } else return document
      })

    case DELETE_PAO_LIST:
      return initialState

    case DELETE_PAO_DOC:
      return state.list.filter((doc: any) => doc !== payload.deletedDocId)

    case UPDATE_SPECIFIC_PAO_COLLECION:
      // console.log(payload, 'payload from paoReducer')
      // return {...state, } //~ update the state with the payload, the submited controlled inputs
      return state

    default:
      return state
  }
}
