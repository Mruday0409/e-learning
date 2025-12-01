import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Menu, X, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLogin, isLoggedIn, userName, onLogout }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <span className="navbar-logo">E-Shala</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <div className="navbar-links">
            <a href="#home" className="navbar-link">Home</a>
            <a href="#features" className="navbar-link">Features</a>
            <a href="#about" className="navbar-link">About</a>
          </div>

          {/* Login/User Section */}
          <div className="navbar-auth">
            {isLoggedIn ? (
              <div className="navbar-user" ref={profileRef}>
                <button 
                  className="navbar-user-button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <User size={18} />
                  <span className="navbar-user-name">{userName || 'User'}</span>
                </button>
                {showProfileMenu && (
                  <div className="navbar-profile-menu">
                    <button onClick={onLogout} className="navbar-profile-menu-item">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLogin} className="navbar-login-btn">
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="navbar-mobile-menu">
          <a href="#home" className="navbar-mobile-link" onClick={() => setShowMobileMenu(false)}>Home</a>
          <a href="#features" className="navbar-mobile-link" onClick={() => setShowMobileMenu(false)}>Features</a>
          <a href="#about" className="navbar-mobile-link" onClick={() => setShowMobileMenu(false)}>About</a>
          <div className="navbar-mobile-auth">
            {isLoggedIn ? (
              <>
                <div className="navbar-mobile-user">
                  <User size={18} />
                  <span>{userName || 'User'}</span>
                </div>
                <button onClick={onLogout} className="navbar-mobile-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={onLogin} className="navbar-mobile-login-btn">
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

