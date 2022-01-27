
import *as type from './../constants/constans'
const initialState={
    request:false,
    user:null,
    err:false
}
const registerReducer=(state=initialState,action)=>{
    switch(action.type){
        case type.REGISTER_START:
            {
                
                return {
                    ...state,
                    request:true
                }

            }
        case type.REGISTER_SUCCESS:
            {
                
                return {
                    ...state,
                    request:false,
                    err:false,
                    user:action.payload
                }
            }
        case type.REGISTER_ERR:
            {
                return {
                    ...state,
                    request:false,
                    err:true
                }
            }
        default:
            return state
    }
}
export default registerReducer;