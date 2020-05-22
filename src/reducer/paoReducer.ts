import { NEW_PAO_LIST, ADD_TO_PAO_LIST, UPDATE_PAO_LIST, DELETE_PAO_LIST, DELETE_PAO_DOC, FETCHED_PAOLIST, UPDATE_SPECIFIC_PAO_COLLECION, FAILED_SERVER_CRUD_REQUEST, ADD_TO_PAO_LIST_WITH_SCHEMA, CREATED_NEW_PAO_DOC } from "../actions/types"
import { PaoReducer, PaoState } from "../reducerTypes/paoTypes"
import paoSchemaGenerator from "../components/logic/paoSchemaGenerator"

export const initialStatePao: any = [{ number: null, person: null, action: null, object: null }]

export default (state: PaoState = initialStatePao, { type, payload }: any) => {
  switch (type) {

    case FAILED_SERVER_CRUD_REQUEST:
    case NEW_PAO_LIST:
    case FETCHED_PAOLIST:
      return payload

    case CREATED_NEW_PAO_DOC:
    case ADD_TO_PAO_LIST:
      return [...state, payload]

    case UPDATE_PAO_LIST:
      return state.map((document: any) => {
        if (document.number === payload.number) {
          document[payload.name] = payload.value
          return document
        } else return document
      })

    case DELETE_PAO_LIST:
      return initialStatePao

    case DELETE_PAO_DOC:
      return state.list.filter((doc: any) => doc !== payload.deletedDocId)

    // case CREATED_NEW_PAO_DOC:
    //   return state.map((document: any) => {
    //     if (document.number === payload.number) {
    //       console.log('successfully replaced!!')
    //       return payload
    //     } else return document
    //   })

    case UPDATE_SPECIFIC_PAO_COLLECION:
      // console.log(payload, 'payload from paoReducer')
      // return {...state, } //~ update the state with the payload, the submited controlled inputs
      return state

    default:
      return state
  }
}
