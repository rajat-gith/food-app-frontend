import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/UserActions";
import { ClipLoader } from "react-spinners";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      if (userInfo.status === "ok") {
        navigate("/login");
      } else {
        alert("Invalid Credentials");
      }
    }
  }, [userInfo]);

  return (
    <div className="RegisterScreen">
      <div className="Registercontainer">
        {loading === true ? (
          <ClipLoader className="loader" color="blue" />
        ) : null}
        <h2 className="heading">User Registration</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <TextField
              label="Full Name"
              id="name"
              disabled={loading}
              value={name}
              onChange={handleNameChange}
              className="mui-input"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email Address"
              id="email"
              value={email}
              disabled={loading}
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
              disabled={loading}
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
