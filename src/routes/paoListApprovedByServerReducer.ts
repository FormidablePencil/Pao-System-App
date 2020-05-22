import { FETCHED_PAOLIST, ADD_TO_PAO_LIST_WITH_SCHEMA, CREATED_NEW_PAO_DOC } from "../actions/types"
import paoSchemaGenerator from "../components/logic/paoSchemaGenerator"
import { PaoState } from "../reducerTypes/paoTypes"

export const initialStatePao: any = [{ number: null, person: null, action: null, object: null }]

export default (state: PaoState = initialStatePao, { type, payload }: any) => {

  switch (type) {

    case ADD_TO_PAO_LIST_WITH_SCHEMA:
      const newModal = paoSchemaGenerator(payload)
      return [...state, newModal]

    case CREATED_NEW_PAO_DOC:
      return [...state, payload] 

    case FETCHED_PAOLIST:
      return payload

    default:
      return state
  }
}
