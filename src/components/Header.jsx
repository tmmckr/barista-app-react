// src/components/Header.jsx
import React from 'react';

export default function Header({ onOpenMenu, currentUser, onLogin }) {
  return (
    <>
      <h1>Timo's</h1>
      <div className="subtitle">Barista Bar</div>

      {/* Wenn NICHT eingeloggt -> Login Button anzeigen */}
      {!currentUser && (
          <button 
            onClick={onLogin} 
            className="btn-primary" 
            style={{ 
                position: 'absolute', top: '20px', right: '20px', 
                padding: '5px 10px', fontSize: '0.8rem', width: 'auto' 
            }}
          >
            Login 🔑
          </button>
      )}

      {/* Wenn eingeloggt -> Hamburger Menü anzeigen */}
      {currentUser && (
        <div className="hamburger-btn" onClick={onOpenMenu}>
            {/* Kleines Profilbild wenn vorhanden, sonst Hamburger */}
            {currentUser.photoURL ? 
                <img src={currentUser.photoURL} alt="User" style={{width:'30px', borderRadius:'50%'}} /> 
                : "☰"}
        </div>
      )}
    </>
  );
}