import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/actions";

import "../Styles/login.scss";

import logo from "../public/logo.png";
import CustomButton from "../Components/CustomButton";

export default function Login(props) {
  const { history } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => dispatch(loginUser({ email, password, history }));

  const result = useSelector((state) => state.auth);

  return (
    <Grid className="login-contents">
      <img alt="twitter" src={logo} className="logo" />
      <h1>Log in to Twitter</h1>
      <Grid item mt={5}>
        <TextField
          className="input-form "
          sx={{ marginBottom: 3 }}
          label="Email, or Username"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="input-form"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {result.message && result.message !== "success" && (
          <p style={{ color: "red", marginBottom: 0 }}>
            Incorrect username or password
          </p>
        )}
        <CustomButton onClick={login} sx={{ marginTop: 3 }}>
          Login
        </CustomButton>

        <p className="text-center">
          <Link to="">Forgot Password?</Link> .{" "}
          <Link to="/welcome">Sign Up for Twitter</Link>
        </p>
      </Grid>
    </Grid>
  );
}
