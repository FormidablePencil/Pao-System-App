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
import fabReducer from './reducer/fabReducer'

export interface RootReducerT {
  pao
  auth
  systemMessages
  favList
  flashcardOptions
  fabVisible: boolean
  paoListApprovedByServer
  controlledThemeColor
  study: StudyModeT
  fabProperties
}

const rootReducer = combineReducers<RootReducerT>({
  pao: paoReducer,
  auth: authReducer,
  systemMessages: systemMesgReducer,
  favList: favListReducer,
  flashcardOptions: flashcardOptionsReducer,
  fabVisible: fabVisibleReducer,
  fabProperties: fabReducer,
  paoListApprovedByServer: paoListApprovedByServerReducer,
  controlledThemeColor: controlledThemeColorReducer,
  study: studyReducer
})

const initialState = {}

const middleware = [thunk]

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
