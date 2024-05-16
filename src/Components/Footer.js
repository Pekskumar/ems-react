import React from "react";
import SportsIcon from "../Assets/Images/SportsIcon";
import LinkedIcin from "../Assets/Images/LinkedIcin";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="footer-main d-flex  py-4 pe-3   justify-content-between
    align-items-center"
    >
      <span className="m-0">© Mr. Pek's 2024 All rights reserved</span>
      <Link target="_blank" to="https://www.linkedin.com/in/pek-s-kumar-ba2636125/">
        <LinkedIcin />
      </Link>
    </div>
  );
};

export default Footer;
