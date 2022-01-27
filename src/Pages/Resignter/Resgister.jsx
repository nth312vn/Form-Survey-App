import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import register from '../../redux/actions/registerAction';
import './register.css'
const Resgister = () => {
  const [userName,setUserName]=useState('')
  const [passWord,setPassWord]=useState('')
  const [email,setEmail]=useState('')
  const dispatch=useDispatch()
  const registerStore=useSelector(state=>state.registerReducer)
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault();
    const user={
      username:userName,
      password:passWord,
      email:email
    }
    
    dispatch(register(user,navigate))
  }
  console.log(registerStore)
  const handleChangeEmail=(e)=>{
    const {value}=e.target
    setEmail(value)
    
  }
  const handleChangeUserName=(e)=>{
    const {value}=e.target
    setUserName(value)
  }
  const handleChangePassWord=(e)=>{
    const {value}=e.target
    setPassWord(value)
  }
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>EMAIL</label>
            <input required value={email} type="email" placeholder="Enter your email" onChange={(e)=>handleChangeEmail(e)} />
            <label>USERNAME</label>
            <input required type="text" value={userName} placeholder="Enter your username" onChange={(e)=>handleChangeUserName(e)} />
            <label>PASSWORD</label>
            <input required type="password" value={passWord} placeholder="Enter your password" onChange={(e)=>handleChangePassWord(e)} />
            <button type="submit"> Create account </button>
        </form>
        <p className='text-err'>{registerStore.err?'Có lỗi xảy ra vui lòng thử lại':''}</p>
        <Link className='link' to='/login'>Login</Link>
    </section>
  );
};

export default Resgister;

