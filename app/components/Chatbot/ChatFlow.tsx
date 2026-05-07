import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiAvatar from "./EmojiAvatar";
import ContentCard from "./ContentCard";
import { MESSAGES, MOODS, CIRCUITS, MoodType } from "./chatbotData";

type ChatFlowProps = {
  isOpen: boolean;
};

type Step = 'GREETING' | 'MOOD_ASK' | 'MOOD_RESPONSE' | 'CIRCUIT_MENU' | 'CONTENT_DISPLAY';

type DrawerItem = {
  id: string;
  label: string;
  color: string;
};

export default function ChatFlow({ isOpen }: ChatFlowProps) {
  const [step, setStep] = useState<Step>('GREETING');
  const [mood, setMood] = useState<MoodType>(null);
  const [activeCircuit, setActiveCircuit] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [botReaction, setBotReaction] = useState<'wow' | 'happy' | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerItems, setDrawerItems] = useState<DrawerItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Fake typing effect for user
  useEffect(() => {
    if (inputValue.length > 0) {
      setIsUserTyping(true);
      const timer = setTimeout(() => setIsUserTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsUserTyping(false);
    }
  }, [inputValue]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, activeCircuit, drawerItems, isDrawerOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen) {
      setStep('GREETING');
      setMood(null);
      setActiveCircuit(null);
      setDrawerItems([]);
      setInputValue("");
      setIsDrawerOpen(false);
      const t1 = setTimeout(() => setStep('MOOD_ASK'), 1500);
      return () => clearTimeout(t1);
    }
  }, [isOpen]);

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    const moodObj = MOODS.find(m => m.id === selectedMood);
    
    setDrawerItems(prev => [...prev, { 
      id: 'mood', 
      label: `Clima: ${moodObj?.label}`, 
      color: moodObj?.color || 'var(--cream)' 
    }]);

    setStep('MOOD_RESPONSE');
    setTimeout(() => {
      setStep('CIRCUIT_MENU');
      // Keep mood briefly, then clear color but keep drawer item
      setTimeout(() => setMood(null), 1500);
    }, 2500);
  };

  const handleCircuitSelect = (circuit: any) => {
    setBotReaction('happy');
    setTimeout(() => setBotReaction(null), 1500);
    setActiveCircuit(circuit);
    
    // update drawer items
    setDrawerItems(prev => {
      const filtered = prev.filter(item => item.id !== 'circuit');
      return [...filtered, { 
        id: 'circuit', 
        label: `Explorando: ${circuit.label.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '')}`, 
        color: 'var(--purple-light)' 
      }];
    });

    setStep('CONTENT_DISPLAY');
  };

  const handleCardClick = (item: any) => {
    setBotReaction('wow');
    setTimeout(() => setBotReaction(null), 1500);

    setDrawerItems(prev => {
      const title = item.title || item.name;
      if (prev.find(i => i.id === title)) return prev;
      return [...prev, {
        id: title,
        label: `Elegido: ${title}`,
        color: 'var(--gold)'
      }];
    });
  };

  const handleUserMessage = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    // Give a brief happy reaction as feedback that something happened
    setBotReaction('happy');
    setTimeout(() => setBotReaction(null), 1500);
  };

  return (
    <div className="chat-flow-container">
      <div className="chat-header">
        <EmojiAvatar mood={mood} size={80} isUserTyping={isUserTyping} reaction={botReaction} />
      </div>

      <div className="chat-messages" ref={scrollRef}>
        <AnimatePresence mode="popLayout">
          {/* Messages rendered similar to before */}
          <motion.div key="greeting" className="bot-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            {MESSAGES.greeting}
          </motion.div>

          {(step === 'MOOD_ASK' || step === 'MOOD_RESPONSE' || step === 'CIRCUIT_MENU' || step === 'CONTENT_DISPLAY') && (
            <motion.div key="moodAsk" className="bot-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {MESSAGES.moodAsk}
            </motion.div>
          )}

          {step === 'MOOD_ASK' && (
            <motion.div key="moodOptions" className="mood-options" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
              {MOODS.map(m => (
                <button key={m.id} className="mood-btn" onClick={() => handleMoodSelect(m.id as MoodType)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span dangerouslySetInnerHTML={{ __html: m.svg }} style={{ color: m.color }} />
                  {m.label}
                </button>
              ))}
            </motion.div>
          )}

          {(step === 'MOOD_RESPONSE' || step === 'CIRCUIT_MENU' || step === 'CONTENT_DISPLAY') && drawerItems.find(i => i.id === 'mood') && (
            <motion.div key="userMood" className="user-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {drawerItems.find(i => i.id === 'mood')?.label.replace('Clima: ', '')}
            </motion.div>
          )}

          {(step === 'MOOD_RESPONSE' || step === 'CIRCUIT_MENU' || step === 'CONTENT_DISPLAY') && mood && (
            <motion.div key="moodResponse" className="bot-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {MESSAGES.moodResponses[mood]}
            </motion.div>
          )}

          {(step === 'CIRCUIT_MENU' || step === 'CONTENT_DISPLAY') && (
            <motion.div key="circuitPrompt" className="bot-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {activeCircuit ? MESSAGES.circuitBack : MESSAGES.circuitPrompt}
            </motion.div>
          )}

          {step === 'CIRCUIT_MENU' && (
            <motion.div key="circuitOptions" className="circuit-options" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {CIRCUITS.map(c => (
                <button key={c.id} className="circuit-btn" onClick={() => handleCircuitSelect(c)} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span dangerouslySetInnerHTML={{ __html: c.svg }} style={{ display: 'flex', color: 'var(--purple-light)' }} />
                  {c.label}
                </button>
              ))}
            </motion.div>
          )}

          {step === 'CONTENT_DISPLAY' && activeCircuit && (
            <motion.div key="userCircuit" className="user-bubble" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {activeCircuit.label}
            </motion.div>
          )}
          
          {step === 'CONTENT_DISPLAY' && activeCircuit && (
            <motion.div key="circuitCards" className="circuit-cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {activeCircuit.data.map((item: any, i: number) => (
                <ContentCard key={i} item={item} type={activeCircuit.type} onClick={() => handleCardClick(item)} />
              ))}
              <button className="back-to-menu-btn" onClick={() => { setActiveCircuit(null); setStep('CIRCUIT_MENU'); }}>
                ← Explorar otros circuitos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drawer: Tu Recorrido */}
      <div className="circuit-drawer-container">
        <div className="chat-footer-status" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot" style={{ backgroundColor: drawerItems.length > 0 ? 'var(--purple-light)' : 'var(--dark-border)' }}></span>
            TU RECORRIDO {drawerItems.length > 0 && `(${drawerItems.length})`}
          </div>
          <motion.div
            animate={{ rotate: isDrawerOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▲
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div 
              className="circuit-drawer-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {drawerItems.length === 0 ? (
                <div className="circuit-drawer-empty">Aún no has explorado nada.</div>
              ) : (
                drawerItems.map((item) => (
                  <div key={item.id} className="circuit-drawer-item">
                    <span className="circuit-item-dot" style={{ backgroundColor: item.color }}></span>
                    <span className="circuit-item-label">{item.label}</span>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Box */}
      <div className="chat-input-area">
        <input 
          type="text" 
          className="chat-input"
          placeholder="Escribí un mensaje..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
             if(e.key === 'Enter') handleUserMessage();
          }}
        />
        <button className="chat-send-btn" onClick={handleUserMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
