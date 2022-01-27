import axios from 'axios'
import *as type from './../constants/constans'

const registerStart=()=>{
    return{

        type:type.REGISTER_START
    }
}
const registerSuccess=(user)=>{
    return {
        type:type.REGISTER_SUCCESS,
        payload:user
    }
}
const registerErr=()=>{
    return {
        type:type.REGISTER_ERR
    }
}
const register=(user,navigate)=>{
    return (dispatch)=>{
        dispatch(registerStart())
        axios.post('https://fwaec-survey.herokuapp.com/v1/auth/register',user)
        .then((res)=>{
            console.log(res)
            dispatch(registerSuccess(res.data))
            navigate('/login')
        })
        .catch(()=>dispatch(registerErr()))
    }
}
export default register;