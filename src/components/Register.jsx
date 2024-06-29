import React, { useState } from "react";
import "../styles/style.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [suscess, setSuscess] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Image002 =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXd4M2thenowdDZzOWVtNjBhemtjbGhkNDhnZWlvbTM4MnpudG4yZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VIKOfvqJHcVDrdVivT/giphy.webp";

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (formData.username.length <= 4) {
      newErrors.username = "Username have to be at least 4 characters";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const timestamp = Date.now();
      let allFormData = JSON.parse(localStorage.getItem("allFormData")) || {};

      allFormData = {
        ...allFormData,
        [timestamp]: formData,
      };
      localStorage.setItem("allFormData", JSON.stringify(allFormData));

      // console.log("Successfully registered:", formData);

      setSuscess(true);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="Register">
      <div className="login-container">
        <div className="text">
          <h1 className="register">Register</h1>
        </div>
        <div className="register-content">
          <div className="register-img">
            <img src={Image002} alt="the coding" className="login-img" />
          </div>
          <div className="register-form">
            <div className="register-container">
              <form className="input-group" onSubmit={handleSubmit}>
                <div className="input-field-group">
                  <h1 className="title">Username</h1>
                  <input
                    type="text"
                    name="username"
                    className="input"
                    placeholder="Username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
                <div className="input-field-group">
                  <h1 className="title">Email</h1>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email address"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="input-field-group">
                  <h1 className="title">Password</h1>
                  <input
                    type="password"
                    className="input"
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <button type="submit" className="btn">
                  Register
                </button>
              </form>
            </div>
            <div className="register-link link">
              <span>Already have a account?</span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>

      {suscess && (
        <div className="success-message">
          <div className="success-container">
            <span>
              <IoClose
                onClick={() => setSuscess(false)}
                className="close-btn"
              />
            </span>
            <img
              src="https://media.giphy.com/media/oGO1MPNUVbbk4/giphy.gif?cid=ecf05e47st7sv5kqt8cbdg1v9itw70krlharz1p2vu4pt7ui&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="successful"
            />
            <h2>Registration Successful!</h2>
            <Link to="/login">
              <button
                type="button"
                onClick={() => setSuscess(false)}
                className="btn"
              >
                Ok
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
