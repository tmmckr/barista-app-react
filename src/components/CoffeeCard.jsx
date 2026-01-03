import React from 'react';

export default function CoffeeCard({ coffee, isFav, onOrder, onToggleFav }) {
  
  // Funktion um die Stärke-Punkte (Dots) zu generieren
  const renderDots = (strength) => {
    if (strength === 0) return null;
    
    let dots = [];
    for (let i = 1; i <= 5; i++) {
        dots.push(
            <span key={i} className={i <= strength ? "dot-filled" : "dot-empty"}>•</span>
        );
    }
    
    return (
        <div className="strength-container">
            STÄRKE <span className="dots">{dots}</span>
        </div>
    );
  };

  return (
    <div className="coffee-card scroll-reveal visible" onClick={() => onOrder(coffee)}>
        
        {/* Herz Button */}
        <div 
            className={`fav-btn ${isFav ? 'fav-active' : ''}`} 
            onClick={(e) => {
                e.stopPropagation(); // Verhindert, dass sich das Bestellfenster öffnet
                onToggleFav(coffee.name);
            }}
        >
            {isFav ? "❤️" : "🤍"}
        </div>

        <div className="name">{coffee.name}</div>
        <div className="desc">{coffee.desc}</div>
        
        {renderDots(coffee.strength)}
    </div>
  );
}