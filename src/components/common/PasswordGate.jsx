import React, { useState, useRef, useEffect } from "react";
import { Lock, Unlock, Heart } from "lucide-react";

const CORRECT = "2910";

export default function PasswordGate({ onUnlock }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake]   = useState(false);
  const [success, setSuccess] = useState(false);
  const [hint, setHint]     = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  /* auto-focus first box on mount */
  useEffect(() => { refs[0].current?.focus(); }, []);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);

    /* move to next box */
    if (val && idx < 3) refs[idx + 1].current?.focus();

    /* check when all 4 filled */
    if (val && idx === 3) {
      const entered = [...next].join("");
      if (entered === CORRECT) {
        setSuccess(true);
        setTimeout(onUnlock, 1200);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(["", "", "", ""]);
          refs[0].current?.focus();
        }, 700);
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      zIndex: 10,
    }}>
      <style>{`
        @keyframes gateIn     { from{opacity:0;transform:translateY(40px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shake      { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
        @keyframes unlockPop  { 0%{transform:scale(1)} 50%{transform:scale(1.18)} 100%{transform:scale(1)} }
        @keyframes heartPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        @keyframes shimmerText{ 0%{background-position:-280% center} 100%{background-position:280% center} }
        @keyframes floatLock  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes successGlow{ 0%,100%{box-shadow:0 0 0 0 rgba(232,85,122,.4)} 50%{box-shadow:0 0 0 18px rgba(232,85,122,0)} }

        .gate-card   { animation: gateIn 1s cubic-bezier(.22,.68,0,1.2) forwards; }
        .gate-shake  { animation: shake .6s ease forwards; }
        .gate-unlock { animation: unlockPop .5s ease forwards; }

        .pin-box {
          width: 62px; height: 74px;
          border: 2px solid rgba(232,85,122,.3);
          border-radius: 18px;
          background: rgba(255,255,255,.92);
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--rose-deep);
          outline: none;
          caret-color: transparent;
          transition: border-color .25s, box-shadow .25s, transform .2s;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 18px rgba(195,60,100,.1);
        }
        .pin-box:focus {
          border-color: var(--rose);
          box-shadow: 0 0 0 4px rgba(232,85,122,.18), 0 6px 24px rgba(195,60,100,.2);
          transform: scale(1.06);
        }
        .pin-box.filled {
          border-color: var(--gold);
          background: linear-gradient(135deg, rgba(255,250,240,.98), rgba(255,245,230,.96));
        }
        .pin-box.correct {
          border-color: var(--rose);
          background: linear-gradient(135deg, rgba(255,236,245,.98), rgba(255,220,235,.96));
          animation: successGlow .5s ease;
        }

        .gate-title {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2rem,5vw,3.2rem);
          background: linear-gradient(135deg,#7a0030 0%,#c23b64 25%,#e8557a 45%,#d4a853 60%,#ff80ab 80%,#c23b64 100%);
          background-size: 350% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 5s linear infinite;
          text-align: center;
          line-height: 1.2;
          margin-bottom: .6rem;
        }
        .gate-sub {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1rem,2.5vw,1.15rem);
          color: var(--ink-soft);
          text-align: center;
          line-height: 1.75;
          margin-bottom: 2.4rem;
        }
        .lock-icon-wrap {
          width: 76px; height: 76px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(232,85,122,.14), rgba(212,168,83,.1));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 0 0 0 12px rgba(232,85,122,.06), 0 0 0 24px rgba(232,85,122,.03);
          animation: floatLock 3.5s ease-in-out infinite;
        }
        .hint-btn {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-heading); font-size: .78rem;
          color: rgba(90,63,80,.45); letter-spacing: .5px;
          margin-top: 1.4rem; padding: 4px 10px;
          border-radius: 8px;
          transition: color .2s;
        }
        .hint-btn:hover { color: var(--rose-deep); }
        .hint-text {
          font-family: var(--font-serif); font-style: italic;
          font-size: .9rem; color: var(--rose-deep);
          margin-top: .6rem; opacity: .75;
          text-align: center;
        }
        .wrong-msg {
          font-family: var(--font-heading); font-size: .82rem;
          color: var(--rose); font-weight: 600;
          margin-top: 1rem; text-align: center;
          opacity: 0; animation: gateIn .4s ease forwards;
        }
        .made-with-love {
          position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-serif); font-style: italic;
          font-size: .82rem; color: rgba(90,63,80,.5);
          white-space: nowrap; letter-spacing: .3px;
          display: flex; align-items: center; gap: 5px;
          z-index: 100;
        }
        .love-heart { animation: heartPulse 2s ease-in-out infinite; display:inline-flex; }
      `}</style>

      {/* Floating "made with love" signature */}
      <div className="made-with-love">
        Made with <span className="love-heart"><Heart size={12} fill="#e8557a" color="#e8557a"/></span> by Ashok for his Madam jiii
      </div>

      <div
        className={`glass-panel gate-card ${shake ? "gate-shake" : ""} ${success ? "gate-unlock" : ""}`}
        style={{ maxWidth: "460px", width: "100%", padding: "clamp(2.4rem,5vw,4rem)", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Lock icon */}
        <div className="lock-icon-wrap">
          {success
            ? <Unlock size={34} color="#e8557a" strokeWidth={2}/>
            : <Lock    size={34} color="#e8557a" strokeWidth={2}/>
          }
        </div>

        <h1 className="gate-title">
          {success ? "Welcome, Madam jiii 💖" : "A Gift Just For You"}
        </h1>

        <p className="gate-sub">
          {success
            ? "Opening your special world…"
            : "Enter the secret code to step inside this little world made just for you."
          }
        </p>

        {/* PIN boxes */}
        {!success && (
          <>
            <div className={`pin-row`} style={{ display: "flex", gap: "14px", marginBottom: ".4rem" }}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`pin-box ${d ? "filled" : ""}`}
                />
              ))}
            </div>

            {shake && <p className="wrong-msg">✗ That's not right — try again!</p>}

            <button className="hint-btn" onClick={() => setHint((h) => !h)}>
              {hint ? "Hide hint" : "Need a hint? 🤫"}
            </button>
            {hint && (
              <p className="hint-text">
                Think about a very special date that belongs only to us ♡
              </p>
            )}
          </>
        )}

        {success && (
          <div style={{ fontSize: "2.5rem", animation: "heartPulse 1s ease-in-out infinite" }}>
            💖✨💖
          </div>
        )}
      </div>
    </div>
  );
}

