import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '../firebase';

export default function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Nur für Registrierung
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Fehler zurücksetzen

        try {
            if (isRegistering) {
                // --- REGISTRIEREN ---
                if(!name) { setError("Bitte einen Namen eingeben!"); return; }
                
                // 1. User erstellen
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // 2. Namen setzen (Wichtig für "Hallo Timo")
                await updateProfile(userCredential.user, {
                    displayName: name
                });
                
                // Erfolg -> Modal schließt sich automatisch durch App.jsx Listener
                onClose();

            } else {
                // --- EINLOGGEN ---
                await signInWithEmailAndPassword(auth, email, password);
                onClose();
            }
        } catch (err) {
            console.error(err);
            // Fehlermeldungen übersetzen (optional)
            if (err.code === 'auth/invalid-credential') setError("Falsches Passwort oder Email.");
            else if (err.code === 'auth/email-already-in-use') setError("Email wird schon benutzt.");
            else if (err.code === 'auth/weak-password') setError("Passwort muss mind. 6 Zeichen haben.");
            else setError(err.message);
        }
    };

    return (
        <div className="modal-overlay show" style={{ display: 'flex', zIndex: 10000 }}>
            <div className="modal-box">
                <h2 className="modal-title">
                    {isRegistering ? "Konto erstellen" : "Einloggen"}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    {/* Name Feld (Nur beim Registrieren) */}
                    {isRegistering && (
                        <div className="form-group">
                            <label className="form-label">Dein Name</label>
                            <input 
                                type="text" 
                                className="modal-input" 
                                placeholder="z.B. Timo" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="modal-input" 
                            placeholder="name@beispiel.de" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Passwort</label>
                        <input 
                            type="password" 
                            className="modal-input" 
                            placeholder="******" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {error && <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>⚠️ {error}</div>}

                    <button type="submit" className="modal-btn">
                        {isRegistering ? "Registrieren" : "Anmelden"}
                    </button>
                </form>

                <div 
                    style={{ marginTop: '20px', fontSize: '0.9rem', color: '#a09085', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setError("");
                    }}
                >
                    {isRegistering ? "Zurück zum Login" : "Noch kein Konto? Jetzt registrieren!"}
                </div>

                <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#666', cursor: 'pointer' }} onClick={onClose}>
                    Abbrechen
                </div>
            </div>
        </div>
    );
}