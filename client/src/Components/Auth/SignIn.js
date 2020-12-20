import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineUser } from "react-icons/ai";
import axios from "../../services/Axios";
import logo from "../../Assets/logo.png";

import "./SignIn.css";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Incomplete Fields");
    } else {
      const data = { email, password };
      const response = await axios.post("/login", data);
      if (response.data.token) {
        console.log(response);
        localStorage.setItem("x-access-token", response.data.token);
        window.open("/", "_self");
      } else {
        alert("Invalid Email or Password");
      }
    }
  };

  const handleForgotCLick = async () => {
    if (email != "") {
      const response = await axios.post("/forgotpassword", { email });
      if (response.data.err) {
        window.alert(response.data.err);
      } else {
        window.alert("An email has been sent to given mail Id");
      }
    } else {
      window.alert("Email field is required!!!");
    }
  };

  return (
    <div className="container">
      <div className="brand">
        <img src={logo} className="brandImg"/>
      </div>
      <div className="form">
        <div className="avtar">
          <AiOutlineUser className="avtarLogo" />
        </div>
        <form noValidate>
          <div>
            <div>
              <input
                className="inputField"
                required
                placeholder="Email*"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="inputField"
                placeholder="Password*"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="linkContainer">
            <div className="link">
              <Link
                style={{ color: "#1492e6", fontSize: "12px" }}
                href="/SignUp"
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="link">
              <Link
                style={{ color: "#1492e6", fontSize: "12px" }}
                onClick={handleForgotCLick}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            fullWidth
            className="submitBtn"
            onClick={handelSubmit}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
