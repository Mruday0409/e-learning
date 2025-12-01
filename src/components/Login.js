import React, { useState } from 'react';
import { X } from 'lucide-react';
import './Login.css';

function Login({ onLogin, onClose, isModal = false }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { username, password, rememberMe });
    // For now, just call onLogin to proceed to home page
    if (username && password) {
      onLogin(username);
      if (onClose) {
        onClose();
      }
    }
  };

  const loginForm = (
    <>
      <div className="header-section">
        <div className="graduation-cap-icon">🎓</div>
        <h1 className="main-title">
          <span className="title-e">E</span>
          <span className="title-learning">-Shala</span>
        </h1>
      </div>

      <div className="login-form-container">
        <a href="#" className="create-account-link">Create an account</a>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="input-icon person-icon"></span>
            <input
              type="text"
              className="input-field"
              placeholder="Username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="input-wrapper">
            <span className="input-icon lock-icon"></span>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
          
          <div className="form-footer">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="need-help-link">Need help?</a>
          </div>
        </form>
      </div>
    </>
  );

  if (isModal) {
    return (
      <div className="login-page login-modal-fullpage">
        {onClose && (
          <button className="login-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        )}
        <div className="background-icons">
          {/* Educational icons overlay - white outlined style */}
          <svg className="icon-monitor" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <rect x="10" y="15" width="80" height="60" rx="2"/>
            <rect x="15" y="20" width="70" height="50" rx="1"/>
            <line x1="30" y1="75" x2="70" y2="75"/>
            <rect x="40" y="75" width="20" height="5" rx="1"/>
          </svg>
          <svg className="icon-graduation" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <path d="M50 20 L30 30 L30 50 L50 60 L70 50 L70 30 Z"/>
            <circle cx="50" cy="40" r="15"/>
            <line x1="50" y1="60" x2="50" y2="80"/>
          </svg>
          <svg className="icon-atom" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <circle cx="50" cy="50" r="8"/>
            <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(0 50 50)"/>
            <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(120 50 50)"/>
          </svg>
          <svg className="icon-pencil" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <line x1="20" y1="80" x2="60" y2="40"/>
            <line x1="60" y1="40" x2="70" y2="30"/>
            <line x1="70" y1="30" x2="80" y2="40"/>
            <line x1="80" y1="40" x2="70" y2="50"/>
          </svg>
          <svg className="icon-book" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <rect x="25" y="20" width="50" height="60" rx="2"/>
            <line x1="25" y1="35" x2="75" y2="35"/>
            <line x1="25" y1="50" x2="75" y2="50"/>
            <line x1="25" y1="65" x2="75" y2="65"/>
            <line x1="50" y1="20" x2="50" y2="80"/>
          </svg>
          <svg className="icon-award" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
            <circle cx="50" cy="40" r="20"/>
            <path d="M50 60 L40 80 L50 75 L60 80 Z"/>
          </svg>
        </div>
        <div className="login-container">
          {loginForm}
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="background-icons">
        {/* Educational icons overlay - white outlined style */}
        <svg className="icon-monitor" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <rect x="10" y="15" width="80" height="60" rx="2"/>
          <rect x="15" y="20" width="70" height="50" rx="1"/>
          <line x1="30" y1="75" x2="70" y2="75"/>
          <rect x="40" y="75" width="20" height="5" rx="1"/>
        </svg>
        <svg className="icon-graduation" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <path d="M50 20 L30 30 L30 50 L50 60 L70 50 L70 30 Z"/>
          <circle cx="50" cy="40" r="15"/>
          <line x1="50" y1="60" x2="50" y2="80"/>
        </svg>
        <svg className="icon-atom" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <circle cx="50" cy="50" r="8"/>
          <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(0 50 50)"/>
          <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="30" ry="15" transform="rotate(120 50 50)"/>
        </svg>
        <svg className="icon-pencil" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <line x1="20" y1="80" x2="60" y2="40"/>
          <line x1="60" y1="40" x2="70" y2="30"/>
          <line x1="70" y1="30" x2="80" y2="40"/>
          <line x1="80" y1="40" x2="70" y2="50"/>
        </svg>
        <svg className="icon-book" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <rect x="25" y="20" width="50" height="60" rx="2"/>
          <line x1="25" y1="35" x2="75" y2="35"/>
          <line x1="25" y1="50" x2="75" y2="50"/>
          <line x1="25" y1="65" x2="75" y2="65"/>
          <line x1="50" y1="20" x2="50" y2="80"/>
        </svg>
        <svg className="icon-award" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
          <circle cx="50" cy="40" r="20"/>
          <path d="M50 60 L40 80 L50 75 L60 80 Z"/>
        </svg>
      </div>
      <div className="login-container">
        {loginForm}
      </div>
    </div>
  );
}

export default Login;
