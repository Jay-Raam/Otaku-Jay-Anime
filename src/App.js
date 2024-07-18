import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Anime from "./components/anime";
import Login from "./components/login";
import "./styles/style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isMobile) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#000",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          border: "none",
        }}
      >
        <p>
          This site is optimized for desktop. Some features may not work
          optimally on mobile devices.
        </p>
      </div>
    );
  }

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          {isLoggedIn ? (
            <Route path="/anime" element={<Anime />} />
          ) : (
            <Route path="/anime" element={<Navigate to="/login" />} />
          )}
          <Route path="/*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
