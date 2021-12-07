import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("61a60b7752ebd90581f0ff06");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  console.log(setRole);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getUsers = async () => {
    const user = await axios.get(`${BASE_URL}/users`);
    setAllUsers(user.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    let exist = false;

    // eslint-disable-next-line
    allUsers.filter((user) => {
      if (user.email === email) {
        exist = true;
      }
    });

    if (exist) {
      Swal.fire({
        title: "Email already registred, use another email or Log in please.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      // navigate("/signin");
    }
    if (!exist) {
      const regData = {
        email: email,
        password: password,
        role,
      };
      // eslint-disable-next-line
      const res = await axios
        .post(`${BASE_URL}/regster`, regData)
        .then((res) => console.log(res));

      navigate("/login");
    }
  };

  return (
    <div className="mainRegDiv">
      <div className="regFormDiv">
        <h1> Registration</h1>

        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signUp}>Register</button>
      </div>
    </div>
  );
};

export default Register;
