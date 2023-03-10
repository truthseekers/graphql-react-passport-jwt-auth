import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
// import { useAuth } from "./context/AuthContext";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const CURRENTUSER_QUERY = gql`
  query {
    currentUser {
      email
      id
    }
  }
`;

const TOKEN_MUTATION = gql`
  mutation {
    token
  }
`;

const PrivatePosts = () => {
  // const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentUser, { called, loading, data, refetch }] =
    useLazyQuery(CURRENTUSER_QUERY);
  const [refreshTokenMutation, { data: refreshData }] =
    useMutation(TOKEN_MUTATION);

  const getCurrentUser = async () => {
    if (!called) {
      currentUser({
        onCompleted: (data) => {
          console.log("data in currentUser call", data);
          setEmail(data.currentUser?.email);

          console.log("currentUser oncompleted");
          if (!data.currentUser) {
            localStorage.setItem("isRefresh", true);
            refreshTokenMutation({
              onCompleted: (data) => {
                localStorage.setItem("accessToken", data.token);
                localStorage.setItem("isRefresh", "false");

                console.log("before refetch");
                refetch();
                console.log("after refetch. data: ", data);

                if (!data.token) {
                  navigate("/login");
                }
              },
            });
          }
        },
      });
    }
  };

  getCurrentUser();

  return (
    <div>
      <NavBar />
      PrivatePosts. Current user is?
      <h3>Email: {email}</h3>
    </div>
  );
};

export default PrivatePosts;
