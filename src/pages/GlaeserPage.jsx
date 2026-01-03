import React from 'react';

export default function GlaeserPage() {
  return (
    <div className="page-content" style={{ padding: '20px', paddingBottom: '100px', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Hero Image */}
      <img 
        src="/assets/img/glaeser-hero.jpg" 
        alt="Gläser Auswahl" 
        className="glass-hero"
        style={{ width: '100%', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
      />

      {/* Info Card 1 */}
      <div className="info-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
          <div className="info-title" style={{ fontSize: '1.2rem', color: '#d4b483', marginBottom: '10px', fontWeight: 'bold' }}>
              Das Geheimnis der zwei Wände
          </div>
          <p className="info-text" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              Jedes Getränk wird in exklusiven, <span className="highlight" style={{ color: '#d4b483', fontWeight: 'bold' }}>doppelwandigen Thermogläsern</span> serviert. 
              Zwischen den zwei Glasschichten ist eine Vakuumschicht eingeschlossen. 
              Diese sorgt dafür, dass die Hitze von Kaffee, Espresso oder Latte Macchiato nicht nach außen dringen kann.
              <br/><br/>
              <b>Der Effekt:</b> Das äußere Glas bleibt angenehm kühl, während der Inhalt lange heiß bleibt. Andersherum bleiben Eiskaffees im Sommer länger eiskalt.
          </p>
      </div>

      {/* Detail Grid */}
      <div className="glass-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
          
          {/* Detail Bild */}
          <div>
              <img 
                src="/assets/img/borosilikat.webp" 
                alt="Glas Detail" 
                className="detail-img"
                style={{ width: '100%', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
              />
          </div>

          {/* Info Card 2 */}
          <div>
              <div className="info-title" style={{ fontSize: '1.2rem', color: '#d4b483', marginBottom: '10px', fontWeight: 'bold' }}>
                  High-Tech aus dem Labor
              </div>
              <p className="info-text" style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                  Unsere Gläser bestehen aus <span className="highlight" style={{ color: '#d4b483', fontWeight: 'bold' }}>Borosilikatglas</span>. Im Vergleich zu normalem Glas enthält es Bor, was es extrem widerstandsfähig macht.
              </p>
              
              <ul className="feature-list" style={{ listStyle: 'none', padding: 0 }}>
                  <FeatureItem text="Hitzebeständig & Robust" />
                  <FeatureItem text="Kein Temperaturschock" />
                  <FeatureItem text="Ultraleichtes Gewicht" />
                  <FeatureItem text="Chemikalienbeständig" />
                  <FeatureItem text="Kristallklare Optik" />
              </ul>
          </div>
      </div>

    </div>
  );
}

// Kleine Hilfskomponente für die Liste
function FeatureItem({ text }) {
    return (
        <li style={{ 
            padding: '8px 0', 
            borderBottom: '1px solid rgba(255,255,255,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
        }}>
            <span style={{ color: '#d4b483' }}>✓</span> {text}
        </li>
    );
}