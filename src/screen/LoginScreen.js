import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  // console.log(userInfo);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    console.log(userInfo);
    if (userInfo.status === "ok") {
      alert("Logged In Successfully");
      navigate("/receipes");
    }
    if (userInfo.status === "error") {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="LoginScreen">
      <div className="container">
        <h2 className="heading">User Login</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <TextField
              label="Email Address"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mui-input"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mui-input"
              variant="outlined"
              type="password"
              fullWidth
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mui-button"
          >
            Login
          </Button>
          <p>
            Don't Have an Account <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
