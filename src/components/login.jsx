import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Image001 =
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWNjOXBjcmp0Y2w5ZmU1YTFsdHVzejdoNjRsbGh3MGRsbXNzbTA4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3owyp2SViuDIGh8YoM/giphy.webp";

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedFormData =
      JSON.parse(localStorage.getItem("allFormData")) || {};

    const { username, password } = formData;

    if (storedFormData) {
      const users = Object.values(storedFormData);

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        alert("Login successful!");
        setFormData({
          username: "",
          password: "",
        });
        setError("");
        handleLogin();
        navigate("/anime");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } else {
      setError("No registered users found.");
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <div className="text">
          <h1 className="register">Login</h1>
        </div>
        <div className="login-content">
          <div className="image">
            <img src={Image001} alt="the girl" className="login-img" />
          </div>
          <div className="login-form">
            <form className="input-group" onSubmit={handleSubmit}>
              <div className="input-field-group">
                <h1 className="title">Username</h1>
                <input
                  type="text"
                  name="username"
                  className="input"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field-group">
                <h1 className="title">Password</h1>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && <span className="error">{error}</span>}
              <button type="submit" className="btn">
                Login
              </button>
            </form>

            <div className="register-link link">
              <span>
                Create a account? <Link to="/">Register</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
