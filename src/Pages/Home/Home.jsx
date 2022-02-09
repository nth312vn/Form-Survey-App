import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

import { useSelector } from "react-redux";
import "./home.css";
import { useEffect } from "react";
const Home = () => {
  const user = useSelector((state) => state.authReducer.currentUser);
  const token = user ? user.tokens.access.token : "";
  const role = user ? user.user.role : "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Nav />
      <div className="home-container">
        <h1>Welcom to Form Survey</h1>
        {role === "user" ? (
          <Link to="/user/question" className="home-link">
            Go to Question Now
          </Link>
        ) : (
          ""
        )}
        {role === "admin" ? <Link to="/admin/question">questionad</Link> : ""}
      </div>
    </>
  );
};

export default Home;
