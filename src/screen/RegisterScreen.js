import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    try {
      // Send registration data to backend
      const response = await axios.post("http://localhost:3000/api/register", {
        name: name,
        email: email,
        password: password,
      });

      // Handle response from the backend (you can show a success message or redirect to login)
      console.log(response.data);
      navigate("/receipes");
    } catch (error) {
      // Handle registration error (show error message, etc.)
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="LoginScreen">
      <div className="container">
        <h2 className="heading">User Registration</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <TextField
              label="Full Name"
              id="name"
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
