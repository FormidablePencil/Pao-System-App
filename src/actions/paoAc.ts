import { UPDATE_PAO_LIST, ADD_TO_PAO_LIST, UPDATE_SPECIFIC_PAO_COLLECION, FAILED_SERVER_CRUD_REQUEST } from './types'
import { PaoAction } from '../reducerTypes/paoTypes'
import { ControlledInputsTypes } from '../screens/flashcard-screen/components/flashcard-swiper/flashcard-it-self'

export const updatePaoItem = (controlledInput: any, docAlreadyExists: boolean, paoListApprovedByServer) => async (dispatch: any) => {
  // if "there's a document by that number then dispatch only the value that's changed to pao reducer"
  // else "new document and save it"
  if (docAlreadyExists === true) {
    dispatch({ type: UPDATE_PAO_LIST, payload: controlledInput })

    const request = {
      // method:
    }
    const res = await fetch('', request)
    const fetchedData = res.json()
    if (fetchedData.message === 'saved') {

    } else dispatch({ type: FAILED_SERVER_CRUD_REQUEST, paylaod: paoListApprovedByServer })
    //~ send a update request
    //~ if failed then set current paolist to the last list the server responded with

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

      //~ send a create request
      //~ if failed then set current paolist to the last list the server responded with

    }
  }
}

export const saveControlledInputsToPao = (controlledInputs: ControlledInputsTypes) => dispatch => {
  dispatch({ type: UPDATE_SPECIFIC_PAO_COLLECION, payload: controlledInputs })
  //and save it to db
}


  // dispatch({type: UPDATE_PAO_LIST, payload: })
