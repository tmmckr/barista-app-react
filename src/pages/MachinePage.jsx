import React from 'react';

export default function MachinePage() {
  return (
    <div className="page-content" style={{ padding: '20px', paddingBottom: '100px', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Titel */}
      <h2 className="machine-title" style={{ marginTop: '20px', fontSize: '1.8rem', textAlign: 'center' }}>
        Philips 5500 Series <span className="highlight-badge" style={{ background: 'gold', color: '#000', padding: '2px 8px', borderRadius: '5px', fontSize: '1rem', verticalAlign: 'middle' }}>LatteGo</span>
      </h2>
      
      <p className="machine-desc" style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px' }}>
        Das Herzstück der Barista Bar. Dieser Vollautomat sorgt mit 15 Bar Druck und einem High-Tech Keramikmahlwerk für das perfekte Aroma in jeder Tasse.
      </p>

      {/* Bild */}
      <div className="machine-img-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {/* WICHTIG: Das Bild muss im Ordner public/assets/img liegen! */}
        <img 
            src="/assets/img/maschine.jpg" 
            alt="Philips EP5447/90" 
            className="machine-img" 
            style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        />
      </div>

      {/* Technische Daten Grid */}
      <div className="specs-title" style={{ borderBottom: '1px solid #444', paddingBottom: '5px', marginBottom: '15px', color: '#d4b483', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Technische Highlights
      </div>
      
      <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
        {/* Helper Funktion für Items, um Code zu sparen */}
        <SpecItem label="Mahlwerk" value="100% Keramik" />
        <SpecItem label="Pumpendruck" value="15 Bar" />
        <SpecItem label="Milchsystem" value="LatteGo" />
        <SpecItem label="Temperatur" value="90°C - 98°C" />
        <SpecItem label="Mahlgrade" value="12 Stufen" />
        <SpecItem label="Wasserfilter" value="AquaClean" />
      </div>

      {/* Features */}
      <div className="specs-title" style={{ borderBottom: '1px solid #444', paddingBottom: '5px', marginBottom: '15px', color: '#d4b483', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Features
      </div>
      
      <div className="machine-desc" style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <p style={{ marginBottom: '10px' }}>• <b style={{color: '#d4b483'}}>Aroma Extract System:</b> Hält die Wassertemperatur optimal zwischen 90 und 98°C für die perfekte Extraktion.</p>
        <p style={{ marginBottom: '10px' }}>• <b style={{color: '#d4b483'}}>Extra Shot Funktion:</b> Für die Tage, an denen man einen doppelten Wachmacher braucht – ohne Bitterkeit.</p>
        <p>• <b style={{color: '#d4b483'}}>LatteGo:</b> Erzeugt samtig-cremigen Milchschaum ohne Schläuche, direkt in die Tasse.</p>
      </div>

    </div>
  );
}

// Kleine Hilfskomponente für die Grid-Items (nur in dieser Datei genutzt)
function SpecItem({ label, value }) {
    return (
        <div className="spec-item" style={{ background: '#3e2c22', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
            <span className="spec-label" style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>{label}</span>
            <span className="spec-value" style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>{value}</span>
        </div>
    );
}