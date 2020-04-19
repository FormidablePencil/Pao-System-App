import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import paoReducer from './reducer/paoReducer'
import authReducer from './reducer/authReducer'
import systemMesg from './reducer/systemMesgReducer'

const rootReducer = combineReducers({
  pao: paoReducer,
  auth: authReducer,
  systemMessages: systemMesg
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
