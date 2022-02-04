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
   
  return (
    <>
      {
        questionUpdate===data.id?
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
    :
    <div>
        <input type="text" value={question.question} />
        <input type="text" value={question.answer1} />
        <input type="text" value={question.answer2} />
        <input type="text" value={question.answer3} />
        <input type="text" value={question.answer4} />
        <input type="text" value={question.correctanswer} />
          <button>cap nhat</button>

    </div>
    }
    </>
  );
};

export default QuestionAdItem;
