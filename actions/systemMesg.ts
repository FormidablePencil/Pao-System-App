import { SIGN_IN_FAILED, SIGN_UP_FAILED, SAVED_PAOLIST_TO_DB, FAILED_SAVE_PAOLIST_TO_DB, RESET_SAVEDPAOTODB, SAVE_PAOLIST_TO_DB, RESET_SIGNINFAILED_PROPERTY, RESET_SIGNUPFAILED_PROPERTY, RESET_SUCCESSULLYUPDATEDPAODOC, FAILED_TO_UPDATE_DOCUMENT_IN_PAO, UPDATED_DOCUMENT_IN_PAO, RESET_FAILEDTODELETEDOCINPAO, FAILED_TO_DELETE_DOCUMENT_IN_PAO } from "./types"

const initialState = {
  signinfailed: false,
  signupfailed: false,
  savedPaoToDb: undefined,
  successfullyUpdatedPaoDoc: undefined
}

export default (state: AppMessagesState = initialState, { type }: AppMessagesReducer) => {
  switch (type) {

    case SIGN_IN_FAILED:
      return { ...state, signinfailed: true }

    case SIGN_UP_FAILED:
      return { ...state, signupfailed: true }

    case SAVED_PAOLIST_TO_DB:
      return { ...state, savedPaoToDb: true }

    case SAVE_PAOLIST_TO_DB:
      return { ...state, savedPaoToDb: false }

    case FAILED_SAVE_PAOLIST_TO_DB:
      return { ...state, savedPaoToDb: false }

    case UPDATED_DOCUMENT_IN_PAO:
      return { ...state, successfullyUpdatedPaoDoc: true }

    case FAILED_TO_UPDATE_DOCUMENT_IN_PAO:
      return { ...state, successfullyUpdatedPaoDoc: false }

    case FAILED_TO_DELETE_DOCUMENT_IN_PAO:
      return { ...state, failedToDeleteDocInPao: true }

    case RESET_FAILEDTODELETEDOCINPAO:
      return { ...state, failedToDeleteDocInPao: undefined }

    case RESET_SUCCESSULLYUPDATEDPAODOC:
      return { ...state, successfullyUpdatedPaoDoc: undefined }

    case RESET_SAVEDPAOTODB:
      return { ...state, savedPaoToDb: undefined }

    case RESET_SIGNINFAILED_PROPERTY:
      return { ...state, signinfailed: undefined }

    case RESET_SIGNUPFAILED_PROPERTY:
      return { ...state, signupfailed: undefined }

    default:
      return state
  }
}

interface AppMessagesState {
  signinfailed: boolean
  signupfailed: boolean
  savedPaoToDb: undefined | boolean
  successfullyUpdatedPaoDoc: undefined | boolean
  failedToDeleteDocInPao: undefined | boolean
}
interface AppMessagesReducer {
  type: string
}