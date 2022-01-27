import {combineReducers} from 'redux'
import authReducer from './authReducer'
import getQuestionReducer from './getQuestionReducer'
import registerReducer from './registerReducer'
const rootReducer=combineReducers({
   authReducer:authReducer,
   registerReducer:registerReducer,
   getQuestionReducer:getQuestionReducer,
})
export default rootReducer