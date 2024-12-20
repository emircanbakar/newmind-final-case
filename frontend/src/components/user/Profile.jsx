import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = token ? jwtDecode(token).id : null; 
        const response = await axios.get(
          `http://localhost:8000/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data); 
      } catch (err) {
        setError("Error fetching user profile");
      }
    };

    if (token && userId) {
      fetchUserProfile();
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = token ? jwtDecode(token).id : null;
      const response = await axios.put(
        `http://localhost:8000/api/users/profile/${userId}`,
        {
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Error updating profile");
      setSuccess("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Profile Settings
          </Typography>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" gutterBottom>
              {success}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Update Profile
            </Button>
          </form>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="subtitle1">
              <strong>Current Username:</strong> {user.username}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Current Email:</strong> {user.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
