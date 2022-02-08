import axios from "axios";
import _ from 'lodash'
import jwt_decode from 'jwt-decode'
import { loginSuccess } from "../redux/actions/authAction";

export const createAxios =(user,dispatch,token)=>{
    const axiosJwt=axios.create()

    axiosJwt.interceptors.request.use(
    (res)=>{
       
        const date=new Date()
        const decodeToken=jwt_decode(token)
        
        if(decodeToken.exp<date.getTime()/1000&&user){
            const newUser=_.cloneDeep(user)
            const refreshToken=user.tokens.refresh.token
            axios.post('https://fwaec-survey.herokuapp.com/v1/auth/refresh-tokens',refreshToken)
            .then((res)=>{
                newUser.tokens=res.data
                dispatch(loginSuccess(newUser))
            })
           
        }
        return res
    }
    )
    return axiosJwt
}