import {
  SIGN_IN_SUCCESS_MESG, SIGN_IN_FAILED_MESG, RESET_SIGNIN_MESG,
  SIGN_UP_FAILED_MESG, SIGN_UP_SUCCESS_MESG, RESET_SIGNUP_MESG,
  SAVED_PAOLIST_TO_DB_SUCCESS_MESG, SAVED_PAOLIST_TO_DB_FAILED_MESG, RESET_SAVED_PAOLIST_TO_DB_MESG,
  UPDATED_DOCUMENT_IN_PAO_SUCCESS_MESG, UPDATED_DOCUMENT_IN_PAO_FAILED_MESG, RESET_UPDATED_DOCUMENT_IN_PAO_MESG,
  DELETE_DOCUMENT_IN_PAO_SUCCESS_MESG, DELETE_DOCUMENT_IN_PAO_FAILED_MESG, RESET_DELETE_DOCUMENT_IN_PAO_MESG,
  SIGNED_IN, SIGNED_UP,
  SET_LOADING, SET_NOT_LOADING, SIGNED_OUT, SIGN_OUT_FAILED, RESET_SIGNED_OUT, INVALID_CREDENTIALS_NOTIFY_MESG, RESET_NOTIFY_MESG, INPUT_FIELDS_EMPTY_NOTIFY_MESG, SAVED_PAOLIST_TO_DB_FAILED_NO_TOKEN_MESG
} from "../actions/types"
import { inputErrMessages } from "../constants/constants"

const initialState = {
  signin: undefined,
  signup: undefined,
  signedout: null,
  savedPaoToDb: null,
  UpdatedWholePaoCollection: undefined,
  ToDeleteDocInPao: undefined,
  loading: false,
  notifyMesg: null
}

export default (state: AppMessagesState = initialState, { type }: any) => {
  switch (type) {

    case SIGNED_IN:
    case SIGN_IN_SUCCESS_MESG:
      return { ...state, signin: true }
    case SIGN_IN_FAILED_MESG:
      return { ...state, signin: false }
    case RESET_SIGNIN_MESG:
      return { ...state, signin: undefined }

    case SIGNED_UP:
    case SIGN_UP_SUCCESS_MESG:
      return { ...state, signup: true }
    case SIGN_UP_FAILED_MESG:
      return { ...state, signup: false }
    case RESET_SIGNUP_MESG:
      return { ...state, signup: undefined }

    case SIGNED_OUT:
      return { ...state, signedout: true }
    case SIGN_OUT_FAILED:
      return { ...state, signedout: false }
    case RESET_SIGNED_OUT:
      return { ...state, signedout: null }

    case SAVED_PAOLIST_TO_DB_SUCCESS_MESG:
      return { ...state, savedPaoToDb: true }
    case SAVED_PAOLIST_TO_DB_FAILED_MESG:
      return { ...state, savedPaoToDb: false }
    case SAVED_PAOLIST_TO_DB_FAILED_NO_TOKEN_MESG:
      return { ...state, savedPaoToDb: 1 }
    case RESET_SAVED_PAOLIST_TO_DB_MESG:
      return { ...state, savedPaoToDb: null }

    case UPDATED_DOCUMENT_IN_PAO_SUCCESS_MESG:
      return { ...state, UpdatedWholePaoCollection: true }
    case UPDATED_DOCUMENT_IN_PAO_FAILED_MESG:
      return { ...state, UpdatedWholePaoCollection: false }
    case RESET_UPDATED_DOCUMENT_IN_PAO_MESG:
      return { ...state, UpdatedWholePaoCollection: undefined }

    case DELETE_DOCUMENT_IN_PAO_SUCCESS_MESG:
      return { ...state, DeleteDocInPao: true }
    case DELETE_DOCUMENT_IN_PAO_FAILED_MESG:
      return { ...state, DeleteDocInPao: false }
    case RESET_DELETE_DOCUMENT_IN_PAO_MESG:
      return { ...state, DeleteDocInPao: undefined }

    case SET_LOADING:
      return { ...state, loading: true }
    case SET_NOT_LOADING:
      return { ...state, loading: false }

    case INVALID_CREDENTIALS_NOTIFY_MESG:
      return { ...state, notifyMesg: inputErrMessages.invalidSigninMsg }
    case INPUT_FIELDS_EMPTY_NOTIFY_MESG:
      return { ...state, notifyMesg: inputErrMessages.emptyFields }
    case RESET_NOTIFY_MESG:
      return { ...state, notifyMesg: null }

    default:
      return state
  }
}

interface AppMessagesState {
  notifyMesg: string | null
  signin: undefined | boolean
  signup: undefined | boolean
  signedout: null
  savedPaoToDb: null | boolean | number
  UpdatedWholePaoCollection: undefined | boolean
  ToDeleteDocInPao: undefined | boolean
  loading: boolean
}