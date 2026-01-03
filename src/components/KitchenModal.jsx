import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function KitchenModal({ isOpen, onClose }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const ordersRef = ref(db, 'orders');
            // Wir laden ALLE Bestellungen
            const unsubscribe = onValue(ordersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const loadedOrders = Object.entries(data)
                        .map(([key, value]) => ({ id: key, ...value }))
                        // Filtern: Wir wollen keine uralten archivierten Sachen sehen
                        .filter(order => order.status !== 'archived')
                        .sort((a, b) => a.timestamp - b.timestamp); // Älteste zuerst (FIFO Prinzip)
                    
                    setOrders(loadedOrders);
                } else {
                    setOrders([]);
                }
            });
            return () => unsubscribe();
        }
    }, [isOpen]);

    // Status ändern Funktion
    const updateStatus = (orderId, newStatus) => {
        update(ref(db, `orders/${orderId}`), {
            status: newStatus
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay show" style={{ display: 'flex', background: 'rgba(0,0,0,0.9)' }}>
            <div className="modal-box" style={{ width: '90%', maxWidth: '600px', height: '90vh', overflowY: 'auto', border: '2px solid #ef4444' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h2 className="modal-title" style={{color:'#ef4444'}}>👨‍🍳 Küchen-Display</h2>
                    <button onClick={onClose} style={{background:'transparent', border:'1px solid #666', padding:'5px 10px'}}>Schließen</button>
                </div>

                <div className="kitchen-list" style={{ marginTop: '20px' }}>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                            Alles ruhig in der Küche. 😴
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="kitchen-card" style={{ 
                                background: order.status === 'completed' ? '#065f46' : '#333',
                                padding: '15px', marginBottom: '15px', borderRadius: '8px',
                                borderLeft: `5px solid ${order.status === 'new' ? '#ef4444' : order.status === 'completed' ? '#10b981' : '#f59e0b'}`
                            }}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <span style={{fontWeight:'bold', fontSize:'1.1rem'}}>{order.coffee}</span>
                                    <span style={{color:'#ccc', fontSize:'0.8rem'}}>{new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                
                                <div style={{color:'#d4b483', margin:'5px 0'}}>
                                    👤 {order.user}
                                </div>

                                {order.details && order.details.length > 0 && (
                                    <div style={{background:'rgba(0,0,0,0.2)', padding:'5px', borderRadius:'4px', fontSize:'0.9rem', marginBottom:'10px'}}>
                                        {order.details.join(', ')}
                                    </div>
                                )}
                                
                                {order.comment && (
                                    <div style={{color:'#fca5a5', fontStyle:'italic', marginBottom:'10px'}}>
                                        " {order.comment} "
                                    </div>
                                )}

                                {/* ACTION BUTTONS */}
                                <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                                    {order.status === 'new' && (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'processing')}
                                            style={{flex:1, background:'#f59e0b', border:'none', padding:'8px', borderRadius:'5px', cursor:'pointer', color:'#000', fontWeight:'bold'}}
                                        >
                                            In Arbeit ⏳
                                        </button>
                                    )}

                                    {order.status === 'processing' && (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'completed')}
                                            style={{flex:1, background:'#10b981', border:'none', padding:'8px', borderRadius:'5px', cursor:'pointer', color:'#fff', fontWeight:'bold'}}
                                        >
                                            Fertig ✅
                                        </button>
                                    )}

                                    {order.status === 'completed' && (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'archived')}
                                            style={{flex:1, background:'#374151', border:'none', padding:'8px', borderRadius:'5px', cursor:'pointer', color:'#ccc'}}
                                        >
                                            Archivieren 📦
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}