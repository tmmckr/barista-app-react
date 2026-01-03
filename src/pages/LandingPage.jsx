import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Ensure your styles are imported if not globally applied
// import '../assets/css/style.css'; 

export default function LandingPage({ currentUser }) {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/'); // Or wherever your main app page is
    }
  }, [currentUser, navigate]);

  // Inline styles for landing page specifics (or move to a CSS file)
  const styles = {
    hero: {
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 20px',
      position: 'relative',
      zIndex: 10,
    },
    // ... add other specific styles from your <style> block here if needed
    // adapting CSS properties to camelCase (e.g., background-color -> backgroundColor)
  };

  return (
    <div style={{ backgroundColor: '#2c1e16', overflowX: 'hidden', minHeight: '100vh', color: '#fff' }}>
      
      {/* Aurora Blobs - assume these classes are in your global CSS */}
      <div className="aurora-blob blob-1"></div>
      <div className="aurora-blob blob-2"></div>
      <div className="aurora-blob blob-3"></div>

      <section style={styles.hero}>
        <div className="brand-badge">Private Coffee Club</div>
        
        <div className="logo-container">
           {/* Ensure image path is correct for React (public folder) */}
          <img src="/assets/img/logo.jpg" alt="Timo's Barista Bar Logo" className="hero-logo" />
        </div>

        <p className="hero-desc">
          Willkommen in Timo's Barista Bar. Bestelle deinen Lieblingskaffee per App, sammle Stempel und tracke deinen Koffein-Haushalt. Exklusiv für Freunde & Familie.
        </p>

        <div className="cta-group">
          {/* Use Link for internal navigation, or button to trigger login modal */}
           {/* If login is a modal on the same page, change this logic */}
          <Link to="/login" className="btn-primary">Jetzt bestellen ☕</Link> 
          <a href="#features" className="btn-secondary">Mehr erfahren</a>
        </div>

        <div className="app-mockup">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:'10px'}}>
            <span style={{color:'#d4b483', fontWeight:'bold'}}>Status:</span>
            <span style={{color:'#4ade80'}}>● Barista bereit</span>
          </div>
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

      <section id="features" className="features">
        <h2 className="section-title"><span>Deine Vorteile</span></h2>
        
        <div className="feature-grid">
          <div className="feature-card">
            <span className="f-icon">⚡</span>
            <div className="f-title">Live Status</div>
            <div className="f-text">
              Keine kalten Füße mehr. Sieh in Echtzeit, ob die Bar geöffnet ist und wie lange deine Zubereitung dauert. Inklusive Push-Benachrichtigung.
            </div>
          </div>

          <div className="feature-card">
            <span className="f-icon">📊</span>
            <div className="f-title">Stats & Wrapped</div>
            <div className="f-text">
              Tracke deinen Konsum. Wie viel Geld hast du gegenüber Starbucks gespart? Was ist dein Lieblingsgetränk? Deine persönliche Statistik.
            </div>
          </div>

          <div className="feature-card">
            <span className="f-icon">🎡</span>
            <div className="f-title">Daily Spin & Rewards</div>
            <div className="f-text">
              Dreh jeden Tag am Glücksrad und gewinne Extras. Sammle Stempel auf deiner digitalen Karte für Gratis-Kekse.
            </div>
          </div>
          
          <div className="feature-card">
            <span className="f-icon">🍵</span>
            <div className="f-title">Saisonale Specials</div>
            <div className="f-text">
              Von Iced Matcha Latte bis zum klassischen Flat White. Entdecke neue Kreationen mit detaillierten Infos zur Zubereitung.
            </div>
          </div>
        </div>

        <div className="stats-teaser scroll-reveal">
          <div style={{fontSize:'3rem', marginBottom:'10px'}}>🏆</div>
          <h3 style={{color:'#d4b483', marginBottom:'10px'}}>Hall of Fame</h3>
          <p style={{color:'#ddd', marginBottom:'20px'}}>
            Wer ist der größte Koffein-Junkie der Familie? <br/>Logge dich ein und kämpfe um Platz 1 im Leaderboard.
          </p>
          <Link to="/login" className="btn-primary" style={{padding: '10px 30px', fontSize: '1rem'}}>Zum Login</Link>
        </div>
      </section>

      <footer className="landing-footer">
        &copy; 2025 Timo's Barista Bar Web App.<br/>
        Designed with ❤️ & ☕.
      </footer>
    </div>
  );
}