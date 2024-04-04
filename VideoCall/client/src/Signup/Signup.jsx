import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authUserAtom } from "../store/authUser";

const Signup = () => {
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      setAuthUser({
        id,
        firstName,
        profile_pic: "#fa8100",
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/chatroom");
  };

  return (
    <div>
      <form className="signup">
        <h1>SIGNUP</h1>
        <br />
        <input
          type="text"
          placeholder="id"
          value={id}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            submitHandler();
          }}
          disabled={!id && !firstName && true}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
