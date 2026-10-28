import React, { useMemo } from "react";

const SYMBOLS = ["💖","🌸","✨","💕","🌹","💫","🦋","💗","⭐","🌷","💝","🎀","🌺","💞","🍒","💘","🌟","🫧"];

export default function FloatingHearts() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: Math.random() * 96,
      size: Math.random() * 22 + 13,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 130,
      opacity: Math.random() * 0.42 + 0.22,
      rotation: Math.random() * 360,
      rotDelta: (Math.random() - 0.5) * 180,
    }));
  }, []);

  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"hidden", zIndex:1 }}>
      <style>{`
        @keyframes floatUpward {
          0%   { transform:translateY(110vh) translateX(0) rotate(var(--rot-start)); opacity:0; }
          8%   { opacity:var(--op); }
          88%  { opacity:var(--op); }
          100% { transform:translateY(-20vh) translateX(var(--drift)) rotate(var(--rot-end)); opacity:0; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position:"absolute",
            left:`${p.left}%`,
            fontSize:`${p.size}px`,
            "--drift":`${p.drift}px`,
            "--op": p.opacity,
            "--rot-start":`${p.rotation}deg`,
            "--rot-end":`${p.rotation + p.rotDelta}deg`,
            animation:`floatUpward ${p.duration}s ease-in-out infinite`,
            animationDelay:`${p.delay}s`,
            opacity:0,
            userSelect:"none",
            filter:`drop-shadow(0 2px 8px rgba(195,60,100,.28)) drop-shadow(0 0 4px rgba(212,168,83,.15))`,
          }}
        >{p.symbol}</span>
      ))}
    </div>
  );
}

