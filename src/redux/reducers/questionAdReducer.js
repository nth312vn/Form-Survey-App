import *as types from './../constants/constans'
import _ from 'lodash'
const initialState={
    request:false,
    questionAd:null,
    err:false,
    recall:null
}
const questionAd=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_QUES_AD_START:
            {
                const newState=_.cloneDeep(state)
                newState.request=true
                return newState
            }
        case types.GET_QUES_AD_SUCCESS:
            {
                const newState=_.cloneDeep(state)
                newState.request=false;
                newState.questionAd=action.payload
                return newState
            }
        case types.GET_QUES_AD_ERR:
            {
                const newState=_.cloneDeep(state)
                newState.request=false
                newState.questionAd=null
                newState.err=true
                return newState
            }
            case 'CHANGE_RECALL':
                {
                    const newState=_.cloneDeep(state)
                    newState.recall=action.payload
                    return newState
                }
        default:
            return state
    }
}
export default questionAd