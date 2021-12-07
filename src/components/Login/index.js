import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const logging = async () => {
    const res = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });

    const data = {
      user: res.data.result,
      token: res.data.token,
    };

    dispatch(login(data));

    navigate("/tasks");
  };

  return (
    <div className="logMainDiv">
      <h1> Log in</h1>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logging}>Login</button>
    </div>
  );
};

export default Login;
