import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import './Result.css'

import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '../../utils/axiosJwt';




const Result = () => {
    const result=useSelector(state=>state.resultReducer)
    const user=useSelector((state)=>state.authReducer.currentUser)
    const navigate=useNavigate()
    const token=user?user.tokens.access.token:''
    const dispatch=useDispatch()
    const [data,setData]=useState([])
    const axiosJwt=createAxios(user,dispatch,token)
    console.log()
    useEffect(()=>{
        if(!token)
        {
            navigate('/login')
        }
        
        if (result.length>0){
            let newResult=_.cloneDeep(result)
            newResult=newResult.map((item,index)=>{
               delete item.id
               
               return item
            })
            
            const config={'Authorization': `Bearer ${token}`}
            if (user&&token){
                console.log(newResult)
                axiosJwt.post('https://fwaec-survey.herokuapp.com/v1/questions/submit',newResult,{headers:config})
                .then((res)=>{

                    setData(res.data)
                    console.log(res.data)
                }
                )
            }

        }
       
        
    },[result])
    const getScore=()=>{
        let score
        if (data){
            console.log(data)

             score=data.filter((item)=>item.result===true)
        }
        return score.length
    }
    
  return (

      <div>
          <Nav/>
          <div className='result-container'>

          <h2>Your Score is:{getScore()}</h2>
         <h2>Question is aswered:{data.length}</h2>
         <h2>Incorrect Answer is:{data.length-getScore()}</h2>
         <Link to='/user/home'>back to home</Link>
         {data ?data.map((item,index)=>{
             return (
                
                  <div key={index} >
                      <h2>Question:{item.question}</h2>
                      <h2>Your Answer:{item.correctanswer}</h2>
 
                  </div>
                
             ) 

             
             }
             ):''}
          </div>
      </div>
  );
};

export default Result;
