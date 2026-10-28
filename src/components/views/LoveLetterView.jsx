import React, { useState, useEffect } from "react";
import { birthdayData } from "../../data/birthdayData";

export default function LoveLetterView({ onNext }) {
  const { lines, ctaButton } = birthdayData.loveLetter;
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setCardVisible(true), 150);
    const t1 = setTimeout(() => setShowMusicHint(true), 2200);
    const t2 = setTimeout(() => setShowMusicHint(false), 6500);
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        if (i === lines.length - 1) {
          setTimeout(() => setShowButton(true), 850);
        }
      }, 950 + i * 1300);
    });
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes lineReveal {
          from { opacity: 0; transform: translateY(20px) translateX(-8px); }
          to   { opacity: 1; transform: translateY(0)   translateX(0); }
        }
        @keyframes btnAppear {
          from { opacity: 0; transform: scale(.88) translateY(14px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        @keyframes envelopeFloat {
          0%,100% { transform: translateY(0) rotate(-4deg) scale(1); }
          50%     { transform: translateY(-14px) rotate(4deg) scale(1.06); }
        }
        @keyframes cardEntrance {
          from { opacity:0; transform:translateY(40px) scale(.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes topBarShimmer {
          0%  {background-position:0% 50%}
          50% {background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes auraBreath {
          0%,100%{opacity:.35;transform:scale(1)}
          50%    {opacity:.6;transform:scale(1.06)}
        }
        @keyframes musicHintIn {
          from { opacity:0; transform:translateX(60px) scale(.9); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes musicHintOut {
          from { opacity:1; transform:translateX(0); }
          to   { opacity:0; transform:translateX(60px); }
        }
        .music-hint {
          position: fixed;
          top: 80px; right: 20px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(232,85,122,.28);
          border-radius: 16px;
          padding: 10px 16px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 28px rgba(195,60,100,.18);
          font-family: var(--font-heading);
          font-size: .82rem; font-weight: 600;
          color: var(--rose-deep);
          z-index: 9999;
          pointer-events: none;
        }
        .music-hint-in  { animation: musicHintIn  .5s cubic-bezier(.22,.68,0,1.2) forwards; }
        .music-hint-out { animation: musicHintOut .4s ease-in forwards; }
        .love-line {
          opacity: 0;
          animation: lineReveal .85s cubic-bezier(.22,.68,0,1.1) forwards;
        }
        .love-btn-appear {
          animation: btnAppear .75s cubic-bezier(.22,.68,0,1.2) forwards;
        }
        .envelope-icon {
          font-size: 3.8rem;
          animation: envelopeFloat 4.5s ease-in-out infinite;
          margin-bottom: 2rem;
          filter: drop-shadow(0 5px 20px rgba(195,60,100,.38));
        }
        .letter-wrapper {
          position: relative;
          max-width: 660px;
          width: 100%;
        }
        .letter-aura {
          position: absolute;
          top: -18px; left: -18px; right: -18px; bottom: -18px;
          background: linear-gradient(135deg, rgba(232,85,122,.1), rgba(212,168,83,.08), rgba(155,127,212,.1));
          border-radius: 40px;
          filter: blur(20px);
          z-index: -1;
          animation: auraBreath 4s ease-in-out infinite;
        }
        .card-in {
          animation: cardEntrance .9s cubic-bezier(.22,.68,0,1.1) forwards;
        }
        .top-bar-shimmer {
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4a853, #e8557a, #9b7fd4, #d4a853, transparent);
          background-size: 300% auto;
          border-radius: 2px;
          margin-bottom: 2.2rem;
          animation: topBarShimmer 4s ease infinite;
        }
      `}</style>

      <div className="envelope-icon">💌</div>

      <div className={`letter-wrapper letter-card ${cardVisible ? "card-in" : ""}`}
        style={{ padding:"clamp(2rem,5vw,3.6rem)", opacity: cardVisible ? undefined : 0 }}>
        <div className="letter-aura"/>

        {/* Animated top bar */}
        <div className="top-bar-shimmer"/>

        <div style={{ marginBottom:"2.6rem", display:"flex", flexDirection:"column", gap:"1.3rem" }}>
          {lines.map((line, i) =>
            i < visibleLines ? (
              <p
                key={i}
                className="love-line"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.1rem,2.8vw,1.42rem)",
                  fontStyle: "italic",
                  color: i === lines.length - 1 ? "var(--rose-deep)" : "var(--ink-soft)",
                  fontWeight: i === lines.length - 1 ? 600 : 400,
                  lineHeight: 1.75,
                  paddingLeft: "1.1rem",
                  borderLeft: i === lines.length - 1
                    ? "3px solid var(--gold)"
                    : "2px solid rgba(232,85,122,.18)",
                }}
              >
                {line}
              </p>
            ) : null
          )}
        </div>

        {/* Decorative divider */}
        <div style={{ textAlign:"center", fontSize:"1rem", letterSpacing:"12px", marginBottom:"2rem", opacity:.5 }}>
          <span style={{ color:"var(--rose-light)" }}>&#9825;</span>
          {" "}
          <span style={{ color:"var(--gold)" }}>&#9733;</span>
          {" "}
          <span style={{ color:"var(--rose-light)" }}>&#9825;</span>
        </div>

        {showButton && (
          <div style={{ textAlign:"center" }} className="love-btn-appear">
            <button onClick={onNext} className="bday-btn" style={{ fontSize:"clamp(.95rem,2.5vw,1.18rem)", padding:"1rem 2.6rem" }}>
              <span>💌</span>
              {ctaButton}
            </button>
          </div>
        )}
      </div>

      {/* Music nudge toast */}
      {showMusicHint && (
        <div className="music-hint music-hint-in">
          <span>🎵</span>
          <span>Click &ldquo;Play Music&rdquo; for the full experience!</span>
        </div>
      )}
    </div>
  );
}


