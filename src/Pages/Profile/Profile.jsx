import React from "react";
import { useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./Profile.css";
import { createAxios } from "../../utils/axiosJwt";
import { useRef } from "react";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.currentUser);
  const token = user ? user.tokens.access.token : "";
  const ref = useRef();
  const dispatch = useDispatch();
  const id = user ? user.user.id : "";
  const [toggle, setToggle] = useState(false);

  const [userData, setUserData] = useState({});
  const [avatarImg, setAvartarImg] = useState("");
  const axiosJwt = createAxios(user, dispatch, token);

  useEffect(() => {
    if (user && token && id) {
      const config = { Authorization: `Bearer ${token}` };
      axiosJwt
        .get(`https://fwaec-survey.herokuapp.com/v1/users/${id}`, {
          headers: config,
        })

        .then((res) => {
          setUserData(res.data);
          setAvartarImg(res.data.avatar);
        });
    }
  }, []);
  const resetInput = () => {
    ref.current.value = "";
  };
  const handleChangeImg = (e) => {
    const value = e.target.files[0];

    if (value) {
      const formData = new FormData();
      formData.append("file", value);
      console.log(formData);

      axiosJwt
        .post("https://fwaec-survey.herokuapp.com/v1/file/upload", formData)
        .then((res) => {
          setAvartarImg(res.data.imagePath);
          resetInput();
        });
    }
  };

  const handleSubmit = () => {
    if (userData) {
      const id = userData.id;
      const config = { Authorization: `Bearer ${token}` };
      const newUser = {
        email: userData.email,
        name: userData.username,
        avatar: avatarImg,
      };
      console.log(newUser, id);
      axiosJwt
        .patch(`https://fwaec-survey.herokuapp.com/v1/users/${id}`, newUser, {
          headers: config,
        })
        .then((res) => {
          setUserData(res.data);
          setToggle(!toggle);
        });
    }
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Nav />
      <div className="main-profile">
        <h2>Your Email:{userData.email}</h2>
        <h2>Your Id:{userData.id}</h2>

        <h2>Your User Name:{userData.username}</h2>
        <h2>Your Score:{userData.score}</h2>

        <h2>Your Role:{userData.role}</h2>

        {!toggle ? (
          <>
            <img className="img-avatar" src={userData.avatar} alt="anh" />
            <button onClick={() => handleToggle()}>cap nha anh</button>
          </>
        ) : (
          <>
            <img className="img-avatar" src={avatarImg} alt="anh" />
            <input
              type="file"
              placeholder="chon anh"
              ref={ref}
              onChange={(e) => handleChangeImg(e)}
            />
            <button onClick={() => handleSubmit()}>cap nhat avatar</button>
            <button onClick={() => handleToggle()}>dong</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
