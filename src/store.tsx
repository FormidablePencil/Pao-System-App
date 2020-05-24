import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import paoReducer from './reducer/paoReducer'
import authReducer from './reducer/authReducer'
import systemMesgReducer from './reducer/systemMesgReducer'
import favListReducer from './reducer/favListReducer'
import flashcardOptionsReducer from './reducer/flashcardOptionsReducer'
import fabReducer from './reducer/fabReducer'
import paoListApprovedByServerReducer from './routes/paoListApprovedByServerReducer'
import controlledThemeColorReducer from './reducer/controlledThemeColorReducer'

const rootReducer = combineReducers({
  pao: paoReducer,
  auth: authReducer,
  systemMessages: systemMesgReducer,
  favList: favListReducer,
  flashcardOptions: flashcardOptionsReducer,
  fabProperties: fabReducer,
  paoListApprovedByServer: paoListApprovedByServerReducer,
  controlledThemeColor: controlledThemeColorReducer,
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
