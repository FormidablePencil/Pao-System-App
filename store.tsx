import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import paoReducer from './reducer/paoReducer'
import authReducer from './reducer/authReducer'

const rootReducer = combineReducers({
  pao: paoReducer,
  auth: authReducer
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
