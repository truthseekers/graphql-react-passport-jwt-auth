import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation {
    signup(
      firstName: "Jen3"
      lastName: "Barber3"
      email: "jen@barber.com11"
      password: "qwerty"
    ) {
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

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    await signup({
      variables: { email, password },
      onCompleted: (data) => {
        console.log("completed login? data...", data);
        console.log("data.signup:", data.signup);
        console.log("data.signup.accessToken:", data.signup.accessToken);

        localStorage.setItem("accessToken", data.signup.accessToken);
        localStorage.setItem("refreshToken", data.signup.refreshToken);
        localStorage.setItem("isRefresh", false);
        navigate("/privateposts");
      },
    });
  };

  return (
    <>
      <NavBar />
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Signup;
