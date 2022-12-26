import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const Signin = () => {
  const nav = useNavigate();
  const [userInput, setuserInput] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const inputData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setuserInput({ ...userInput, [name]: value });
  };
  useEffect(() => {
    if (localStorage.getItem("user-login")) {
      nav("/chat");
    }
  }, [nav]);

  const submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;
    const loginUser = await axios.post("/login", {
      email,
      password,
    });
    console.log(loginUser);
    if (loginUser.status === 200) {
      localStorage.setItem(
        "user-login",
        JSON.stringify(loginUser.data.findUserExist)
      );
      nav("/avatar");
    }
  };
  return (
    <div>
      <div>
        <div>
          <input
            type="email"
            name="email"
            onChange={inputData}
            id="email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={inputData}
            id="password"
            placeholder="password"
          />
          <button onClick={submitLogin} type="submit">
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
