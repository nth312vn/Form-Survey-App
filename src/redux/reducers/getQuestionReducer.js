
import *as type from './../constants/constans'

const initialState={
    request:false,
    question:null,
    err:false
}
const getQuestionReducer=(state=initialState,action)=>{
    switch (action.type){
        case type.GET_QUESTION_START:
            {
                return{
                    ...state,
                    request:true
                }

            }
            case type.GET_QUESTION_SUCCESS:
                {
                    return{
                        ...state,
                        request:false,
                        question:action.payload
                    }
                }
                case type.GET_QUESTION_ERR:
                    {
                        return{
                            ...state,
                            request:false,
                            err:true
                        }
                    }

        default:
            return state
    }
}
export default getQuestionReducer;