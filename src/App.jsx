import React, { useState, useEffect } from 'react';

const WEAPONS = {
  primary: [
    { id: 'xm8', name: 'XM8', category: 'ASSAULT RIFLE', src: 'xm8.png', locked: true },
    { id: 'vss', name: 'VSS', category: 'SNIPER RIFLE', src: 'vss.png', locked: true },
    { id: 'shield', name: 'SHIELD', category: 'DEFENSE', src: 'shield.png', locked: false }
  ],
  secondary: [
    { id: 'mk2', name: 'MK.2 PISTOL', category: 'HANDGUN', src: 'mk2.png', locked: true }
  ],
  support: [
    { id: 'chaff', name: 'CHAFF G.', category: 'PROJECTILE', src: 'chaff.png', locked: false },
    { id: 'smoke', name: 'SMOKE G.', category: 'PROJECTILE', src: 'smoke.png', locked: false },
    { id: 'stun', name: 'STUN G.', category: 'PROJECTILE', src: null, locked: false }, // No image
    { id: 'mag', name: 'MAGAZINE', category: 'DECOY', src: 'magizine.png', locked: false },
    { id: 'sgsatchel', name: 'SG SATCHEL', category: 'EXPLOSIVE', src: 'sgsatchel.png', locked: false },
    { id: 'sgmine', name: 'SG MINE', category: 'TRAP', src: 'sgmine.png', locked: false }
  ]
};

const MAX_OPTIONS = 4;

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(WEAPONS.primary[0]);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelect = (item) => {
    if (item.locked) return;

    if (selectedOptions.includes(item.id)) {
      setSelectedOptions(selectedOptions.filter(id => id !== item.id));
      setErrorMsg("");
    } else {
      if (selectedOptions.length < MAX_OPTIONS) {
        setSelectedOptions([...selectedOptions, item.id]);
        setErrorMsg("");
      } else {
        setErrorMsg("MAX LIMIT REACHED (4 OPTIONS)");
        setTimeout(() => setErrorMsg(""), 2000);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === MAX_OPTIONS) {
      setShowModal(true);
    } else {
      setErrorMsg(`PLEASE SELECT ${MAX_OPTIONS - selectedOptions.length} MORE OPTION(S)`);
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const isSelected = (item) => item.locked || selectedOptions.includes(item.id);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono uppercase overflow-x-hidden flex flex-col relative pb-24 selection:bg-orange-500">
      
      {/* CSS and Global Styles */}
      <style>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.4) 50%,
            rgba(0,0,0,0.4)
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
        
        .mgo-header-gradient {
          background: linear-gradient(90deg, rgba(230,100,0,0.8) 0%, rgba(60,30,0,0.9) 40%, rgba(20,10,0,0.95) 100%);
          border-top: 1px solid #ff8800;
          border-bottom: 2px solid #ff8800;
        }

        /* Complex CSS filters to force specific colors onto transparent PNGs */
        .img-blue {
          filter: brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(300%) hue-rotate(160deg) brightness(1.2) drop-shadow(0 0 2px rgba(0, 150, 255, 0.5));
          opacity: 0.7;
          transition: all 0.2s;
        }
        
        .img-orange {
          filter: brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(500%) hue-rotate(1deg) brightness(1.1) drop-shadow(0 0 5px rgba(255, 120, 0, 0.8));
          opacity: 1;
          transition: all 0.2s;
        }
      `}</style>
      
      <div className="absolute inset-0 scanlines z-50 mix-blend-overlay"></div>

      {/* Top Title Bar */}
      <div className="w-full bg-[#111] border-b border-orange-700 p-2 z-10 flex justify-between items-center px-6">
         <div className="text-orange-500 tracking-[0.3em] text-sm md:text-base font-bold">
           DREBIN POINTS // SNEAKING MISSION LOADOUT VOTE
         </div>
         <div className="text-orange-400 tracking-widest text-xs">
           SELECTED: {selectedOptions.length} / {MAX_OPTIONS} OPTIONS
         </div>
      </div>

      <div className="max-w-6xl mx-auto w-full p-4 flex-grow flex flex-col gap-6 z-10 mt-4 relative">

        {/* Dynamic Info Display (Hover) */}
        <div className="w-full h-16 flex flex-col justify-center items-center mb-2">
           <div className="flex gap-4 text-xs md:text-sm tracking-[0.2em] text-orange-600 mb-1">
             <span>CATEGORY</span>
             <span>WEAPON</span>
           </div>
           <div className="flex gap-4 text-base md:text-2xl tracking-[0.2em] font-bold text-orange-400">
             <span>{hoveredItem?.category || '---'}</span>
             <span className="text-orange-200">{hoveredItem?.name || '---'}</span>
           </div>
        </div>

        {/* Error / Feedback Message */}
        <div className="h-6 w-full text-center text-red-500 font-bold tracking-widest animate-pulse">
           {errorMsg}
        </div>

        {}
        {Object.entries(WEAPONS).map(([categoryName, items]) => (
          <div key={categoryName} className="w-full flex flex-col mb-4">
            
            {/* Category Header */}
            <div className="mgo-header-gradient px-4 py-1 mb-2 flex items-center shadow-lg">
              <span className="text-orange-200 font-bold tracking-[0.3em] text-sm md:text-lg">
                <span className="mr-2 opacity-70">
                  {categoryName === 'primary' ? '🔫' : categoryName === 'secondary' ? '🔫' : '📦'}
                </span>
                {categoryName}
              </span>
            </div>

            {/* Weapon Row Container */}
            <div className="flex flex-row overflow-x-auto py-4 px-2 gap-4 bg-black/60 border-y border-gray-800 scrollbar-hide min-h-[140px] items-center">
              {items.map((item) => {
                const selected = isSelected(item);
                
                return (
                  <div 
                    key={item.id} 
                    className={`
                      relative flex flex-col items-center justify-center min-w-[120px] md:min-w-[160px] h-24 md:h-32 cursor-pointer transition-all duration-200
                      ${selected ? 'bg-orange-900/20' : 'hover:bg-white/5'}
                    `}
                    onMouseEnter={() => setHoveredItem(item)}
                    onClick={() => handleSelect(item)}
                  >
                    {/* Targeting Brackets (Only visible if selected) */}
                    {selected && (
                      <>
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>
                      </>
                    )}

                    {/* Image / Placeholder */}
                    <div className="w-20 h-12 md:w-28 md:h-16 flex items-center justify-center relative z-10 mb-2">
                      {item.src ? (
                        <img 
                          src={item.src} 
                          alt={item.name} 
                          className={`max-w-full max-h-full object-contain ${selected ? 'img-orange scale-110' : 'img-blue'}`}
                        />
                      ) : (
                         <div className={`w-full h-full border-2 border-dashed flex items-center justify-center text-xs tracking-widest ${selected ? 'border-orange-500 text-orange-500' : 'border-blue-500 text-blue-500 opacity-50'}`}>
                           NO IMG
                         </div>
                      )}
                    </div>
                    
                    {/* Status Text (Locked / Option indicator) */}
                    <div className={`text-xs md:text-sm font-bold tracking-widest mt-2 z-10 ${item.locked ? 'text-gray-400' : (selected ? 'text-orange-500' : 'text-blue-500/70')}`}>
                      {item.locked ? '-LOCKED-' : (selected ? 'SELECTED' : 'OPTION')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom OK Bar */}
      <div className={`
        fixed bottom-0 left-0 w-full z-40 transition-all duration-300
        border-t-2 border-b-4 ${selectedOptions.length === MAX_OPTIONS ? 'border-orange-500 mgo-header-gradient cursor-pointer hover:brightness-125' : 'border-gray-800 bg-gray-900 cursor-not-allowed'}
      `}
      onClick={handleSubmit}
      >
        <div className="w-full flex justify-center items-center py-3">
           <span className={`
             text-xl md:text-2xl tracking-[0.5em] font-bold 
             ${selectedOptions.length === MAX_OPTIONS ? 'text-orange-200 drop-shadow-[0_0_8px_rgba(255,150,0,1)]' : 'text-gray-600'}
           `}>
             OK
           </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
          <div className="bg-[#111] border-2 border-orange-500 max-w-lg w-full p-6 text-center shadow-[0_0_40px_rgba(255,136,0,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full mgo-header-gradient py-2 mb-6 border-x border-orange-500">
                 <h2 className="text-xl md:text-2xl font-bold text-orange-200 tracking-widest uppercase">
                   Vote Cast Successfully!
                 </h2>
              </div>
              
              <p className="text-gray-300 mb-4 text-sm tracking-widest">
                SNEAKING MISSION LOADOUT:
              </p>

              <div className="w-full bg-black/50 p-4 border border-orange-900/50 mb-8 flex flex-col gap-2 text-left">
                 <p className="text-orange-500 font-bold tracking-widest border-b border-gray-800 pb-1">LOCKED ARSENAL:</p>
                 <ul className="text-gray-400 text-sm tracking-wider mb-2 pl-4 list-disc list-inside">
                   <li>XM8 (ASSAULT RIFLE)</li>
                   <li>VSS (SNIPER RIFLE)</li>
                   <li>MK.2 PISTOL (HANDGUN)</li>
                 </ul>
                 
                 <p className="text-orange-500 font-bold tracking-widest border-b border-gray-800 pb-1 mt-2">SELECTED OPTIONS:</p>
                 <ul className="text-orange-300 text-sm tracking-wider pl-4 list-disc list-inside">
                   {selectedOptions.map(id => {
                     // Find item in all weapons
                     let foundItem;
                     Object.values(WEAPONS).forEach(category => {
                       const item = category.find(i => i.id === id);
                       if (item) foundItem = item;
                     });
                     return <li key={id}>{foundItem?.name} ({foundItem?.category})</li>;
                   })}
                 </ul>
              </div>
              
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedOptions([]);
                }}
                className="w-full border-2 border-orange-500 bg-orange-900/30 text-orange-500 px-8 py-3 hover:bg-orange-500 hover:text-black transition-colors font-bold tracking-[0.3em] text-lg"
              >
                RETURN TO LOBBY
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}