import React from "react";
import "../Styles/header.css";
import  logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <nav className="nav-bar">
        <div className="logo-container">
            <img src={logo} alt="logo" />
        </div>
        <ul className="nav-links">
          <a href="#" className="news">NEWS</a>
          <button>Login</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;