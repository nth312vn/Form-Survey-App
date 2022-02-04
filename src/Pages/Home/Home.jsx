import React from 'react';


import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

import { useSelector } from 'react-redux';
import './home.css'
const Home = () => {
  const user=useSelector((state)=>state.authReducer)
 
  return (
  <>
      <Nav/>
      <div className='home-container'>
        <h1>Welcom to Form Survey</h1>
        <Link to='/user/question' className='home-link' >Go to Question Now</Link>
        <Link to='/admin/question'>questionad</Link>
      </div>
  </>
  );
};

export default Home;
