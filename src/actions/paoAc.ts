import { UPDATE_PAO_LIST, ADD_TO_PAO_LIST, UPDATE_SPECIFIC_PAO_COLLECION } from './types'
import { PaoAction } from '../reducerTypes/paoTypes'
import { ControlledInputsTypes } from '../components/FlashcardItSelf'

export const updatePaoItem = (controlledInput: any, docAlreadyExists: boolean) => (dispatch: any) => {
  // if "there's a document by that number theen dispatch only the value that's changed to pao reducer"
  // else "new document and save it"
  if (docAlreadyExists === true) {
    dispatch({ type: UPDATE_PAO_LIST, payload: controlledInput })
  } else {
    let first: any
    let second: any
    if (controlledInput.name === 'person') {
      first = 'action'
      second = 'object'
    }
    if (controlledInput.name === 'action') {
      first = 'person'
      second = 'object'
    }
    if (controlledInput.name === 'object') {
      first = 'person'
      second = 'action'
    }
    if (controlledInput.value) {
      const document: any = {
        number: controlledInput.number,
        [controlledInput.name]: controlledInput.value,
        [first]: null,
        [second]: null
      }
      dispatch({ type: ADD_TO_PAO_LIST, payload: document })
    }
  }
}

export const saveControlledInputsToPao = (controlledInputs: ControlledInputsTypes) => dispatch => {
  dispatch({ type: UPDATE_SPECIFIC_PAO_COLLECION, payload: controlledInputs })
  //and save it to db
}


  // dispatch({type: UPDATE_PAO_LIST, payload: })
