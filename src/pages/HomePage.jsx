import React from 'react';
// Header Import kann weg, da er jetzt in App.jsx ist
import StampCard from '../components/StampCard';
import CoffeeCard from '../components/CoffeeCard';
import CurrentBeanCard from '../components/CurrentBeanCard'; 

export default function HomePage({ 
    currentUser, 
    coffeeCount, 
    favorites, 
    handleOrderClick, 
    handleToggleFav, 
    // setMenuOpen und setLoginOpen brauchen wir hier nicht mehr für den Header
    KAFFEE_SORTEN 
}) {
  return (
    <>
       {/* HEADER IST JETZT IN APP.JSX -> HIER LÖSCHEN */}
       
       {/* NAVBAR IST JETZT IN APP.JSX -> KOMMT AUTOMATISCH DAVOR */}

       {/* 3. FENSTER AKTUELLE RÖSTUNG (Jetzt an erster Stelle im Content) */}
       <CurrentBeanCard />

       {/* 4. TREUEKARTE (Kommt danach) */}
       {currentUser && (
           <div style={{ padding: '0 20px' }}>
               <StampCard totalCount={coffeeCount} />
           </div>
       )}

       {/* 5. FAVORITEN & LISTE (Wie gehabt) */}
       {Object.keys(favorites).length > 0 && (
           <div className="menu-list" style={{ marginBottom: '0px', paddingBottom: '0px' }}>
               <div className="section-title" style={{ padding: '10px 20px', color: '#d4b483', fontWeight: 'bold' }}>
                   ❤️ Deine Lieblinge
               </div>
               {KAFFEE_SORTEN.filter(sorte => favorites[sorte.name]).map((sorte) => (
                   <CoffeeCard 
                       key={'fav-' + sorte.name} 
                       coffee={sorte}
                       isFav={true}
                       onOrder={handleOrderClick}
                       onToggleFav={handleToggleFav}
                   />
               ))}
               <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.1)', margin: '20px' }}></div>
           </div>
       )}

       <div className="section-title" style={{padding: '10px 20px', color: '#fff', opacity: 0.6}}>Alle Kaffees</div>
       <div className="menu-list" id="menu-container" style={{ paddingBottom: '100px' }}>
           {KAFFEE_SORTEN.map((sorte) => (
               <CoffeeCard 
                   key={sorte.name} 
                   coffee={sorte}
                   isFav={favorites[sorte.name]}
                   onOrder={handleOrderClick}
                   onToggleFav={handleToggleFav}
               />
           ))}
       </div>
    </>
  );
}