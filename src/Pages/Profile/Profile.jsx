import React from 'react';
import { useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useState } from 'react';
import './Profile.css'

const Profile = () => {
  const user=useSelector(state=>state.authReducer.currentUser)
  console.log(user)
  const token=user?user.tokens.access.token:''
  console.log(token)
  const id =user?user.user.id:''
  console.log(id)
  const [userData,setUserData]=useState({})
  useEffect(()=>{
    if (user&&token&&id){
      const config={Authorization: `Bearer ${token}`}
      axios.get(`https://fwaec-survey.herokuapp.com/v1/users/${id}`,{headers:config})
      .then((res)=>setUserData(res.data))
     
    }
  },[user,token,id])
  return (
      <div>
          <Nav/>
          <div className='main-profile'>
            <h2>{userData.email}</h2>
            <h2>{userData.id}</h2>

            <h2>{userData.username}</h2>
            <h2>{userData.score}</h2>

            <h2>{userData.role}</h2>
            <img src={userData.avatar} alt="anh" />
            <button>cap nhat avatar</button>

          </div>
      </div>
  );
};

export default Profile;
