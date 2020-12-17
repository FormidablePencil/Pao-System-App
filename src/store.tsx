import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import paoReducer from './reducer/paoReducer'
import authReducer from './reducer/authReducer'
import systemMesgReducer from './reducer/systemMesgReducer'
import favListReducer from './reducer/favListReducer'
import flashcardOptionsReducer from './reducer/flashcardOptionsReducer'
import paoListApprovedByServerReducer from './routes/paoListApprovedByServerReducer'
import controlledThemeColorReducer from './reducer/controlledThemeColorReducer'
import studyReducer, { StudyModeT } from './reducer/studyReducer'
import fabVisibleReducer from './reducer/fabVisibleReducer'
import fabReducer, { fabPropertiesT } from './reducer/fabReducer'
import studyRandomModeReducer, { StudyRandomModeT } from './reducer/studyRandomModeReducer'
import miscReducer, { MiscT } from './reducer/miscReducer'

export interface RootReducerT {
  pao
  auth
  systemMessages
  favList
  flashcardOptions
  fabVisible: boolean
  paoListApprovedByServer
  controlledThemeColor
  fabProperties: fabPropertiesT
  study: StudyModeT
  studyRandomMode: StudyRandomModeT
  misc: MiscT
}

const rootReducer = combineReducers({
  pao: paoReducer,
  auth: authReducer,
  systemMessages: systemMesgReducer,
  favList: favListReducer,
  flashcardOptions: flashcardOptionsReducer,
  fabVisible: fabVisibleReducer,
  fabProperties: fabReducer,
  paoListApprovedByServer: paoListApprovedByServerReducer,
  controlledThemeColor: controlledThemeColorReducer,
  study: studyReducer,
  studyRandomMode: studyRandomModeReducer,
  misc: miscReducer,
})

const initialState = {}

const middleware = [thunk]

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
