import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
      }
      accessToken
      refreshToken
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    await login({
      variables: { email, password },
      onCompleted: (data) => {
        console.log("completed login? data...", data);

        localStorage.setItem("accessToken", data.login.accessToken);
        localStorage.setItem("refreshToken", data.login.refreshToken);
        localStorage.setItem("isRefresh", false);
        navigate("/privateposts");
      },
    });
  };

  return (
    <>
      <NavBar />
      <h3>
        Use "email" as email and "password" as password (don't include quotes)
      </h3>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Login;
