import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';

export default function ActiveOrderToast({ orderId, onClose }) {
    const [orderData, setOrderData] = useState(null);

    // Echtzeit-Listener auf DIESE spezielle Bestellung
    useEffect(() => {
        if (!orderId) return;

        const orderRef = ref(db, `orders/${orderId}`);
        const unsubscribe = onValue(orderRef, (snapshot) => {
            const data = snapshot.val();
            
            // Wenn Daten weg sind (z.B. gelöscht/archiviert), Toast schließen
            if (!data) {
                setOrderData(null);
                onClose(); 
                return;
            }

            // Wenn sich der Status auf "completed" ändert -> DING! 🔔
            if (data.status === 'completed' && orderData?.status !== 'completed') {
                new Audio('/assets/audio/ding.mp3').play().catch(() => {});
            }

            setOrderData(data);
        });

        return () => unsubscribe();
    }, [orderId]);

    // Bestellung stornieren (löschen)
    const handleCancel = () => {
        if (window.confirm("Möchtest du die Bestellung wirklich stornieren?")) {
            remove(ref(db, `orders/${orderId}`))
                .then(() => onClose())
                .catch(err => alert(err.message));
        }
    };

    if (!orderData) return null;

    // --- Verschiedene Zustände ---

    // 1. NEU (Warten)
    if (orderData.status === 'new') {
        return (
            <div className="order-toast">
                <div style={{fontSize: '2rem'}}>📝</div>
                <h3>Bestellung eingegangen</h3>
                <p>Dein {orderData.coffee} wartet in der Schlange.</p>
                <button onClick={handleCancel} className="cancel-btn">
                    Bestellung stornieren ❌
                </button>
            </div>
        );
    }

    // 2. IN ZUBEREITUNG
    if (orderData.status === 'processing') {
        return (
            <div className="order-toast processing">
                <div className="pulse-icon">☕</div>
                <h3>Wird zubereitet...</h3>
                <p>Der Barista ist am Werk!</p>
                {/* Stornieren nicht mehr möglich */}
            </div>
        );
    }

    // 3. FERTIG
    if (orderData.status === 'completed') {
        return (
            <div className="order-toast completed">
                <div style={{fontSize: '2rem'}}>✅</div>
                <h3>Kaffee ist fertig!</h3>
                <p>Bitte abholen und genießen.</p>
                <button onClick={onClose} className="ok-btn">
                    Alles klar, danke!
                </button>
            </div>
        );
    }

    return null;
}