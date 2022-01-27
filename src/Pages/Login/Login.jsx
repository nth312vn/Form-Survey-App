import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginUser from './../../redux/actions/authAction';
import './login.css'
const Login = () => {
  const [userName,setUserName]=useState('')
  const [passWord,setPassWord]=useState('')
  const dataStore=useSelector(state=>state.authReducer)
 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChangeUserName=(e)=>{
    const {value}=e.target;
    setUserName(value)
    
  }


  const handleChangePassWord=(e)=>{
    const {value}=e.target;
    setPassWord(value)
    

  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const user={
      username:userName,
      password:passWord
    }
    
    dispatch(loginUser(user,navigate))
    
  }
  return (
       <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>USERNAME</label>
                <input type="text" required value={userName} placeholder="Enter your username" onChange={(e)=>handleChangeUserName(e)} />
                <label>PASSWORD</label>
                <input type="password" required value={passWord} placeholder="Enter your password" onChange={(e)=>handleChangePassWord(e)} />
                <button type="submit"> Continue </button>
            </form>
            <p className='text-err'>{dataStore.error?'Thông tin tin đăng nhập không đúng':''}</p>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
  );
};

export default Login;
