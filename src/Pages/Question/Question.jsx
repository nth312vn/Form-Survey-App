import React from 'react';
import { useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import {useDispatch, useSelector} from 'react-redux'
import getQuestion from '../../redux/actions/getQuestionAct';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const user=useSelector((state)=>state.authReducer)
  const navigate=useNavigate()
  console.log(user.currentUser.tokens.access.token)
  const dispatch=useDispatch()
  const token=user.currentUser.tokens.access.token
  useEffect(()=>{
    if(!user.currentUser){
      navigate('/login')
    }
    if (token){

      dispatch(getQuestion(token))
    }
  },[dispatch])
  return (
      <div>
          <Nav/>

      </div>
  );
};

export default Question;
