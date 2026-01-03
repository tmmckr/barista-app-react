import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, update, set, remove, runTransaction } from "firebase/database";

// WICHTIG: Hier holen wir uns die Email-Funktionen
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword,     // Einloggen
    createUserWithEmailAndPassword, // Registrieren
    updateProfile                   // Namen speichern
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCy8RnpwpL0RdjfaU690j7mKAzr1fiWFXk",
    authDomain: "timos-barista-bar.firebaseapp.com",
    databaseURL: "https://timos-barista-bar-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "timos-barista-bar",
    storageBucket: "timos-barista-bar.firebasestorage.app",
    messagingSenderId: "94308664114",
    appId: "1:94308664114:web:13ace1464e7b3db9054d2b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export const TOPIC_NAME = 'mamas-kaffee-123-geheim'; 

// Exportiere die neuen Funktionen
export { 
    app, db, auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signOut, 
    onAuthStateChanged 
};