import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Copyright = ({ text }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright">
      <p className="copyright-para">
        &copy; {currentYear} Copyright Received By
        <Link
          to="https://jay-raam.github.io/Jayasriraam"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </Link>
      </p>
    </div>
  );
};

export default Copyright;
