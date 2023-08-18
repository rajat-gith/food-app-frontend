import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      navigate("/receipes");
    } catch (error) {
      console.error("Login error:", error);
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
