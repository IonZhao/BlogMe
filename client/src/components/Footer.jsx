import React from "react";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="logo"></img>
      <span>
        Made with ❤ Yang and <b>React.js</b>
      </span>
    </footer>
  );
};
export default Footer;
