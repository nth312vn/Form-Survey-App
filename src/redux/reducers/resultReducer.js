
const initialState=[]
const resultReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SUBMIT_RESULT':
            {
                const newState=[...action.payload]
                console.log(newState)
                return newState
            }
        default:
            return state
    }
}
export default resultReducer