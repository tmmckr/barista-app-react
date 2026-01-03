import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function RewardModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Damit das Konfetti die richtige Größe hat
    const [windowSize, setWindowSize] = useState({ 
        width: window.innerWidth, 
        height: window.innerHeight 
    });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="modal-overlay show" style={{ display: 'flex', zIndex: 99999 }}>
            {/* Das Konfetti fliegt über den ganzen Bildschirm */}
            <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />

            <div className="modal-box" style={{ borderColor: 'gold', boxShadow: '0 0 50px rgba(255, 215, 0, 0.3)' }}>
                <div style={{ fontSize: '4rem' }}>🏆</div>
                <h2 className="modal-title" style={{ color: 'gold' }}>Glückwunsch!</h2>
                
                <p className="modal-text">
                    Du hast deine Stempelkarte voll! <br />
                    Als Dankeschön gibt es zur nächsten Bestellung einen <b>Gratis-Keks</b>. 🍪
                </p>
                
                <button 
                    className="modal-btn" 
                    onClick={onClose} 
                    style={{ background: 'gold', color: '#000', fontWeight: 'bold' }}
                >
                    Juhu!
                </button>
            </div>
        </div>
    );
}