import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../utils/axiosJwt";

const AddQuestion = (props) => {
  const user = useSelector((state) => state.authReducer);
  const token = user.currentUser ? user.currentUser.tokens.access.token : "";
  const dispatch = useDispatch();
  const axiosJwt = createAxios(user, dispatch, token);
  const [ques, setQues] = useState({
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctanswer: "",
  });
  const [err, setErr] = useState("");
  const handleChangeQuestion = (e) => {
    const { value } = e.target;
    setQues({ ...ques, question: value });
  };
  const handleChangeAns1 = (e) => {
    const { value } = e.target;
    setQues({ ...ques, answer1: value });
  };
  const handleChangeAns2 = (e) => {
    const { value } = e.target;
    setQues({ ...ques, answer2: value });
  };
  const handleChangeAns3 = (e) => {
    const { value } = e.target;
    setQues({ ...ques, answer3: value });
  };
  const handleChangeAns4 = (e) => {
    const { value } = e.target;
    setQues({ ...ques, answer4: value });
  };
  const handleChangeCorrect = (e) => {
    const { value } = e.target;
    setQues({ ...ques, correctanswer: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      ques.correctanswer === ques.answer1 ||
      ques.correctanswer === ques.answer2 ||
      ques.correctanswer === ques.answer3 ||
      ques.correctanswer === ques.answer4
    ) {
      if (props.token) {
        const config = { Authorization: `Bearer ${props.token}` };

        axiosJwt
          .post("https://fwaec-survey.herokuapp.com/v1/questions/edit", ques, {
            headers: config,
          })
          .then((res) => {
            setQues({
              question: "",
              answer1: "",
              answer2: "",
              answer3: "",
              answer4: "",
              correctanswer: "",
            });
            setErr("");

            props.handleChangeQuestionId(res.data.id);
            props.handleToggle();
          })
          .catch((err) => setErr(err));
      }

      return;
    }
    setErr("Dap an phai trung voi cau tra loi");
  };
  const handleToggle = () => {
    props.handleToggle();
  };
  return (
    <>
      {props.toggle ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Nhap ten cau hoi</label>
          <input
            required
            value={ques.question}
            type="text"
            onChange={(e) => handleChangeQuestion(e)}
            placeholder="Nhap ten cau hoi"
          />
          <label>Nhap cau tra loi 1</label>
          <input
            required
            value={ques.answer1}
            type="text"
            onChange={(e) => handleChangeAns1(e)}
            placeholder="Nhap cau tra loi 1"
          />
          <label>Nhap cau tra loi 2</label>
          <input
            required
            value={ques.answer2}
            type="text"
            onChange={(e) => handleChangeAns2(e)}
            placeholder="Nhap cau tra loi 2"
          />
          <label>Nhap cau tra loi 3</label>
          <input
            required
            value={ques.answer3}
            type="text"
            onChange={(e) => handleChangeAns3(e)}
            placeholder="Nhap cau tra loi 3"
          />
          <label>Nhap cau tra loi 4</label>
          <input
            required
            value={ques.answer4}
            type="text"
            onChange={(e) => handleChangeAns4(e)}
            placeholder="Nhap cau tra loi 4"
          />
          <label>Nhap dap an</label>
          <input
            required
            value={ques.correctanswer}
            type="text"
            onChange={(e) => handleChangeCorrect(e)}
            placeholder="Nhap dap an"
          />
          {err ? <span className="err-text">{err}</span> : ""}
          <button type="submit">Them cau hoi</button>
          <button onClick={() => handleToggle()}>Dong</button>
        </form>
      ) : (
        <button onClick={() => handleToggle()}>Them cau hoi</button>
      )}
    </>
  );
};

export default AddQuestion;
