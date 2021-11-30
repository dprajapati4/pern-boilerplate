import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
//import yourReducer from './yourReducer';

//Combine all your reducers in the
//const reducer = combineReducers({user})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(
  // reducer,

  middleware)

export default store

// Remember to export all from all of the reducer files here.
// export * from './user'