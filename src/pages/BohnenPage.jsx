import React from 'react';

export default function BohnenPage() {
  return (
    <div className="page-content" style={{ padding: '20px', paddingBottom: '100px', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Titel */}
      <h2 className="bean-title" style={{ marginTop: '20px', fontSize: '1.8rem', textAlign: 'center', color: '#fff' }}>
        Tchibo Barista Espresso
      </h2>
      <div className="bean-sub" style={{ textAlign: 'center', color: '#d4b483', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
        Traditionelle Trommelröstung
      </div>

      {/* Produktbild */}
      <div className="product-stage" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {/* WICHTIG: Bild muss in public/assets/img/bohnen.png liegen */}
        <img 
            src="/assets/img/bohnen.png" 
            alt="Tchibo Barista Espresso" 
            className="product-img" 
            style={{ maxHeight: '250px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
        />
      </div>

      {/* Flavor Tags */}
      <div className="flavor-tags" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
         <FlavorTag text="Intensiv" />
         <FlavorTag text="Nussig" />
         <FlavorTag text="Zartbitter" />
         <FlavorTag text="Säurearm" />
      </div>

      {/* Mischung Verhältnis */}
      <div className="ratio-box" style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '30px' }}>
         <div className="ratio-label" style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>Bohnenmischung</div>
         <div className="ratio-bar" style={{ height: '25px', background: '#333', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
             <div className="arabica-full" style={{ width: '100%', background: '#6f4e37', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 100% Tchibo Arabica
             </div>
         </div>
      </div>

      {/* Aroma Profil */}
      <div className="aroma-section" style={{ marginBottom: '30px' }}>
         <div className="ratio-label" style={{ textAlign: 'left', marginBottom: '15px', color: '#d4b483', fontWeight: 'bold' }}>Aroma Profil</div>
         
         <AromaBar label="Intensität" percent="83%" color="#d4b483" />
         <AromaBar label="Körper" percent="80%" color="#a09085" />
         <AromaBar label="Säure" percent="5%" color="#a09085" /> {/* Habe 5% gemacht, damit man minimal was sieht */}
         <AromaBar label="Röstung" percent="100%" color="#3e2c22" />
      </div>

      {/* Beschreibungstext */}
      <div className="bean-text" style={{ lineHeight: '1.6', fontSize: '0.95rem', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
         <p style={{ marginBottom: '15px' }}>
            Mit dem <b>Tchibo Barista Espresso</b> erleben wir Kaffee-Handwerk in Perfektion. Die Bohnen werden im traditionellen <b>Trommelröster</b> veredelt. Das bedeutet: Sie werden langsamer und schonender geröstet als industrieller Kaffee.
         </p>
         <p>
            Das Ergebnis ist ein charaktervoller, intensiver Espresso mit weichem Körper, goldbrauner Crema und einer feinen Note von Zartbitterschokolade und Nuss.
         </p>
      </div>

      {/* Daten Grid */}
      <div className="data-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
         <DataRow label="Ursprung" value="Lateinamerika & Asien" />
         <DataRow label="Röstung" value="Trommelröstung (Dunkel)" />
         <DataRow label="Zertifizierung" value="Fairtrade" />
         <DataRow label="Hersteller" value="Tchibo GmbH" />
         <DataRow label="Feature" value="Aroma-Verschluss" />
      </div>

    </div>
  );
}

// --- HILFS-KOMPONENTEN ---

function FlavorTag({ text }) {
    return (
        <span style={{ 
            background: '#3e2c22', color: '#d4b483', padding: '5px 12px', 
            borderRadius: '20px', fontSize: '0.85rem', border: '1px solid #d4b483' 
        }}>
            {text}
        </span>
    );
}

function AromaBar({ label, percent, color }) {
    return (
        <div className="aroma-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span className="aroma-name" style={{ width: '80px', fontSize: '0.9rem' }}>{label}</span>
            <div className="aroma-bar-bg" style={{ flex: 1, height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="aroma-fill" style={{ width: percent, background: color, height: '100%' }}></div>
            </div>
        </div>
    );
}

function DataRow({ label, value }) {
    return (
        <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="data-label" style={{ color: '#888', fontSize: '0.9rem' }}>{label}</span>
            <span className="data-val" style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{value}</span>
        </div>
    );
}