import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AiOutlineUser } from "react-icons/ai";

import axios from "../../services/Axios";
import "./SignUp.css";

function Copyright() {
  return (
    <Typography>
      {"Copyright © "}
      <Link color="inherit" href="/">
        QDine-In
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneNo] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (username == "" || email == "" || password == "" || phoneno == "") {
      alert("Incomplete Fields");
    } else {
      const data = { username, email, password, phoneno };
      const response = await axios.post("/signup", data);
      if (response.data.token) {
        localStorage.setItem("x-access-token", response.data.token);
        window.open("/", "_self");
      } else {
        alert("Email already exist");
      }
    }
  };
  return (
    <div className="container">
      <div className="brand">
        <h1>
          <span className="q">Q</span>Dine-In
        </h1>
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
                placeholder="User Name*"
                name="username"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="inputField"
                required
                placeholder="Email Address*"
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
                required
                placeholder="Phone Number*"
                name="phoneno"
                value={phoneno}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
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
                href="/SignIn"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </div>
          <button
            type="submit"
            fullWidth
            className="submitBtn"
            onClick={handelSubmit}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
