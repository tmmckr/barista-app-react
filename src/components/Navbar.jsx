import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Diese Funktion prüft: "Bin ich gerade auf dieser Seite?"
  // Falls ja, bekommt der Link die Klasse "active" (wird meist hervorgehoben)
  const getLinkClass = (path) => {
      return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
        {/* Link 1: Bestellen (Startseite) */}
        <Link to="/" className={getLinkClass('/')}>
            Bestellen
        </Link>

        {/* Link 2: Maschine */}
        <Link to="/maschine" className={getLinkClass('/maschine')}>
            Maschine
        </Link>
        
        {/* Link 3: Bohnen - HIER LAG VERMUTLICH DER FEHLER */}
        <Link to="/bohnen" className={getLinkClass('/bohnen')}>
            Bohnen
        </Link>
        
        {/* Link 4: Gläser - JETZT AKTIVIEREN */}
        <Link to="/glaeser" className={getLinkClass('/glaeser')}>
            Gläser
        </Link>
    </nav>
  );
}