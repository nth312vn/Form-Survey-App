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
        console.log(decodeToken)
        if(decodeToken.exp<date.getTime()/1000){
            const newUser=_.cloneDeep(user)
            newUser.tokens.access.token=newUser.tokens.refresh.token
            dispatch(loginSuccess(newUser))
        }
        return res
    }
    )
    return axiosJwt
}