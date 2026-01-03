import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

// NEU: onOpenReceipt als Prop hinzufügen
export default function HistoryModal({ isOpen, onClose, onOpenReceipt }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && auth.currentUser) {
            setLoading(true);
            const ordersRef = ref(db, 'orders');
            const myOrdersQuery = query(ordersRef, orderByChild('uid'), equalTo(auth.currentUser.uid));

            const unsubscribe = onValue(myOrdersQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const loadedOrders = Object.entries(data).map(([key, value]) => ({
                        id: key,
                        ...value
                    })).sort((a, b) => b.timestamp - a.timestamp);
                    setOrders(loadedOrders);
                } else {
                    setOrders([]);
                }
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay show" style={{ display: 'flex' }}>
            <div className="modal-box" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <h2 className="modal-title">Deine Bestellungen</h2>
                
                <div className="history-container">
                    {loading ? (
                        <div style={{textAlign:'center', color:'#888'}}>Lade...</div>
                    ) : orders.length === 0 ? (
                        <div style={{textAlign:'center', color:'#888'}}>Noch keine Bestellungen. ☕</div>
                    ) : (
                        orders.map(order => (
                            // NEU: onClick Handler hinzugefügt
                            <div 
                                key={order.id} 
                                className="menu-item" 
                                onClick={() => onOpenReceipt(order)} // <--- HIER: Klick öffnet Bon
                                style={{ 
                                    display: 'flex', justifyContent: 'space-between', 
                                    background: 'rgba(255,255,255,0.05)', margin: '5px 0',
                                    padding: '10px', borderRadius: '8px', border: 'none',
                                    cursor: 'pointer' // Zeigt an, dass es klickbar ist
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.coffee}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{order.dateString}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#d4b483' }}>
                                        {order.details && order.details.join(', ')}
                                    </div>
                                </div>
                                <div style={{ alignSelf: 'center', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* Kleines Icon für den Bon */}
                                    <span style={{ fontSize: '1.5rem' }}>🧾</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button className="modal-btn" onClick={onClose} style={{ marginTop: '20px', background: '#444' }}>
                    Schließen
                </button>
            </div>
        </div>
    );
}