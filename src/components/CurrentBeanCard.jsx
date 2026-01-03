import React from 'react';
import { Link } from 'react-router-dom';

export default function CurrentBeanCard() {
  return (
    <Link to="/bohnen" style={{ textDecoration: 'none' }}>
        <div style={{
            background: 'linear-gradient(145deg, #2c1e16 0%, #1a120b 100%)',
            border: '1px solid rgba(212, 180, 131, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            
            /* --- HIER SIND DIE ÄNDERUNGEN FÜR DIE GRÖSSE --- */
            width: '100%',            // Nimmt Platz ein...
            maxWidth: '450x',        // ...aber maximal so breit wie die Stempelkarte
            margin: '20px auto',      // Zentriert die Box (oben/unten 20px, rechts/links auto)
            /* ----------------------------------------------- */

            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* ... Der Rest des Inhalts bleibt exakt gleich ... */}
            <div style={{color: '#d4b483', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px', opacity: 0.8}}>
                Aktuelle Röstung
            </div>
            {/* ... usw ... */}
            {/* ... Bitte den restlichen Inhalt der Datei hier behalten ... */}
            <h3 style={{color: '#fff', fontSize: '1.4rem', margin: '5px 0', fontFamily: 'serif', fontWeight: 'normal'}}>
                Tchibo Barista Espresso
            </h3>
            {/* ... */}
             <div style={{color: '#888', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '15px'}}>
                Trommelröstung • 100% Arabica
            </div>
             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                <span style={{color: '#d4b483', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px'}}>INTENSITÄT 5/6</span>
                <div style={{width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden'}}>
                    <div style={{width: '83%', height: '100%', background: '#d4b483'}}></div>
                </div>
            </div>
            <div style={{position: 'absolute', bottom: '10px', right: '10px', width: '4px', height: '4px', background: '#555', borderRadius: '50%'}}></div>
            <div style={{position: 'absolute', bottom: '20px', left: '20px', width: '6px', height: '6px', background: '#444', borderRadius: '50%'}}></div>
        </div>
    </Link>
  );
}