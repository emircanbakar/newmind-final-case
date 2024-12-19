/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = ({ onLogin, setActiveModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      onLogin(response.data.token);
    } catch (err) {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" fullWidth>
        Login
      </Button>
      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default Login;
