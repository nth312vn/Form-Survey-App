import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddQuestion from '../../components/AddQuestion/AddQuestion';
import QuestionAdItem from '../../components/QuestionAdItem/QuestionAdItem';
import { getQuesAd } from '../../redux/actions/questionAdAction';
import Nav from './../../components/Nav/Nav'

import './QuestionAd.css'
const QuestionAd = () => {
    const [toggle,setToggle]=useState(false)
    const [page,setPage]=useState(1)
    const handleToggle=()=>{
        setToggle(!toggle)
    }
    const admin=useSelector((state)=>state.authReducer.currentUser)
    const navigate=useNavigate()
    const token=admin?admin.tokens.access.token:''
    
    const dispatch=useDispatch()
    const questionAd=useSelector((state)=>state.questionAdReducer)
    
   
    const totalPages=questionAd.questionAd?questionAd.questionAd.totalPages:1
    const [questionId,setQuestionId]=useState('')
    const [questionUpdate,setQuestionUpdate]=useState('')
    const handleQuestionUpdate=(id)=>{
        setQuestionUpdate(id)
    }
    const handleChangeQuestionId=(id)=>{
        setQuestionId(id)
    }
    useEffect(()=>{
        if (!token){
            navigate('/login')
        }
    },[])
    useEffect(()=>{
        if (admin&&token){
            dispatch(getQuesAd(token,page))
        }
    },[admin,dispatch,token,page,questionId,questionUpdate])
    const handlePrev=()=>{
        if (page<=1){
            setPage(1)
            return
        }
        setPage(page-1)
    }
    const handleNext=()=>{
        if (page>=totalPages){
            setPage(totalPages)
            return
        }
        setPage(page+1)
    }
  return (
      <div>
          <Nav/>
          <div className='question-container'>

          <div className='Add-question'>
              <AddQuestion 
                token={admin&&token?token:''} 
                handleToggle={handleToggle} 
                toggle={toggle} 
                handleChangeQuestionId={handleChangeQuestionId}
                />
              
          </div>
        {
            questionAd&&questionAd.questionAd?questionAd.questionAd.results.map((item,index)=>{
                return (
                    <QuestionAdItem 
                        data={item} 
                        key={item.id} 
                        token={admin&&token?token:''} 
                        questionId={questionId}
                        questionUpdate={questionUpdate}
                        handleChangeQuestionId={handleChangeQuestionId}
                        handleQuestionUpdate={handleQuestionUpdate}
                    />
                )
            }):''
        }
        <div className='button-pagination'>
            <button disabled={page<=1} onClick={()=>handlePrev()}>prev</button>
            <span>{`${page}/${totalPages}`}</span>
            <button disabled={page>=totalPages} onClick={()=>handleNext()}>Next</button>
        </div>
          </div>
      </div>
  )
};

export default QuestionAd;
