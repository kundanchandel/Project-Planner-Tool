import React from "react";
import "./header.css";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
export default function Header() {
  // const classes = useStyles();

  const handleLogout = () => {
    localStorage.setItem("x-access-token", "");
    window.open("/", "_self");
  };
  return (
    <header class="header">
      <Link to="/" className="brand">
        <img src={logo} className="brandImg" />
      </Link>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <Link to="/cart">My Cart</Link>
        </li>
        <li>
          <Link>Profile</Link>
        </li>
        <li
          onClick={() => {
            handleLogout();
          }}
        >
          <Link href="#">Log Out</Link>
        </li>
      </ul>
    </header>
  );
}
