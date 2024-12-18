import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [token, setToken] = useState(null);

  const handleRegister = (token) => {
    setToken(token);
  };

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <>
          <Register onRegister={handleRegister} />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <Profile token={token} />
      )}
    </div>
  );
};

export default App;
