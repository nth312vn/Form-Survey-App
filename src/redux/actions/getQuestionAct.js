import *as type from './../constants/constans'
import axios from 'axios'
const getQuestionRequest=()=>{
    return{
        type:type.GET_QUESTION_START,
    }
}
const getQuestionSucces=(data)=>{
    return{
        type:type.GET_QUESTION_SUCCESS,
        payload:data
    }
}
const getQuestionErr=()=>{
    return{
        type:type.REGISTER_ERR
    }
}
const getQuestion=(token,param,axiosIwt)=>{
    return (dispatch)=>{
        const config={Authorization: `Bearer ${token}`}
        
        dispatch(getQuestionRequest())
        axiosIwt.get(`https://fwaec-survey.herokuapp.com/v1/questions/?page=${param}`,{headers:config})
        .then((res)=>{
            console.log(res.data)
            dispatch(getQuestionSucces(res.data))
        })
        .catch(()=>dispatch(getQuestionErr()))
    }
}
export default getQuestion