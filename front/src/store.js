import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import linkDataReducer from './reducers/linkDataReducer'



const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  linkData: linkDataReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store