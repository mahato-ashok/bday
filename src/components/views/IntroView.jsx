import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Lock, Unlock, X } from "lucide-react";
import { birthdayData } from "../../data/birthdayData";

export default function IntroView({ onNext }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const fullText = birthdayData.intro.greeting;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 38);
    return () => clearInterval(interval);
  }, [fullText]);

  const handleStart = () => {
    setShowPasswordModal(true);
    setShake(false);
    setSuccess(false);
    setDigits(["", "", "", ""]);
    setShowHint(false);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 200);
  };

  const handleDigitChange = (idx, val) => {
    const char = val.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const nextDigits = [...digits];
    nextDigits[idx] = char;
    setDigits(nextDigits);

    if (char && idx < 3) {
      inputRefs[idx + 1].current?.focus();
    }

    const fullCode = nextDigits.join("");
    if (fullCode.length === 4) {
      if (fullCode === "2910") {
        setSuccess(true);
        setShake(false);
        const colors = ["#e8557a","#f4839e","#d4a853","#9b7fd4","#fff","#ff80ab","#ffbe3d","#2dd4bf"];
        confetti({ particleCount: 120, spread: 90, origin:{ y:.68 }, colors });
        setTimeout(() => confetti({ particleCount: 80,  spread: 140, origin:{ y:.5 }, colors }), 300);
        setTimeout(() => confetti({ particleCount: 60,  spread: 60,  origin:{ y:.8 }, colors: ["#c23b64","#f0c97a","#ffffff"] }), 550);
        setTimeout(() => {
          setShowPasswordModal(false);
          onNext();
        }, 1200);
      } else {
        setShake(true);
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          setShake(false);
          inputRefs[0].current?.focus();
        }, 750);
      }
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, 4);
    if (/^\d+$/.test(paste)) {
      const chars = paste.split("");
      const nextDigits = ["", "", "", ""];
      chars.forEach((c, i) => { if (i < 4) nextDigits[i] = c; });
      setDigits(nextDigits);
      if (paste === "2910") {
        setSuccess(true);
        const colors = ["#e8557a","#f4839e","#d4a853","#9b7fd4","#fff","#ff80ab","#ffbe3d","#2dd4bf"];
        confetti({ particleCount: 120, spread: 90, origin:{ y:.68 }, colors });
        setTimeout(() => {
          setShowPasswordModal(false);
          onNext();
        }, 1200);
      } else if (paste.length === 4) {
        setShake(true);
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          setShake(false);
          inputRefs[0].current?.focus();
        }, 750);
      }
    }
  };

  return (
    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding:"2rem",
        position:"relative",
        zIndex:10,
      }}
    >
      <style>{`
        @keyframes fadeInUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blinkCursor{ 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heartbeat  { 0%,100%{transform:scale(1)} 45%{transform:scale(1.2)} }
        @keyframes shimmerText{
          0%  {background-position:-280% center}
          100%{background-position:280% center}
        }
        @keyframes orbitRing {
          from{transform:rotate(0deg) scale(1);}
          50% {transform:rotate(180deg) scale(1.04);}
          to  {transform:rotate(360deg) scale(1);}
        }
        @keyframes orbitRing2 {
          from{transform:rotate(60deg)  scale(1);}
          50% {transform:rotate(240deg) scale(1.06);}
          to  {transform:rotate(420deg) scale(1);}
        }
        @keyframes auraPulse {
          0%,100%{opacity:.28;transform:scale(1)}
          50%    {opacity:.55;transform:scale(1.14)}
        }
        @keyframes gradientShift{
          0%  {background-position:0% 50%}
          50% {background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes nameBadge {
          0%,100%{box-shadow:0 0 0 0 rgba(232,85,122,.4),0 4px 20px rgba(195,60,100,.25)}
          50%    {box-shadow:0 0 0 8px rgba(232,85,122,.0),0 8px 32px rgba(195,60,100,.45)}
        }
        .intro-card { animation: fadeInUp 1.1s cubic-bezier(.22,.68,0,1.2) forwards; }
        .title-shimmer {
          font-family: var(--font-display);
          font-size: clamp(2.8rem,6.5vw,4.8rem);
          font-style: italic;
          font-weight: 700;
          background: linear-gradient(135deg, #7a0030 0%, #c23b64 20%, #e8557a 38%, #d4a853 55%, #ff80ab 72%, #c23b64 90%, #7a0030 100%);
          background-size: 380% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 6s linear infinite;
          line-height: 1.12;
          margin-bottom: 1.6rem;
          letter-spacing: -.5px;
        }
        .greeting-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.1rem,3vw,1.5rem);
          color: #5a3f50;
          font-weight: 500;
          line-height: 1.85;
        }
        .heart-ring-wrap {
          position: relative;
          width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2rem;
        }
        .heart-center {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(232,85,122,.18), rgba(212,168,83,.12));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 14px rgba(232,85,122,.07), 0 0 0 28px rgba(232,85,122,.035);
          animation: heartbeat 2.4s ease-in-out infinite;
          z-index: 2;
        }
        .orbit1 {
          position: absolute; inset: 0;
          border: 1.5px dashed rgba(232,85,122,.3);
          border-radius: 50%;
          animation: orbitRing 5s linear infinite;
        }
        .orbit2 {
          position: absolute; inset: -12px;
          border: 1.5px dashed rgba(212,168,83,.22);
          border-radius: 50%;
          animation: orbitRing2 7s linear infinite;
        }
        .orbit-dot {
          position: absolute;
          top: -4px; left: calc(50% - 4px);
          width: 8px; height: 8px;
          background: var(--rose);
          border-radius: 50%;
          box-shadow: 0 0 8px 3px rgba(232,85,122,.5);
        }
        .orbit-dot2 {
          position: absolute;
          top: -4px; left: calc(50% - 4px);
          width: 6px; height: 6px;
          background: var(--gold);
          border-radius: 50%;
          box-shadow: 0 0 6px 3px rgba(212,168,83,.6);
        }
        .quote-flourish {
          color: rgba(212,168,83,.55);
          font-size: 3.2rem;
          font-family: Georgia, serif;
          line-height: 0.5;
          user-select: none;
        }
        .name-badge {
          display:inline-block;
          background: linear-gradient(135deg,rgba(232,85,122,.12),rgba(212,168,83,.1));
          border: 1px solid rgba(232,85,122,.28);
          border-radius: 30px;
          padding: 4px 18px 4px 14px;
          font-family: var(--font-heading);
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--rose-deep);
          margin-bottom: 1rem;
          animation: nameBadge 2.5s ease-in-out infinite;
        }
        .divider-line {
          height:1px; width:70px;
          background:linear-gradient(90deg,transparent,#d4a853);
        }
        .divider-line-rev {
          height:1px; width:70px;
          background:linear-gradient(90deg,#d4a853,transparent);
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(24px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
        .pass-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(45, 31, 46, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .pass-modal-card {
          animation: modalPop 0.4s cubic-bezier(0.22, 0.68, 0, 1.2) forwards;
          position: relative;
          max-width: 460px; width: 100%;
          background: rgba(255, 252, 250, 0.96);
          border: 1px solid rgba(232, 85, 122, 0.3);
          border-radius: 28px;
          padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.4rem);
          box-shadow: 0 25px 60px rgba(195, 60, 100, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          text-align: center;
        }
        .pass-shake {
          animation: shakeError 0.5s ease;
        }
        .pass-digit-box {
          width: 58px; height: 68px;
          border-radius: 16px;
          border: 2px solid rgba(232, 85, 122, 0.25);
          background: rgba(255, 255, 255, 0.9);
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--rose-deep);
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(195, 60, 100, 0.08);
        }
        .pass-digit-box:focus {
          border-color: var(--rose);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 24px rgba(232, 85, 122, 0.25);
        }
        .pass-digit-box.filled {
          border-color: var(--gold);
          background: #fff8f9;
        }
        .made-with-love-tag {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--rose-deep);
          margin-top: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: 0.3px;
        }
      `}</style>

      <div
        className="glass-panel intro-card"
        style={{ maxWidth:"720px", width:"100%", padding:"clamp(2.4rem,5vw,4.2rem)", display:"flex", flexDirection:"column", alignItems:"center" }}
      >
        {/* Heart with orbit rings */}
        <div className="heart-ring-wrap">
          <div className="orbit1"><div className="orbit-dot"/></div>
          <div className="orbit2"><div className="orbit-dot2"/></div>
          <div className="heart-center">
            <Heart size={36} fill="#e8557a" color="#e8557a" />
          </div>
        </div>

        {/* Name badge */}
        <div className="name-badge">✨ For Srishti ✨</div>

        <h1 className="title-shimmer">{birthdayData.intro.title}</h1>

        {/* Opening quote */}
        <span className="quote-flourish" style={{ marginBottom:".5rem" }}>&ldquo;</span>

        <div className="greeting-text" style={{ minHeight:"6.5em", marginBottom:".5rem", padding:"0 1.2rem" }}>
          <span>{displayedText}</span>
          {!isTypingComplete && (
            <span
              style={{
                display:"inline-block", width:"2px", height:"1.2em",
                backgroundColor:"#e8557a", marginLeft:"3px",
                verticalAlign:"middle", animation:"blinkCursor .72s infinite",
              }}
            />
          )}
        </div>

        <span className="quote-flourish" style={{ marginBottom:"2.4rem" }}>&rdquo;</span>

        {/* Decorative divider */}
        <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"2.4rem", opacity:.65 }}>
          <div className="divider-line"/>
          <span style={{ color:"#d4a853", fontSize:"1.1rem" }}>&#9825;</span>
          <span style={{ color:"rgba(232,85,122,.6)", fontSize:".85rem" }}>&#9825;</span>
          <span style={{ color:"#d4a853", fontSize:"1.1rem" }}>&#9825;</span>
          <div className="divider-line-rev"/>
        </div>

        <button onClick={handleStart} className="bday-btn" style={{ fontSize:"clamp(1rem,2.5vw,1.2rem)", padding:"1rem 2.8rem" }}>
          <Sparkles size={20} />
          {birthdayData.intro.ctaButton}
          <Heart size={18} fill="white" />
        </button>

        {/* Sentimental Signature */}
        <div className="made-with-love-tag">
          Made with <Heart size={15} fill="#e8557a" color="#e8557a" /> by Ashok for his Madam jiii
        </div>
      </div>

      {/* Password Gate Modal before stepping into the world */}
      {showPasswordModal && (
        <div className="pass-modal-overlay" onClick={() => !success && setShowPasswordModal(false)}>
          <div
            className={`pass-modal-card ${shake ? "pass-shake" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            {!success && (
              <button
                onClick={() => setShowPasswordModal(false)}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  background: "rgba(232,85,122,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--rose-deep)",
                }}
              >
                <X size={18} />
              </button>
            )}

            {/* Lock / Unlock Icon */}
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: success
                  ? "linear-gradient(135deg, #2dd4bf, #14b8a6)"
                  : "linear-gradient(135deg, var(--rose-light), var(--rose))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.4rem",
                boxShadow: success
                  ? "0 8px 25px rgba(45,212,191,0.4)"
                  : "0 8px 25px rgba(232,85,122,0.35)",
                color: "white",
                transition: "all 0.3s ease",
              }}
            >
              {success ? <Unlock size={32} /> : <Lock size={32} />}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.9rem",
                color: "var(--rose-deep)",
                marginBottom: "0.5rem",
              }}
            >
              {success ? "Access Granted! 💖" : "Step Into Our World"}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.08rem",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
                marginBottom: "1.8rem",
              }}
            >
              {success
                ? "Opening our special memories for you, Madam jiii..."
                : "Enter the secret 4-digit passcode to unlock our world:"}
            </p>

            {/* PIN Inputs */}
            {!success && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                    marginBottom: "1.2rem",
                  }}
                  onPaste={handlePaste}
                >
                  {digits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={inputRefs[idx]}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`pass-digit-box ${digit ? "filled" : ""}`}
                    />
                  ))}
                </div>

                {shake && (
                  <p
                    style={{
                      color: "var(--rose)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-heading)",
                      marginBottom: "0.8rem",
                    }}
                  >
                    Incorrect code! Try our special date (2910) 🙈
                  </p>
                )}

                <div>
                  <button
                    onClick={() => setShowHint((h) => !h)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--gold)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      textDecoration: "underline",
                      padding: "4px 8px",
                    }}
                  >
                    {showHint ? "Hide hint" : "Need a hint? 🤫"}
                  </button>

                  {showHint && (
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.92rem",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Hint: The passcode is <strong>2910</strong> ♡
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Sub-signature */}
            <div
              style={{
                marginTop: "1.6rem",
                paddingTop: "1rem",
                borderTop: "1px dashed rgba(232,85,122,0.2)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "0.92rem",
                color: "var(--ink-soft)",
                opacity: 0.8,
              }}
            >
              Made with love by Ashok for his Madam jiii ❤️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

