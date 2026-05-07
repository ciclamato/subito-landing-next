import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type EmojiAvatarProps = {
  mood: 'great' | 'good' | 'meh' | 'bad' | null;
  size?: number;
  isUserTyping?: boolean;
  reaction?: 'wow' | 'happy' | null;
};

export default function EmojiAvatar({ mood, size = 64, isUserTyping = false, reaction = null }: EmojiAvatarProps) {
  // Blinking logic to make it feel alive
  const [isBlinking, setIsBlinking] = useState(false);
  
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Don't blink if typing or reacting, keeps the expression focused
      if (!isUserTyping && !reaction) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150); // Blink duration
      }
    }, 4500); // Blink every 4.5 seconds
    
    return () => clearInterval(blinkInterval);
  }, [isUserTyping, reaction]);

  let color = 'transparent';
  // Idle state: subtle, friendly smile, wide-set eyes (not a dead straight line)
  // We use exclusively M and Q commands for ALL mouths so framer-motion interpolates perfectly without twisting.
  let path = "M 25 42 Q 32 48 39 42"; 
  
  if (mood === 'great') {
    color = '#FFD700'; // Gold
    path = "M 21 40 Q 32 52 43 40"; // Cheerful, broad smile (but not crazy)
  } else if (mood === 'good') {
    color = '#7BB87B'; // Green
    path = "M 23 41 Q 32 48 41 41"; // Standard nice smile
  } else if (mood === 'meh') {
    color = '#8B8FA3'; // Grey-blue
    path = "M 24 44 Q 32 44 40 44"; // Straight line (using Q for interpolation)
  } else if (mood === 'bad') {
    color = '#6B7FCC'; // Blue
    path = "M 24 46 Q 32 40 40 46"; // Frown
  }

  // Base eye positions (wide-set like the reference image)
  let eyeCy = mood === 'great' ? 26 : 28;
  let eyeCxL = 20;
  let eyeCxR = 44;
  let eyeR = 3;
  let filterBlur = "blur(10px)";
  let opacity = mood ? 0.6 : 0;
  
  if (isUserTyping && !reaction) {
    eyeCy = 31; // Look down
    eyeCxL = 23; // Look slightly inward/down
    eyeCxR = 41; 
    path = "M 29 44 Q 32 44 35 44"; // Focused small straight mouth
  }

  // Reaction override
  if (reaction === 'wow') {
    color = '#9B4DBA'; // Subtle purple glow
    eyeCy = 27;
    eyeCxL = 21;
    eyeCxR = 43;
    eyeR = 3.5; // Slightly wider eyes
    // Small tight 'U' mouth (interpolates perfectly and looks like a subtle 'o')
    path = "M 29 42 Q 32 48 35 42"; 
    opacity = 0.5;
    filterBlur = "blur(12px)";
  } else if (reaction === 'happy') {
    color = '#FFD700'; // Gold flare
    eyeCy = 26;
    eyeR = 3;
    path = "M 23 41 Q 32 48 41 41"; // Good smile
    opacity = 0.5;
    filterBlur = "blur(12px)";
  }

  // Apply blink
  const ry = isBlinking ? 0.5 : eyeR;

  return (
    <motion.div 
      className="emoji-avatar-container" 
      style={{ width: size, height: size }}
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        <circle cx="32" cy="32" r="30" fill="var(--dark-card)" stroke="var(--cream-dim)" strokeWidth="2"/>
        
        {/* Glow / Aura */}
        <motion.circle 
          cx="32" 
          cy="20" 
          r="16" 
          fill={color} 
          filter={filterBlur}
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          transition={{ duration: reaction ? 0.2 : 0.6, ease: "easeOut" }}
        />
        
        {/* Eyes (using ellipse to animate blinking via ry) */}
        <motion.ellipse 
          cx={eyeCxL} 
          cy={eyeCy} 
          rx={eyeR}
          ry={ry} 
          fill="var(--cream)"
          animate={{ cx: eyeCxL, cy: eyeCy, rx: eyeR, ry: ry }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <motion.ellipse 
          cx={eyeCxR} 
          cy={eyeCy} 
          rx={eyeR}
          ry={ry} 
          fill="var(--cream)"
          animate={{ cx: eyeCxR, cy: eyeCy, rx: eyeR, ry: ry }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        
        {/* Mouth */}
        <motion.path 
          d={path} 
          stroke="var(--cream)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          animate={{ d: path }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        />
      </svg>
    </motion.div>
  );
}
