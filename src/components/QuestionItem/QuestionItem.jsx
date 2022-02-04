import React from 'react';
import { useState } from 'react';
import './QuestionItem.css'
const QuestionItem = (props) => {
    const data=props.data
    
    const [answer,setAnswer]=useState(null)
    const handleChangeAns=(e,id)=>{
      setAnswer(e.target.value)
      props.handleChangeAns(e.target.name,e.target.value,id)
    }
    
  return (
      <div className='question-item-container'>
          <h2>{data.question}</h2>
          <div className='group' onChange={(e)=>handleChangeAns(e,data.id)}>

            <div className='input-group' >
              <input type="radio" ckecked={Boolean(answer===data.answer1).toString()} name={data.question} value={data.answer1}  />
              <label htmlFor={data.answer1}>{data.answer1}</label>
            </div>
            <div className='input-group'>
              <input type="radio" ckecked={Boolean(answer===data.answer2).toString()} name={data.question} value={data.answer2}  />
              <label htmlFor={data.answer2}>{data.answer2}</label>
            </div>
            <div className='input-group'>
              <input type="radio" ckecked={Boolean(answer===data.answer3).toString()} name={data.question} value={data.answer3}  />
              <label htmlFor={data.answer3}>{data.answer3}</label>
            </div>
            <div className='input-group'>
              <input type="radio" ckecked={Boolean(answer===data.answer4).toString()} name={data.question} value={data.answer4}  />
              <label htmlFor={data.answer4}>{data.answer4}</label>
            </div>
          </div>
      </div>
  );
};

export default QuestionItem;
