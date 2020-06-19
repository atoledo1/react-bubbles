import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "./axioswithAuth";

const Login = () => {
  const [user, setUser] = useState({
    credentials: {
      username: "",
      password: "",
    },
  });

  const history = useHistory();

  const handleChange = (e) => {
    setUser({
      credentials: {
        ...user.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/login", user.credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);
        history.push("/bubblepage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Log in here:</h2>
      <form onSubmit={login}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.credentials.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
