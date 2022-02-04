import axios from 'axios'
import *as types from './../constants/constans'

const getQuesAdStart=()=>{
    return {
        type:types.GET_QUES_AD_START
    }
}
const getQuesAdSucces=(data)=>{
    return{
        type: types.GET_QUES_AD_SUCCESS,
        payload:data
    }
}
const getQuesAdErr=()=>{
    return{
        type:types.GET_QUES_AD_ERR
    }
}
export const changeReCallApi=(data)=>{
    return {
        type:'CHANGE_RECALL',
        payload:data
    }
}
export const getQuesAd=(token,page)=>{
    return (dispatch)=>{
        const config={Authorization: `Bearer ${token}`}
        dispatch(getQuesAdStart())
        
        axios.get(`https://fwaec-survey.herokuapp.com/v1/questions/edit/?page=${page}`,{headers:config})
        .then((res)=>{
            dispatch(getQuesAdSucces(res.data))
           
        })
        .catch(()=>dispatch(getQuesAdErr))
    }
}