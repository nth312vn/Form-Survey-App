import React from 'react';
import { useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Question.css'
import QuestionItem from '../../components/QuestionItem/QuestionItem';

import getQuestion from '../../redux/actions/getQuestionAct';
import { resultAct } from '../../redux/actions/resultAction';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../utils/axiosJwt';

const Question = () => {
  const user = useSelector((state) => state.authReducer)
  const token = user.currentUser?user.currentUser.tokens.access.token:''
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [totalPages,setTotalPages]=useState(1)
  const getQuesStore = useSelector(state => state.getQuestionReducer.question)
  const totalPages = getQuesStore ? getQuesStore.totalPages : 1
  const [answer, setAnswer] = useState([])
  const axiosJwt=createAxios(user,dispatch,token)
  const handleChangeAns = (question, ans, id) => {
    const output = {
      id: id,
      question: question,
      correctanswer: ans
    }
    if (answer.length >= 1) {
      const index = answer.findIndex(item => item.id === id)
      if (index === -1) {
        setAnswer([...answer, output])
        return
      }
      const newAnswer = [...answer]
      newAnswer[index] = output;
      setAnswer(newAnswer)
      return

    }
    setAnswer([output])
  }
  const handleClick = () => {

    if (answer.length >= 1) {

      dispatch(resultAct(answer))
      navigate('/user/result')
      setAnswer([])
    }
  }
  console.log(answer)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!token){
      navigate('/login')
    }
    if (user.currentUser && token) {
      dispatch(getQuestion(token, page,axiosJwt))
    }

  }, [page, token])

  const handlePrev = () => {
    if (page <= 1) {
      setPage(1)
      return
    }
    setPage(page - 1)
  }
  const handleNext = () => {
    if (page >= getQuesStore.totalPages) {
      setPage(getQuesStore.totalPages)
      return
    }
    setPage(page + 1)
  }
  return (
    <div>
      <Nav />
      <div className='question-container'>
        {
          getQuesStore && getQuesStore.results ? getQuesStore.results.map((item, index) => {

            return (
              <QuestionItem
                key={item.id}
                data={item}
                handleChangeAns={handleChangeAns}
                ans={answer}
              />
            )
          }) : ''
        }
        <div>
          {totalPages === page ? (<button onClick={() => handleClick()}>Submit</button>) : ''}
        </div>
        <div className='btn-container'>

          <button disabled={page === 1} onClick={() => handlePrev()} >prev</button>
          <span>{`${page}/${totalPages}`}</span>
          <button disabled={page >= totalPages} onClick={() => handleNext()} >next</button>
        </div>
      </div>
    </div>
  );
};

export default Question;
