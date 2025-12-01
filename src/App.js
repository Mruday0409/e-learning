import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username || 'User');
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="App">
      <Navbar 
        onLogin={handleLoginClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />
      {showLoginModal && (
        <Login 
          onLogin={handleLogin}
          onClose={handleCloseLogin}
          isModal={true}
        />
      )}
      <Home />
    </div>
  );
}

export default App;
