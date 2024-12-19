import { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Modal, Box, Button, Typography } from "@mui/material";
import "./App.css"
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Products from "./components/product/Product";
// import Cart from "./components/Cart"; // Sepet sayfası

const App = () => {
  const [token, setToken] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleRegister = (token) => {
    setToken(token);
    setOpenRegisterModal(false);
  };

  const handleLogin = (token) => {
    setToken(token);
    setOpenLoginModal(false);
  };

  const handleModalClose = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(false);
  };

  return (
    <Router>
      <div>
        <header className="header">
          <Link to="/">E-Commerce</Link>
          <div>
            {!token ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setOpenRegisterModal(true)}
                >
                  Register
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenLoginModal(true)}
                  style={{ marginLeft: "10px" }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" style={{ marginLeft: "10px" }}>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button variant="outlined" style={{ marginLeft: "10px" }}>
                  <Link to="/cart">Cart</Link>
                </Button>
              </>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/profile" element={<Profile token={token} />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>

        <Modal open={openRegisterModal} onClose={handleModalClose}>
          <Box
            sx={{
              maxWidth: 400,
              margin: "50px auto",
              background: "#fff",
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Register
            </Typography>
            <Register onRegister={handleRegister} />
          </Box>
        </Modal>

        <Modal open={openLoginModal} onClose={handleModalClose}>
          <Box
            sx={{
              maxWidth: 400,
              margin: "50px auto",
              background: "#fff",
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Login
            </Typography>
            <Login onLogin={handleLogin} />
          </Box>
        </Modal>
      </div>
    </Router>
  );
};

export default App;
