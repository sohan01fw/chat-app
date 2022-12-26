import React, { useState } from "react";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const nav = useNavigate();
  const [userInput, setuserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  let name, value;
  const inputData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    const { name, email, password } = userInput;
    e.preventDefault();

    const data = await axios.post(registerRoute, {
      name,
      email,
      password,
    });

    if (data.status !== 200) {
      alert("error");
    } else {
      localStorage.setItem("chat-app-user", JSON.stringify(data.data.saveUser));
      nav("/login");
    }
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            name="name"
            onChange={inputData}
            id="name"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={inputData}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={inputData}
            placeholder="password"
          />

          <button onClick={handleSubmit} type="submit">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
