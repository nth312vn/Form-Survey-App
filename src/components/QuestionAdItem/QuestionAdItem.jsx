import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const QuestionAdItem = (props) => {
  const token=props.token
  const questionUpdate=props.questionUpdate
  const data=props.data
  const [question,setQuestion]=useState({
    question:data.question,
    answer1:data.answer1,
    answer2:data.answer2,
    answer3:data.answer3,
    answer4:data.answer4,
    correctanswer:data.correctanswer
  })
  
    const handleDelete=(id)=>{
      if (id){
        const config={Authorization: `Bearer ${token}`}
        axios.delete(`https://fwaec-survey.herokuapp.com/v1/questions/edit/${id}`,{headers:config})
        .then((res)=>{
          
            props.questionId?props.handleChangeQuestionId(''):props.handleChangeQuestionId(id)
        })
      }
    }
    
    const handleUpdate=(id)=>{
      props.handleQuestionUpdate(id)
    }
    const handlQuestion=(e)=>{
      
      setQuestion({
        ...question,
        question:e.target.value,
      })
    }
    const handleAnswer1=(e)=>{
      setQuestion({
        ...question,
        answer1:e.target.value
      })
    }
    const handleAnswer2=(e)=>{
      setQuestion({
        ...question,
        answer2:e.target.value
      })
    }
    const handleAnswer3=(e)=>{
      setQuestion({
        ...question,
        answer3:e.target.value
      })
    }
    const handleAnswer4=(e)=>{
      setQuestion({
        ...question,
        answer4:e.target.value
      })
    }
    const handleCrrAns=(e)=>{
      setQuestion({
        ...question,
        correctanswer:e.target.value
      })
    }
    const handleClose=()=>{
      props.handleQuestionUpdate('')
    }
    const handleUpdateSubmit=(id)=>{
      if(id&&token)
      {
          const config={Authorization: `Bearer ${token}`}
        axios.patch(`https://fwaec-survey.herokuapp.com/v1/questions/edit/${id}`,question,{headers:config})
        .then((res)=>{
          props.handleQuestionUpdate('')
        })
      }
    }
  return (
    <>
      {
        questionUpdate===data.id?
    <div>
        <h2>question</h2>
        <input type="text" required onChange={(e)=>handlQuestion(e)} value={question.question} />
        <h2>answer1</h2>
        <input type="text" required onChange={(e)=>handleAnswer1(e)} value={question.answer1} />
        <h2>answer2</h2>
        <input type="text" required onChange={(e)=>handleAnswer2(e)} value={question.answer2} />
        <h2>answer3</h2>
        <input type="text" required onChange={(e)=>handleAnswer3(e)} value={question.answer3} />
        <h2>answer4</h2>
        <input type="text" required onChange={(e)=>handleAnswer4(e)} value={question.answer4} />
        <h2>correct answer</h2>
        <input type="text" required onChange={(e)=>handleCrrAns(e)} value={question.correctanswer} />
          <button onClick={()=>handleUpdateSubmit(data.id)}>cap nhat</button>
          <button onClick={()=>handleClose()}>dong</button>

    </div>
    :
        (<div>
          <h2>question:{data.question}</h2>
          <h2>answer1 :{data.answer1}</h2>
          <h2>answer2:{data.answer2}</h2>
          <h2>answer3:{data.answer3}</h2>
          <h2>answer4:{data.answer4}</h2>
           <h2>correctanswer:{data.correctanswer}</h2>
           <button onClick={()=>handleUpdate(data.id)}>sua</button>
           <button onClick={()=>handleDelete(data.id)}>Xoa</button>
      </div>)

    }
    </>
  );
};

export default QuestionAdItem;
