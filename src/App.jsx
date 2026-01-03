import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

import './index.css' 
import Navbar from './components/Navbar'
import ReceiptModal from './components/ReceiptModal'
import OrderModal from './components/OrderModal'
import LoginModal from './components/LoginModal' 
import HistoryModal from './components/HistoryModal'
import RewardModal from './components/RewardModal'
import KitchenModal from './components/KitchenModal'
import Header from './components/Header'
import ActiveOrderToast from './components/ActiveOrderToast'; // Import ist da ✅


// Komponenten für die Seiten
import HomePage from './pages/HomePage';
import MachinePage from './pages/MachinePage';
import StatsPage from './pages/StatsPage';
import BohnenPage from './pages/BohnenPage';
import GlaeserPage from './pages/GlaeserPage';
import LandingPage from './pages/LandingPage';

import { KAFFEE_SORTEN } from './data'

// Firebase
import { db, auth, signOut, onAuthStateChanged } from './firebase'
import { ref, push, onValue, set, remove, runTransaction, query, orderByChild, equalTo } from 'firebase/database'

// WICHTIG: Deine Admin-Email hier eintragen!
const ADMIN_EMAIL = "deine.email@beispiel.de"; 

function App() {
  // --- STATE ---
  const [isReceiptOpen, setReceiptOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false); 
  const [favorites, setFavorites] = useState({}); 
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isKitchenOpen, setKitchenOpen] = useState(false);
  
  // State für die aktive Live-Bestellung
  const [activeOrderId, setActiveOrderId] = useState(null);

  // --- EFFECTS ---

  // 1. Auth Listener
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              console.log("Eingeloggt als:", user.displayName);
              setCurrentUser(user);
              setLoginOpen(false); 
          } else {
              setCurrentUser(null);
          }
      });
      return () => unsubscribe();
  }, []);

  // 2. Favoriten laden
  useEffect(() => {
    if (currentUser) {
      const favRef = ref(db, `users/${currentUser.uid}/favorites`);
      const unsubscribe = onValue(favRef, (snapshot) => {
        setFavorites(snapshot.val() || {});
      });
      return () => unsubscribe();
    } else {
      setFavorites({});
    }
  }, [currentUser]);

  // 3. Stempelkarte laden
  useEffect(() => {
    if (currentUser) {
        const countRef = ref(db, `users/${currentUser.uid}/coffeeCount`);
        const unsubscribe = onValue(countRef, (snapshot) => {
            setCoffeeCount(snapshot.val() || 0);
        });
        return () => unsubscribe();
    } else {
        setCoffeeCount(0);
    }
  }, [currentUser]);

  // --- HANDLER FUNKTIONEN ---

  const handleLogout = () => {
      signOut(auth).then(() => {
          alert("Ausgeloggt! 👋");
          setMenuOpen(false); // Menü schließen beim Logout
      });
  };

  const handleOrderClick = (coffee) => setSelectedCoffee(coffee);

  const handleToggleFav = (coffeeName) => {
      if (!currentUser) {
          setLoginOpen(true);
          return;
      }
      const favRef = ref(db, `users/${currentUser.uid}/favorites/${coffeeName}`);
      if (favorites[coffeeName]) {
          remove(favRef);
      } else {
          set(favRef, true);
      }
  };

  const handleSendOrder = (orderDetails) => {
      const newOrder = {
          user: currentUser ? currentUser.displayName : "Gast (React)",
          uid: currentUser ? currentUser.uid : "anonymous",
          coffee: orderDetails.coffee,
          details: orderDetails.details,
          comment: orderDetails.comment,
          timestamp: Date.now(),
          dateString: new Date().toLocaleString(),
          status: 'new'
      };
      
      // 1. Wir speichern die Referenz ("Promise"), um an die ID (.key) zu kommen
      const newOrderRef = push(ref(db, 'orders'), newOrder);

      newOrderRef.then(() => {
            // Punkte erhöhen (nur wenn eingeloggt)
            if (currentUser) {
                const countRef = ref(db, `users/${currentUser.uid}/coffeeCount`);
                runTransaction(countRef, (currentCount) => {
                    return (currentCount || 0) + 1;
                }).then((result) => {
                    const newCount = result.snapshot.val();
                    if (newCount > 0 && newCount % 10 === 0) {
                        new Audio('/assets/audio/ding.mp3').play().catch(e => {}); 
                        setTimeout(() => setShowReward(true), 500);
                    }
                });
            }
            
            setLastOrder(newOrder);
            setSelectedCoffee(null);

            // 2. WICHTIG: Die ID der neuen Bestellung merken!
            setActiveOrderId(newOrderRef.key);

            setReceiptOpen(true);
        })
        .catch((error) => alert(error.message));
  };

  // --- RENDER ---
  return (
    <BrowserRouter>
        <div className="app-wrapper">
           <div className="aurora-blob blob-1"></div>
           <div className="aurora-blob blob-2"></div>
           <div className="aurora-blob blob-3"></div>
           <div id="snow-container"></div>

           {/* 1. GANZ OBEN: Der Header (Timo's Barista Bar) */}
           <Header 
               onOpenMenu={() => setMenuOpen(true)} 
               currentUser={currentUser}
               onLogin={() => setLoginOpen(true)} 
           />

           {/* 2. DANACH: Die Navbar */}
           <Navbar />

           {/* 3. DANN: Der Inhalt der Seiten */}
           <Routes>
               <Route path="/" element={
                 currentUser ? (
                   <HomePage 
                       currentUser={currentUser}
                       coffeeCount={coffeeCount}
                       favorites={favorites}
                       handleOrderClick={handleOrderClick}
                       handleToggleFav={handleToggleFav}
                       KAFFEE_SORTEN={KAFFEE_SORTEN}
                   />
                 ) : (
                   <LandingPage currentUser={currentUser} />
                 )
             } />
               <Route path="/maschine" element={<MachinePage />} />
               <Route path="/bohnen" element={<BohnenPage />} />
               <Route path="/stats" element={<StatsPage />} />
               <Route path="/glaeser" element={<GlaeserPage />} />
               <Route path="*" element={<Navigate to="/" />} />
           </Routes>

           {/* MODALS */}
           <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
           <OrderModal isOpen={!!selectedCoffee} selectedCoffee={selectedCoffee} onClose={() => setSelectedCoffee(null)} onSendOrder={handleSendOrder} />
           <ReceiptModal isOpen={isReceiptOpen} onClose={() => setReceiptOpen(false)} orderData={lastOrder} />
           <RewardModal isOpen={showReward} onClose={() => setShowReward(false)} />
           <HistoryModal isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} onOpenReceipt={(o) => {setLastOrder(o); setHistoryOpen(false); setReceiptOpen(true);}} />
           <KitchenModal isOpen={isKitchenOpen} onClose={() => setKitchenOpen(false)} />

           {/* --- NEUES FEATURE: LIVE BESTELLSTATUS --- */}
           {/* Zeigt das schwarze Fenster unten an, aber nur wenn der Bon (Receipt) geschlossen ist */}
           {!isReceiptOpen && (
               <ActiveOrderToast 
                   orderId={activeOrderId} 
                   onClose={() => setActiveOrderId(null)} 
               />
           )}
           
           {/* HAMBURGER MENÜ - NEUES DESIGN */}
           {isMenuOpen && (
               <div className="menu-dropdown">
                   
                   {/* 1. Meine Bestellungen */}
                   <button 
                        onClick={() => { setMenuOpen(false); setHistoryOpen(true); }} 
                        className="menu-btn"
                   >
                       <span className="menu-icon">📜</span>
                       Meine Bestellungen
                   </button>

                   {/* 2. Stats & Wrapped */}
                   <Link 
                        to="/stats" 
                        onClick={() => setMenuOpen(false)} 
                        className="menu-btn"
                   >
                       <span className="menu-icon">🏆</span>
                       Stats & Wrapped
                   </Link>

                   {/* --- TRENNLINIE --- */}
                   <div className="menu-divider"></div>

                   {/* 3. Admin (Nur sichtbar für dich) */}
                   {currentUser && currentUser.email === ADMIN_EMAIL && (
                       <button 
                           onClick={() => { setMenuOpen(false); setKitchenOpen(true); }}
                           className="menu-btn"
                       >
                           <span className="menu-icon">👨‍🍳</span>
                           Admin
                       </button>
                   )}

                   {/* 4. Logout (Nur wenn eingeloggt) */}
                   {currentUser && (
                       <button 
                            onClick={handleLogout} 
                            className="menu-btn logout"
                        >
                           <span className="menu-icon">🚪</span>
                           Logout
                       </button>
                   )}
               </div>
           )}

           {/* ADMIN FOOTER */}
           <footer style={{ textAlign: 'center', padding: '20px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '80px' }}>
               <p>&copy; 2025 Timo's Barista Bar</p>
               {currentUser && currentUser.email === ADMIN_EMAIL && (
                   <button 
                       onClick={() => setKitchenOpen(true)}
                       style={{
                           background: '#ef4444', color: 'white', border: 'none', 
                           padding: '8px 15px', borderRadius: '20px', marginTop: '10px',
                           cursor: 'pointer', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)'
                       }}
                   >
                       👨‍🍳 Kitchen Dashboard öffnen
                   </button>
               )}
           </footer>

        </div>
    </BrowserRouter>
  )
}

export default App