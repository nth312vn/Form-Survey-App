import {combineReducers} from 'redux'
import authReducer from './authReducer'
import getQuestionReducer from './getQuestionReducer'
import questionAd from './questionAdReducer'
import registerReducer from './registerReducer'
import resultReducer from './resultReducer'
const rootReducer=combineReducers({
   authReducer:authReducer,
   registerReducer:registerReducer,
   getQuestionReducer:getQuestionReducer,
   resultReducer:resultReducer,
   questionAdReducer:questionAd
})
export default rootReducer