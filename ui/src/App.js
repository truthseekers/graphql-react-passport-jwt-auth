import "./App.css";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import PrivatePosts from "./PrivatePosts";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const POSTS_QUERY = gql`
  query {
    songs {
      id
      title
      artist
    }
  }
`;

const CURRENTUSER_QUERY = gql`
  query {
    currentUser {
      email
      id
    }
  }
`;

const HomeRoute = () => {
  return (
    <div>
      <h2>Bro?</h2>
      <NavBar />
    </div>
  );
};

function App() {
  const [currentUser, { called, loading, data }] =
    useLazyQuery(CURRENTUSER_QUERY);

  return (
    <div style={{ background: "yellowgreen" }}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privateposts" element={<PrivatePosts />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
