import React from 'react';

export default function StampCard({ totalCount }) {
    // Wir nehmen Modulo 10, damit es immer von 0 bis 10 geht (auch wenn totalCount 53 ist)
    const currentStamps = totalCount % 10;
    const remaining = 10 - currentStamps;
    const cardsCompleted = Math.floor(totalCount / 10);

    // Wir erstellen ein Array [1, 2, ..., 10] für die Kreise
    const circles = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="stamp-card scroll-reveal visible" style={{ marginTop: '20px' }}>
            <div className="stamp-header">
                <span>☕ Deine Treuekarte</span>
                <span style={{ color: '#d4b483' }}>{currentStamps} / 10</span>
            </div>
            
            <div className="stamp-grid">
                {circles.map((num) => (
                    <div 
                        key={num} 
                        className={`stamp-circle ${num <= currentStamps ? 'active' : ''}`}
                    >
                        {/* Wenn aktiv zeige Tasse, sonst Zahl */}
                        {num <= currentStamps ? "☕" : num}
                    </div>
                ))}
            </div>

            <div className="stamp-footer">
                {currentStamps === 0 && cardsCompleted > 0 ? (
                    <span>Neue Karte, neues Glück! 🍀</span>
                ) : currentStamps === 10 ? (
                    <b>VOLL! Dein nächster Kaffee bringt einen Keks! 🍪</b>
                ) : (
                    <span>Noch {remaining} Kaffees bis zum Gratis-Keks! 🍪</span>
                )}
            </div>
        </div>
    );
}