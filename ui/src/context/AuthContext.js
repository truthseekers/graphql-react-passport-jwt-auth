// // Not sure if context is necessary with the whole localstorage setup.

// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { gql, useLazyQuery } from "@apollo/client";
// // const AuthContext = React.createContext([{}, () => {}]);
// const AuthContext = React.createContext();

// // queries / mutations needed:
// // signup, login, me, token

// const CURRENTUSER_QUERY = gql`
//   query {
//     currentUser {
//       email
//       id
//     }
//   }
// `;

// function useAuth() {
//   const context = React.useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// }

// const AuthProvider = (props) => {
//   const navigate = useNavigate();

//   const [currentUser, { called, loading, data }] =
//     useLazyQuery(CURRENTUSER_QUERY);

//   //I'm not actually using accessToken so it doesn't feel right to use state just to re-render on token changes.
//   const [accessToken, setAccessToken] = useState(
//     localStorage.getItem("accessToken")
//   );
//   const [refreshToken, setRefreshToken] = useState(
//     localStorage.getItem("refreshToken")
//   );
//   const [isRefresh, setIsRefresh] = useState(localStorage.getItem("isRefresh"));

//   const signup = async (email, password) => {
//     try {
//       const asyncResponse = await axios.post(
//         process.env.REACT_APP_API_ENDPOINT + "signup",
//         { email, password },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (asyncResponse.status === 200) {
//         localStorage.setItem("accessToken", asyncResponse.data.accessToken);
//         navigate("/privateposts");
//       }
//     } catch (error) {}
//   };

//   const login = async (email, password) => {
//     try {
//       const asyncResponse = await axios.post(
//         process.env.REACT_APP_API_ENDPOINT + "login",
//         { email, password },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (asyncResponse.status === 200) {
//         localStorage.setItem("accessToken", asyncResponse.data.accessToken);
//         localStorage.setItem("refreshToken", asyncResponse.data.refreshToken);
//         setAccessToken(asyncResponse.data.accessToken);
//         setRefreshToken(asyncResponse.data.refreshToken);
//         console.log("setAccessToken");
//         console.log("setRefreshToken");
//         navigate("/privateposts");
//       }
//     } catch (error) {}
//   };

//   const fetchCurrentUser = async () => {
//     console.log("trying to fetch current user I guess");
//     try {
//       // const asyncResponse = await axios.get(
//       //   process.env.REACT_APP_API_ENDPOINT + "me",
//       //   {
//       //     withCredentials: true,
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       //     },
//       //   }
//       // );

//       const currentUserData = await currentUser();

//       console.log("currentUserData: ", currentUserData);

//       // console.log("data.. fuck: ", data);

//       console.log("now wtf...");
//     } catch (error) {
//       console.log("error damn");
//       // console.log("ERROR in fetchCurrentUser: (401?) ", error); // should be 401?
//       // localStorage.setItem("isRefresh", true);
//       // setIsRefresh(true);
//       // console.log("set refresh...******");
//       // if (localStorage.getItem("isRefresh")) {
//       //   console.log("isRefresh set to true");
//       //   try {
//       //     console.log("trying to get refresh token.");
//       //     const asyncRefreshResponse = await axios.get(
//       //       process.env.REACT_APP_API_ENDPOINT + "token",
//       //       {
//       //         withCredentials: true,
//       //         headers: {
//       //           "Content-Type": "application/json",
//       //           Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
//       //         },
//       //       }
//       //     );

//       //     console.log(
//       //       "Setting refreshed AccessToken now. refresh response: ",
//       //       asyncRefreshResponse
//       //     );

//       //     localStorage.setItem(
//       //       "accessToken",
//       //       asyncRefreshResponse.data.accessToken
//       //     );
//       //     localStorage.setItem("isRefresh", false);
//       //     setAccessToken(asyncRefreshResponse.data.accessToken);
//       //     setIsRefresh(false);
//       //     console.log("Done with re-authenticating???");
//       //   } catch (error) {
//       //     console.log(
//       //       "refresh token is probably expired. You need to log in again."
//       //     );
//       //   }
//       // } else {
//       //   console.log("isRefresh NOT set to true");
//       // }
//     }
//   };

//   const setLocalStorage = (key, value) => {
//     localStorage.setItem(key, value);
//   };

//   const logout = () => {
//     // If a localStorage (& maybe Redis? setup is implemented, then I believe logging out can happen completely on the front end by just removing the accessToken from localStorage???)
//     // localStorage.setItem("accessToken", "");
//     setLocalStorage("accessToken", "");
//     navigate("/login");
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//     return () => {};
//   }, []);

//   const value = {
//     logout,
//     accessToken,
//     login,
//     setLocalStorage,
//     signup,
//   };

//   return (
//     <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
//   );
// };

// export { useAuth, AuthProvider };

// // options:
// // fetchCurrentUser
// // Need to figure out the frontend auth setup. Do I put everything in Context? What do I put in context?
// // The easiest way to start is to forget AuthContext, and just have duplicate code everywhere. Once you've seen how it'll work throughout the app it'll be easier to decide where to put what. So.. get rid of authContext and just import the queries where you need them.
