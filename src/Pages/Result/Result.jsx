import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import './Result.css'


const Result = () => {
    const result=useSelector(state=>state.resultReducer)
    const user=useSelector((state)=>state.authReducer.currentUser)
    const token=user.tokens.access.token
    const [data,setData]=useState([])
    console.log()
    useEffect(()=>{
        let newResult=_.cloneDeep(result)
       
        if (newResult.length>0){
            newResult=newResult.map((item,index)=>{
               delete item.id
               
               return item
            })
            const config={'Authorization': `Bearer ${token}`}
            if (token){
                
                axios.post('https://fwaec-survey.herokuapp.com/v1/questions/submit/',newResult,{headers:config})
                .then((res)=>setData(res.data))
            }

        }
    },[])
    const getScore=()=>{
        let score
        if (data){

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
          </div>
      </div>
  );
};

export default Result;
