import * as type from './../constants/constans'
const intialState={
    request:false,
    currentUser:null,
    error:false
}
const authReducer=(state=intialState,action)=>{
    switch(action.type){
        case type.LOGIN_START:
            
                const newState={...state};
                newState.request=true
                

                return newState
            
        case type.LOGIN_SUCCESS:
            {
                const newState={...state};
                newState.request=false
                newState.error=false
                newState.currentUser=action.payload
                
                return newState
            }
            case type.LOGIN_ERROR:
                {
                    const newState={...state};
                    
                newState.error=true
                newState.request=false
                
                return newState
                }
        default:
            return state
    }
}
export default authReducer