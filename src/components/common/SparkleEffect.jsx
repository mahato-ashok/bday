import React, { useMemo } from "react";

const COLORS = [
  "rgba(212,168,83,0.95)",
  "rgba(232,85,122,0.8)",
  "rgba(155,127,212,0.75)",
  "rgba(255,255,255,0.95)",
  "rgba(45,212,191,0.7)",
  "rgba(255,128,171,0.8)",
  "rgba(255,190,61,0.85)",
];

export default function SparkleEffect({ count = 65 }) {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 5 + 2,
      delay: Math.random() * 6,
      color: COLORS[i % COLORS.length],
      isDiamond: i % 3 === 0,
    }));
  }, [count]);

  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }}>
      <style>{`
        @keyframes twinkleAnim {
          0%,100% { opacity:0; transform:scale(.2) rotate(0deg); }
          40%      { opacity:1; transform:scale(1.2) rotate(45deg); }
          70%      { opacity:.7; transform:scale(.9) rotate(90deg); }
        }
        @keyframes twinkleDiamond {
          0%,100% { opacity:0; transform:scale(.2) rotate(45deg); }
          40%      { opacity:1; transform:scale(1.3) rotate(0deg); }
          70%      { opacity:.6; transform:scale(.8) rotate(45deg); }
        }
      `}</style>
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position:"absolute",
            top:`${s.top}%`,
            left:`${s.left}%`,
            width:`${s.size}px`,
            height:`${s.size}px`,
            borderRadius: s.isDiamond ? "1px" : "50%",
            clipPath: s.isDiamond ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" : undefined,
            backgroundColor: s.color,
            boxShadow:`0 0 ${s.size * 2.5}px ${s.size * 1.2}px ${s.color}`,
            animation:`${s.isDiamond ? "twinkleDiamond" : "twinkleAnim"} ${s.duration}s ease-in-out infinite`,
            animationDelay:`${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

