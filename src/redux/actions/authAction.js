import * as type from './../constants/constans'
import axios from 'axios'
const loginStart=()=>{
    return {
        type:'LOGIN_START',
    }
}
export const loginSuccess=(data)=>{
    return{
        type:type.LOGIN_SUCCESS,
        payload:data
    }
}
const loginErr=(err)=>{
    return{
        type:type.LOGIN_ERROR,
        payload:err
    }
}
const loginUser=(user,navigate)=>{
    return (dispatch)=>{
        
        dispatch(loginStart())
        axios.post('https://fwaec-survey.herokuapp.com/v1/auth/login',user)
        .then((res)=>{
            
            dispatch(loginSuccess(res.data))
            navigate('/user/home')
            
        })
        .catch((err)=>dispatch(loginErr(err)))
    }
}
export const logout=()=>{
    return{

        type:'LOG_OUT'
    }
}
export default loginUser