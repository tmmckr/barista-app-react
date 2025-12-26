import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// WICHTIG: 'set' wurde zu den imports hinzugefügt für sauberes Speichern mit ID
import { getDatabase, ref, onValue, push, update, set, remove, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const TOPIC_NAME = 'mamas-kaffee-123-geheim'; 