import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// console.log("ai url: ", process.env.REACT_APP_API_URL);

// const client = new ApolloClient({
//   // uri: "https://e393-23-162-0-117.ngrok.io/", // only need ngrok for react-native
//   uri: process.env.REACT_APP_API_URL, //"http://localhost:4000/",
//   // uri: "https://flyby-gateway.herokuapp.com/",
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const isRefresh = localStorage.getItem("isRefresh") === "true" ? true : false;

  return {
    headers: {
      ...headers,
      authorization: isRefresh
        ? `Bearer ${refreshToken}`
        : `Bearer ${accessToken}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        {/* <AuthProvider> */}
        <App />
        {/* </AuthProvider> */}
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
