import axios from 'axios';
import React from 'react';

const QuestionAdItem = (props) => {
  const token=props.token
  
    const handleDelete=(id)=>{
      if (id){
        const config={Authorization: `Bearer ${token}`}
        axios.delete(`https://fwaec-survey.herokuapp.com/v1/questions/edit/${id}`,{headers:config})
        .then((res)=>{
          
            props.questionId?props.handleChangeQuestionId(''):props.handleChangeQuestionId(id)
        })
      }
    }
    const data=props.data
   
  return (
      <div>
          <h2>question:{data.question}</h2>
          <h2>answer1 :{data.answer1}</h2>
          <h2>answer2:{data.answer2}</h2>
          <h2>answer3:{data.answer3}</h2>
          <h2>answer4:{data.answer4}</h2>
           <h2>correctanswer:{data.correctanswer}</h2>
           <button>sua</button>
           <button onClick={()=>handleDelete(data.id)}>Xoa</button>
      </div>
  );
};

export default QuestionAdItem;
