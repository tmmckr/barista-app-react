// src/components/ReceiptModal.jsx
import React from 'react';

// Das sind die Kaffeepreise (direkt hier definiert oder aus einer Config importiert)
const COFFEE_PRICES = { 
    "Kaffee": 3.50, "Café Crema": 3.90, "Latte Macchiato": 4.50, 
    "Milchkaffee": 4.20, "Cappuccino": 4.20, "Espresso": 2.90, 
    "Espresso Lungo": 3.20, "Americano": 3.50, "Flat White": 4.50, 
    "Iced Matcha Latte": 5.50, "Iced Protein Matcha": 5.90, 
    "Holy Eistee": 4.90, "Iced Coffee": 3.90, "Iced Latte": 4.50 
};

export default function ReceiptModal({ isOpen, onClose, orderData }) {
    if (!isOpen || !orderData) return null; // Wenn zu, render nichts

    const price = COFFEE_PRICES[orderData.coffee] || 4.00;
    const formattedPrice = price.toFixed(2) + "€";
    const isCompleted = ['archived', 'done', 'completed'].includes(orderData.status);
    const orderId = new Date(orderData.timestamp).getTime().toString().slice(-4);

    return (
        <div className="receipt-modal" style={{ display: 'flex' }}> {/* Immer flex, weil wir es via 'isOpen' steuern */}
            <div className="receipt-paper">
                
                {/* Header */}
                <div className="receipt-header">
                    <span className="receipt-logo">☕</span>
                    <div className="receipt-title">Timo's Bar</div>
                    <div className="receipt-date">{orderData.dateString}</div>
                </div>

                {/* Stempel Logik */}
                {isCompleted && (
                    <div className="receipt-stamp visible">ERLEDIGT</div>
                )}
                
                {/* Body */}
                <div className="receipt-body">
                    <div className="receipt-row">
                        <span>{orderData.coffee}</span>
                        <span>{formattedPrice}</span>
                    </div>
                    
                    {/* Extras */}
                    <div id="receipt-extras-container">
                        {orderData.details && orderData.details.map((extra, index) => (
                            <div key={index} className="receipt-row" style={{ fontSize: '0.85rem', color: '#666' }}>
                                <span>+ {extra}</span>
                                <span>0.00€</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="receipt-row bold">
                        <span>TOTAL</span>
                        <span>0.00€</span>
                    </div>

                    <div className="receipt-row" style={{ fontSize: '0.8rem', color: '#888', borderTop: '1px dashed #ccc', marginTop: '5px', paddingTop: '5px' }}>
                        <span>Gespart (vs Starbucks)</span>
                        <span>-{formattedPrice}</span> 
                    </div>
                </div>

                {/* Footer */}
                <div className="receipt-footer">
                    Bestellung #{orderId} erfolgreich an die Bar gesendet.<br/><br/>
                    Made with ❤️
                    <div className="barcode" style={{ fontFamily: "'Libre Barcode 39 Text', cursive" }}>TIMOS-COFFEE</div>
                </div>

                <button className="receipt-btn" onClick={onClose}>Alles klar!</button>
            </div>
        </div>
    );
}