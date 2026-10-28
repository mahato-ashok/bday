import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, ChevronRight, ArrowLeft } from "lucide-react";
import { birthdayData } from "../../data/birthdayData";

const EMOJI_MAP = { heart:"❤️", star:"🌟", hearts:"💕", sparkle:"✨", rose:"🌹" };

export default function ReasonsView({ onNext, onPrev }) {
  const { title, reasons, shuffleButtonText, allRevealedButtonText, ending } = birthdayData.reasonsSection;
  const [revealedCount, setRevealedCount] = useState(1);
  const isAllRevealed = revealedCount >= reasons.length;

  const handleRevealNext = () => {
    if (!isAllRevealed) {
      setRevealedCount((prev) => prev + 1);
      confetti({ particleCount: 30, spread: 55, origin:{ y:.8 }, colors:["#e8557a","#f4839e","#d4a853"] });
    } else {
      confetti({ particleCount: 120, spread: 100, origin:{ y:.6 }, colors:["#e8557a","#d4a853","#9b7fd4","#fff"] });
      setTimeout(() => confetti({ particleCount: 80, spread: 140, origin:{ y:.4 } }), 300);
      onNext();
    }
  };

  return (
    <div style={{ minHeight:"100vh", padding:"3rem 1.5rem", maxWidth:"950px", margin:"0 auto", position:"relative", zIndex:10 }}>
      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(32px) scale(.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes shimmerText { 0%{background-position:-280% center} 100%{background-position:280% center} }
        @keyframes badgePulse {
          0%,100%{box-shadow:0 4px 14px rgba(195,60,100,.35)}
          50%    {box-shadow:0 4px 26px rgba(195,60,100,.65),0 0 0 4px rgba(232,85,122,.15)}
        }
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .reason-card {
          background: linear-gradient(160deg, rgba(255,253,250,.97) 0%, rgba(255,242,250,.92) 100%);
          border-left: 4px solid transparent;
          background-clip: padding-box;
          border-radius: 4px 26px 26px 4px;
          padding: 2rem 2rem 1.6rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 32px rgba(195,60,100,.11), inset 0 1px 0 rgba(255,255,255,.85);
          border-top: 1px solid rgba(212,168,83,.18);
          border-right: 1px solid rgba(212,168,83,.12);
          border-bottom: 1px solid rgba(212,168,83,.12);
          border-left: 4px solid var(--gold);
          overflow: hidden;
          transition: transform .35s cubic-bezier(.22,.68,0,1.2), box-shadow .35s ease;
          animation: cardIn .6s ease-out forwards;
          cursor: pointer;
          position: relative;
        }
        .reason-card:hover {
          transform:translateY(-7px) scale(1.01);
          box-shadow:0 20px 50px rgba(195,60,100,.24),0 0 0 2px rgba(232,85,122,.12);
          border-left-color:var(--rose);
        }
        .reason-gif-overlay {
          position: absolute; inset:0;
          background: rgba(255,249,250,.97);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          opacity:0; transition:opacity .35s ease; border-radius:0 26px 26px 0;
          pointer-events:none;
          backdrop-filter:blur(4px);
        }
        .reason-card:hover .reason-gif-overlay { opacity:1; pointer-events:auto; }
        .counter-badge {
          background: linear-gradient(135deg,#a8003f,#e8557a,#ff80ab);
          background-size:200% 200%;
          color: white; font-family: var(--font-heading);
          font-size:.85rem; font-weight:700; letter-spacing:.8px;
          padding:6px 16px; border-radius:20px;
          animation: badgePulse 2.5s ease-in-out infinite, gradientShift 3s ease infinite;
        }
        .tag-pill {
          display:inline-block;
          font-size:.72rem; text-transform:uppercase; letter-spacing:1.8px;
          font-weight:700; font-family:var(--font-heading);
          color:var(--rose-deep); background:linear-gradient(135deg,rgba(232,85,122,.1),rgba(212,168,83,.08));
          border:1px solid rgba(232,85,122,.22);
          padding:4px 12px; border-radius:8px; margin-bottom:10px;
        }
        .section-heading {
          font-family:var(--font-display);
          font-style:italic; font-weight:700;
          font-size:clamp(2rem,5vw,3.5rem);
          background:linear-gradient(135deg,#7a0030 0%,#c23b64 22%,#e8557a 42%,#d4a853 58%,#ff80ab 78%,#c23b64 100%);
          background-size:380% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerText 6s linear infinite;
          text-align:center; margin-bottom:2rem;
        }
        .reason-text {
          font-family:var(--font-serif);
          font-size:clamp(1rem,2.5vw,1.22rem);
          font-style:italic; font-weight:400;
          color:var(--ink-soft); line-height:1.85;
        }
      `}</style>

      {/* Navigation */}
      <div style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.8rem" }}>
        <button onClick={onPrev} style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(255,255,255,.8)", border:"1px solid rgba(232,85,122,.2)", borderRadius:"20px", padding:"8px 16px", color:"var(--rose-deep)", fontWeight:600, cursor:"pointer", fontFamily:"var(--font-heading)", transition:"all .2s" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <span className="counter-badge">Reason {revealedCount} of {reasons.length}</span>
      </div>

      <h1 className="section-heading">{title}</h1>

      {/* Reason Cards */}
      <div style={{ width:"100%", maxWidth:"780px", margin:"0 auto" }}>
        {reasons.slice(0, revealedCount).map((reason, index) => (
          <div key={reason.id} className="reason-card">
            <div style={{ display:"flex", alignItems:"flex-start", gap:"16px" }}>
              <span style={{ fontSize:"2.2rem", lineHeight:1, flexShrink:0 }}>
                {EMOJI_MAP[reason.emoji] || reason.emoji}
              </span>
              <div>
                <span className="tag-pill">{reason.tag}</span>
                <p className="reason-text">{reason.text}</p>
                <small style={{ color:"rgba(90,63,80,.4)", fontSize:".78rem", marginTop:"8px", display:"block", fontFamily:"var(--font-heading)" }}>
                  Hover to reveal a memory
                </small>
              </div>
            </div>
            <div className="reason-gif-overlay">
              <img src={reason.gif} alt="Memory" style={{ maxHeight:"160px", maxWidth:"90%", borderRadius:"12px", objectFit:"cover", boxShadow:"0 5px 20px rgba(0,0,0,.12)" }} />
              <span style={{ marginTop:"10px", fontSize:".9rem", fontWeight:600, color:"var(--rose)", fontFamily:"var(--font-heading)" }}>A moment with you 💕</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div style={{ marginTop:"2rem", textAlign:"center" }}>
        <button onClick={handleRevealNext} className={`bday-btn ${isAllRevealed ? "story-mode" : ""}`} style={{ fontSize:"1.15rem", padding:"1.05rem 2.8rem" }}>
          {isAllRevealed ? (
            <><Sparkles size={20} />{allRevealedButtonText}<ChevronRight size={20} /></>
          ) : (
            <><Heart size={19} fill="white" />{shuffleButtonText}</>
          )}
        </button>
      </div>

      {/* Ending section */}
      {isAllRevealed && (
        <div className="glass-panel" style={{ marginTop:"3.5rem", padding:"2.8rem", textAlign:"center", maxWidth:"520px", margin:"3.5rem auto 0", animation:"cardIn .9s ease-out" }}>
          {/* Photo with animated gradient ring */}
          <div style={{ position:"relative", width:"200px", height:"200px", margin:"0 auto 1.6rem" }}>
            <div style={{
              position:"absolute", inset:"-4px", borderRadius:"50%",
              background:"linear-gradient(135deg,#e8557a,#d4a853,#9b7fd4,#e8557a)",
              backgroundSize:"300% 300%",
              animation:"gradientShift 3s ease infinite",
              opacity:.75,
            }}/>
            <div style={{ width:"200px", height:"200px", borderRadius:"50%", overflow:"hidden", position:"relative", border:"3px solid white", boxShadow:"0 8px 28px rgba(195,60,100,.25)" }}>
              <img src={ending.image} alt="With love" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
          </div>
          <p style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"1.9rem", color:"var(--rose-deep)", marginBottom:".6rem" }}>{ending.text}</p>
          <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", color:"var(--ink-soft)", fontSize:"1.05rem", lineHeight:1.7 }}>{ending.subtext}</p>
        </div>
      )}
    </div>
  );
}
