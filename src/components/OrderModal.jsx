import React, { useState, useEffect } from 'react';
import { MASCHINEN_DATEN } from '../data';

export default function OrderModal({ isOpen, onClose, selectedCoffee, onSendOrder }) {
    if (!isOpen || !selectedCoffee) return null;

    // Konfiguration laden (oder Default)
    const config = MASCHINEN_DATEN[selectedCoffee.configKey] || MASCHINEN_DATEN['default'];

    // --- STATE FÜR ALLE MÖGLICHEN EINGABEN ---
    const [strength, setStrength] = useState(3);
    const [coffeeVol, setCoffeeVol] = useState(config.ml_kaffee ? config.ml_kaffee[0] : 0);
    const [milkVol, setMilkVol] = useState(config.ml_milch ? config.ml_milch[0] : 0);
    const [totalVol, setTotalVol] = useState(config.ml_gesamt ? config.ml_gesamt[0] : 0);
    const [cycles, setCycles] = useState("1x");
    const [holyFlavor, setHolyFlavor] = useState("lemon");
    
    // Extras
    const [extras, setExtras] = useState({
        shot: false, vanilla: false, sweetener: false, ice: false
    });
    const [comment, setComment] = useState("");

    // Reset State wenn sich der Kaffee ändert
    useEffect(() => {
        setStrength(selectedCoffee.strength || 3);
        setCoffeeVol(config.ml_kaffee ? config.ml_kaffee[0] : 0);
        setMilkVol(config.ml_milch ? config.ml_milch[0] : 0);
        setTotalVol(config.ml_gesamt ? config.ml_gesamt[0] : 0);
        setExtras({ shot: false, vanilla: false, sweetener: false, ice: false });
    }, [selectedCoffee]);

    // --- HELPER: EXTRAS TOGGLES ---
    const toggleExtra = (key) => {
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // --- VISUALIZER LOGIK (Vereinfacht für React) ---
    // Hier berechnen wir die Füllhöhe für das CSS
    const getVisualStyles = () => {
        // ... Hier könnte später deine komplexe Logik stehen ...
        // Für den Start machen wir es einfach:
        return {
            foam: '10%',
            espresso: '40%',
            milk: milkVol > 0 ? '40%' : '0%',
            water: '0%'
        };
    };
    const styles = getVisualStyles();


    // --- BESTELLUNG ABSCHICKEN ---
    const handleSend = () => {
        const orderDetails = {
            coffee: selectedCoffee.name,
            details: [],
            comment
        };
        
        // Details zusammenbauen
        if (config.stufen) orderDetails.details.push(`Stärke ${strength}`);
        if (config.ml_kaffee) orderDetails.details.push(`${coffeeVol}ml Kaffee`);
        if (config.ml_milch) orderDetails.details.push(`${milkVol}ml Milch`);
        if (config.ml_gesamt) orderDetails.details.push(`${totalVol}ml`);
        if (selectedCoffee.name === "Holy Eistee") orderDetails.details.push(holyFlavor);

        if (extras.shot) orderDetails.details.push("Extra Shot");
        if (extras.vanilla) orderDetails.details.push("Vanille");
        if (extras.ice) orderDetails.details.push("Mit Eis");

        onSendOrder(orderDetails);
    };

    return (
        <div className="modal-overlay show" style={{ display: 'flex' }}>
            <div className="modal-box">
                <h2 className="modal-title">{selectedCoffee.name}</h2>
                
                {/* --- VISUALIZER --- */}
                <div className="coffee-visualizer">
                    <div className={`glass-cup ${selectedCoffee.name.includes('Iced') || selectedCoffee.name.includes('Holy') ? '' : 'hot'}`}>
                        <div className="steam-container">
                            <div className="steam s1"></div><div className="steam s2"></div>
                        </div>
                        <div id="layer-foam" className="liquid foam" style={{ height: styles.foam }}></div>
                        <div id="layer-espresso" className="liquid espresso" style={{ height: styles.espresso }}></div>
                        <div id="layer-milk" className="liquid milk" style={{ height: styles.milk }}></div>
                    </div>
                </div>

                <div id="custom-options">
                    {/* 1. STÄRKE SLIDER */}
                    {config.stufen && (
                        <div className="form-group">
                            <label className="form-label">Intensität: <span className="range-value">{strength}</span></label>
                            <input type="range" min="1" max="6" value={strength} onChange={(e) => setStrength(e.target.value)} />
                        </div>
                    )}

                    {/* 2. HOLY EISTEE AUSWAHL */}
                    {selectedCoffee.name === "Holy Eistee" && (
                         <div className="form-group">
                            <label className="form-label">Sorte</label>
                            <select className="modal-select" value={holyFlavor} onChange={(e) => setHolyFlavor(e.target.value)}>
                                <option value="lemon">Lemon x Honey 🍋</option>
                                <option value="lime">Lime x Matcha 🍏</option>
                                <option value="mango">Mango x Passion 🥭</option>
                            </select>
                        </div>
                    )}

                    {/* 3. MENGEN DROPDOWNS */}
                    {config.ml_kaffee && (
                        <div className="form-group"><label className="form-label">Kaffeemenge</label>
                            <select className="modal-select" value={coffeeVol} onChange={(e) => setCoffeeVol(e.target.value)}>
                                {config.ml_kaffee.map(val => <option key={val} value={val}>{val} ml</option>)}
                            </select>
                        </div>
                    )}
                     {config.ml_milch && (
                        <div className="form-group"><label className="form-label">Milchmenge</label>
                            <select className="modal-select" value={milkVol} onChange={(e) => setMilkVol(e.target.value)}>
                                {config.ml_milch.map(val => <option key={val} value={val}>{val} ml</option>)}
                            </select>
                        </div>
                    )}
                    {config.ml_gesamt && (
                        <div className="form-group"><label className="form-label">Größe</label>
                            <select className="modal-select" value={totalVol} onChange={(e) => setTotalVol(e.target.value)}>
                                {config.ml_gesamt.map(val => <option key={val} value={val}>{val} ml</option>)}
                            </select>
                        </div>
                    )}

                    {/* 4. KOMMENTAR & EXTRAS */}
                    <div className="form-group">
                        <label className="form-label">Kommentar</label>
                        <input type="text" className="modal-input" placeholder="z.B. Ohne Keks..." value={comment} onChange={e => setComment(e.target.value)} />
                    </div>

                    <div className="form-group" style={{marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #d4b483'}}>
                        <label className="form-label">Extras</label>
                        <div className="checkbox-group">
                            <label className="checkbox-item"><input type="checkbox" checked={extras.vanilla} onChange={() => toggleExtra('vanilla')} /> Vanille</label>
                            <label className="checkbox-item"><input type="checkbox" checked={extras.ice} onChange={() => toggleExtra('ice')} /> Eiswürfel</label>
                            {/* Nur zeigen wenn nicht Holy Eistee */}
                            {selectedCoffee.name !== "Holy Eistee" && 
                                <label className="checkbox-item"><input type="checkbox" checked={extras.shot} onChange={() => toggleExtra('shot')} /> Extra Shot</label>
                            }
                        </div>
                    </div>

                </div>

                <button className="modal-btn" onClick={handleSend}>Bestellen</button>
                <div style={{marginTop:'15px', fontSize:'0.8rem', color:'#a09085', cursor:'pointer'}} onClick={onClose}>Abbrechen</div>
            </div>
        </div>
    );
}