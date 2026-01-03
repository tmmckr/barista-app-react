import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ currentUser, onLoginClick }) {
  const navigate = useNavigate();

  // Redirect wenn User schon eingeloggt ist
  useEffect(() => {
    if (currentUser) {
      navigate('/'); 
    }
  }, [currentUser, navigate]);

  return (
    <div>
      
      {/* --- BACKGROUND BLOBS (Aus deiner CSS) --- */}
      <div className="aurora-blob blob-1"></div>
      <div className="aurora-blob blob-2"></div>
      <div className="aurora-blob blob-3"></div>

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="brand-badge">Private Coffee Club</div>
        
        <div className="logo-container">
          {/* Pfad zum Logo anpassen, falls nötig */}
          <img src="/assets/img/logo.jpg" alt="Timo's Barista Bar Logo" className="hero-logo" />
        </div>

        <p className="hero-desc">
          Willkommen in Timo's Barista Bar. Bestelle deinen Lieblingskaffee per App, sammle Stempel und tracke deinen Koffein-Haushalt. Exklusiv für Freunde & Familie.
        </p>

        <div className="cta-group">
          {/* Button ruft Login-Modal auf */}
          <button 
            onClick={onLoginClick} 
            className="btn-primary"
            style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Jetzt bestellen ☕
          </button> 
          
          <a href="#features" className="btn-secondary">Mehr erfahren</a>
        </div>

        {/* --- APP MOCKUP (Wie im Screenshot 1) --- */}
        <div className="app-mockup">
          {/* Zeile 1: Status */}
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:'10px'}}>
            <span style={{color:'#d4b483', fontWeight:'bold'}}>Status:</span>
            <span style={{color:'#4ade80'}}>● Barista bereit</span>
          </div>
          
          {/* Zeile 2: Beispiel Bestellung */}
          <div style={{background:'rgba(255,255,255,0.05)', padding:'15px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'15px'}}>
            <div style={{fontSize:'2rem'}}>☕</div>
            <div style={{textAlign:'left'}}>
              <div style={{color:'#fff', fontWeight:'bold'}}>Cappuccino</div>
              <div style={{color:'#888', fontSize:'0.8rem'}}>Stärke: •••</div>
            </div>
            <div style={{marginLeft:'auto', color:'#d4b483'}}>+</div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION (Wie im Screenshot 2) --- */}
      <section id="features" className="features">
        <h2 className="section-title"><span>Deine Vorteile</span></h2>
        
        <div className="feature-grid">
          {/* Karte 1 */}
          <div className="feature-card">
            <span className="f-icon">⚡</span>
            <div className="f-title">Live Status</div>
            <div className="f-text">
              Keine kalten Füße mehr. Sieh in Echtzeit, ob die Bar geöffnet ist und wie lange deine Zubereitung dauert. Inklusive Push-Benachrichtigung.
            </div>
          </div>

          {/* Karte 2 */}
          <div className="feature-card">
            <span className="f-icon">📊</span>
            <div className="f-title">Stats & Wrapped</div>
            <div className="f-text">
              Tracke deinen Konsum. Wie viel Geld hast du gegenüber Starbucks gespart? Was ist dein Lieblingsgetränk? Deine persönliche Statistik.
            </div>
          </div>

          {/* Karte 3 */}
          <div className="feature-card">
            <span className="f-icon">🎡</span>
            <div className="f-title">Daily Spin & Rewards</div>
            <div className="f-text">
              Dreh jeden Tag am Glücksrad und gewinne Extras. Sammle Stempel auf deiner digitalen Karte für Gratis-Kekse.
            </div>
          </div>
          
          {/* Karte 4 */}
          <div className="feature-card">
            <span className="f-icon">🍵</span>
            <div className="f-title">Saisonale Specials</div>
            <div className="f-text">
              Von Iced Matcha Latte bis zum klassischen Flat White. Entdecke neue Kreationen mit detaillierten Infos zur Zubereitung.
            </div>
          </div>
        </div>

        {/* --- HALL OF FAME TEASER --- */}
        <div className="stats-teaser scroll-reveal">
          <div style={{fontSize:'3rem', marginBottom:'10px'}}>🏆</div>
          <h3 style={{color:'#d4b483', marginBottom:'10px'}}>Hall of Fame</h3>
          <p style={{color:'#ddd', marginBottom:'20px'}}>
            Wer ist der größte Koffein-Junkie der Familie? <br/>Logge dich ein und kämpfe um Platz 1 im Leaderboard.
          </p>
          
          <button 
            onClick={onLoginClick} 
            className="btn-primary" 
            style={{ padding: '10px 30px', fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Zum Login
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="landing-footer">
        &copy; 2025 Timo's Barista Bar Web App.<br/>
        Designed with ❤️ & ☕.
      </footer>
    </div>
  );
}