import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";

import "./Nav.css";
const Nav = () => {
  const user = useSelector((state) => state.authReducer.currentUser);

  const role = user ? user.user.role : "";
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar-container">
      <NavLink
        className={(navdata) => (navdata.isActive ? "active" : "")}
        to="/user/home"
      >
        Home
      </NavLink>
      {role === "user" ? (
        <NavLink
          className={(navdata) => (navdata.isActive ? "active" : "")}
          to="/user/question"
        >
          Question
        </NavLink>
      ) : (
        <NavLink
          className={(navdata) => (navdata.isActive ? "active" : "")}
          to="/admin/question"
        >
          Question
        </NavLink>
      )}
      {role === "user" ? (
        <NavLink
          className={(navdata) => (navdata.isActive ? "active" : "")}
          to="/user/profile"
        >
          Profile
        </NavLink>
      ) : (
        ""
      )}
      <NavLink
        className={(navdata) => (navdata.isActive ? "active" : "")}
        onClick={() => handleLogOut()}
        to="/login"
      >
        Logout
      </NavLink>
    </nav>
  );
};

export default Nav;
