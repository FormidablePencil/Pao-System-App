import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import paoReducer from './reducer/paoReducer'
import authReducer from './reducer/authReducer'
import systemMesgReducer from './reducer/systemMesgReducer'
import screenSettingsReducer from './reducer/screenSettingsReducer'
import favListReducer from './reducer/favListReducer'
import flashcardOptionsReducer from './reducer/flashcardOptionsReducer'

const rootReducer = combineReducers({
  pao: paoReducer,
  auth: authReducer,
  systemMessages: systemMesgReducer,
  screenSettings: screenSettingsReducer,
  favList: favListReducer,
  flashcardOptions: flashcardOptionsReducer
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
