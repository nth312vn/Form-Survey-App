import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'
const Nav = () => {
  return (
      <nav className="navbar-container">
          <NavLink className={(navdata)=>navdata.isActive?'active':''} to='/user/home'>Home</NavLink>
          <NavLink className={(navdata)=>navdata.isActive?'active':''} to='/user/question'>Question</NavLink>
          <NavLink className={(navdata)=>navdata.isActive?'active':''} to='/user/profile'>Profile</NavLink>
          <NavLink className={(navdata)=>navdata.isActive?'active':''} to='/login'>Logout</NavLink>
      </nav>
  );
};

export default Nav;
