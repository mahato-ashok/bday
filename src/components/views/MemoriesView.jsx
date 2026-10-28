import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, ArrowLeft, RotateCcw, X, ZoomIn } from "lucide-react";
import { birthdayData } from "../../data/birthdayData";

export default function MemoriesView({ onPrev, onRestart }) {
  const { heading, subheading, memories, finalMessage } = birthdayData.memoriesSection;
  const [selectedImage, setSelectedImage] = useState(null);

  const triggerCelebration = () => {
    const fire = (ratio, opts) => confetti({ particleCount: Math.floor(200 * ratio), origin:{ y:.7 }, ...opts });
    fire(.25, { spread:26, startVelocity:55, colors:["#e8557a","#c23b64","#f4839e"] });
    fire(.2,  { spread:60, colors:["#9b7fd4","#d4a853","#fff"] });
    fire(.35, { spread:100, decay:.91, scalar:.8 });
    fire(.1,  { spread:120, startVelocity:25, decay:.92, colors:["#d4a853","#e8557a"] });
    fire(.1,  { spread:120, startVelocity:45 });
  };

  return (
    <div style={{ minHeight:"100vh", padding:"3rem 1.5rem", maxWidth:"1200px", margin:"0 auto", position:"relative", zIndex:10 }}>
      <style>{`
        @keyframes shimmerText { 0%{background-position:-280% center} 100%{background-position:280% center} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .memory-card {
          background: rgba(255,252,250,.97);
          border-radius: 4px;
          padding: 1.2rem 1.2rem 2rem;
          box-shadow: 0 10px 36px rgba(195,60,100,.13), 0 2px 8px rgba(0,0,0,.06);
          transition: all .45s cubic-bezier(.22,.68,0,1.2);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(212,168,83,.18);
          border-bottom: 28px solid rgba(255,252,250,.97);
        }
        .memory-card::after {
          content:"";
          position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.2) 0%,transparent 55%);
          pointer-events:none;
        }
        .memory-card:hover {
          transform:translateY(-12px) rotate(0.8deg) scale(1.025);
          box-shadow:0 26px 60px rgba(195,60,100,.26),0 0 0 2px rgba(232,85,122,.14),0 4px 14px rgba(0,0,0,.08);
        }
        .memory-img-wrapper {
          position:relative; height:275px; border-radius:2px;
          overflow:hidden; margin-bottom:1rem; cursor:pointer;
        }
        .memory-img { width:100%; height:100%; object-fit:cover; transition:transform .55s ease; }
        .memory-card:hover .memory-img { transform:scale(1.08); }
        .memory-zoom-hint {
          position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(195,60,100,.32),rgba(155,127,212,.28));
          display:flex; align-items:center; justify-content:center;
          color:#fff; opacity:0; transition:opacity .35s ease;
          font-size:1.1rem; letter-spacing:.5px; font-family:var(--font-heading); font-weight:600;
        }
        .memory-img-wrapper:hover .memory-zoom-hint { opacity:1; }
        .memories-heading {
          font-family:var(--font-display);
          font-style:italic; font-weight:700;
          font-size:clamp(2.4rem,6vw,4.2rem);
          background:linear-gradient(135deg,#7a0030 0%,#c23b64 22%,#e8557a 42%,#d4a853 58%,#ff80ab 78%,#c23b64 100%);
          background-size:380% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerText 6s linear infinite;
        }
        .final-title {
          font-family:var(--font-script);
          font-size:clamp(2rem,5vw,3.2rem);
          color:var(--rose); animation:heartbeat 2.8s infinite ease-in-out;
        }
        .final-para {
          font-family:var(--font-serif);
          font-size:clamp(1.05rem,2.5vw,1.22rem);
          font-style:italic; line-height:1.95;
          color:var(--ink-soft);
        }
        .date-label {
          font-family:var(--font-script);
          font-size:1.55rem; color:var(--rose); margin-bottom:.3rem;
        }
        .highlight-pill {
          font-size:.72rem;
          background:linear-gradient(135deg,rgba(232,85,122,.12),rgba(212,168,83,.08));
          color:var(--rose-deep); padding:4px 12px; border-radius:10px;
          font-weight:700; letter-spacing:.8px; font-family:var(--font-heading);
          border:1px solid rgba(232,85,122,.2);
        }
        .caption-text {
          font-family:var(--font-serif); font-style:italic;
          font-size:1rem; color:#6b4d5a; line-height:1.75;
        }
        .final-panel-glow {
          box-shadow:0 20px 60px rgba(195,60,100,.16),0 0 0 1px rgba(232,85,122,.1),inset 0 1px 0 rgba(255,255,255,.8);
        }
      `}</style>

      {/* Back button */}
      <div style={{ marginBottom:"1.8rem" }}>
        <button onClick={onPrev} style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(255,255,255,.82)", border:"1px solid rgba(232,85,122,.2)", borderRadius:"20px", padding:"8px 18px", color:"var(--rose-deep)", fontWeight:600, cursor:"pointer", fontFamily:"var(--font-heading)", transition:"all .2s" }}>
          <ArrowLeft size={16} /> Back to Reasons
        </button>
      </div>

      {/* Heading */}
      <section style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <h1 className="memories-heading" style={{ marginBottom:"1.2rem" }}>{heading}</h1>
        <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:"clamp(1rem,2.5vw,1.25rem)", maxWidth:"680px", margin:"0 auto", color:"var(--ink-soft)", lineHeight:1.75 }}>{subheading}</p>
        <div style={{ textAlign:"center", color:"rgba(212,168,83,.6)", fontSize:"1.1rem", letterSpacing:"14px", marginTop:"1.5rem" }}>&#9825; &#9825; &#9825;</div>
      </section>

      {/* Polaroid Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2.5rem", marginBottom:"4.5rem" }}>
        {memories.map((m) => (
          <div key={m.id} className="memory-card">
            <div className="memory-img-wrapper" onClick={() => m.image ? setSelectedImage(m) : null}
              style={{ cursor: m.image ? 'pointer' : 'default' }}>
              {m.image ? (
                <>
                  <img src={m.image} alt={m.date} className="memory-img" />
                  <div className="memory-zoom-hint"><ZoomIn size={28} /></div>
                </>
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(232,85,122,.12) 0%, rgba(212,168,83,.1) 40%, rgba(155,127,212,.14) 100%)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '12px',
                }}>
                  <span style={{ fontSize: '3.8rem', lineHeight: 1 }}>💭</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--rose-deep)', opacity: .75, textAlign: 'center', padding: '0 1.2rem' }}>
                    A memory we hold in our hearts ♡
                  </span>
                </div>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".5rem" }}>
              <h3 className="date-label">{m.date}</h3>
              <span className="highlight-pill">{m.highlight}</span>
            </div>
            <p className="caption-text">{m.caption}</p>
          </div>
        ))}
      </div>

      {/* Final Love Letter */}
      <section className="glass-panel" style={{ textAlign:"center", padding:"clamp(2.5rem,5vw,4.5rem)", maxWidth:"860px", margin:"0 auto 3rem" }}>
        {/* Envelope decoration */}
        <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>💌</div>

        <h2 className="final-title" style={{ marginBottom:"1.8rem" }}>{finalMessage.title}</h2>

        <div style={{ textAlign:"left", maxWidth:"720px", margin:"0 auto 2.5rem" }}>
          {finalMessage.paragraphs.map((p, idx) => (
            <p key={idx} className="final-para" style={{
              marginBottom:"1.4rem",
              paddingLeft: idx === 0 || idx === finalMessage.paragraphs.length - 1 ? "1.2rem" : "0",
              borderLeft: idx === 0 || idx === finalMessage.paragraphs.length - 1 ? "3px solid rgba(212,168,83,.4)" : "none",
            }}>
              {p}
            </p>
          ))}
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:"15px", justifyContent:"center" }}>
          <button onClick={triggerCelebration} className="bday-btn story-mode" style={{ padding:"1.1rem 2.8rem", fontSize:"1.15rem" }}>
            <Sparkles size={21} />{finalMessage.goodbyeButton}
          </button>
          <button onClick={onRestart} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"1.1rem 2rem", fontSize:"1rem", borderRadius:"50px", border:"1px solid rgba(232,85,122,.3)", backgroundColor:"rgba(255,255,255,.82)", color:"var(--rose-deep)", fontWeight:600, cursor:"pointer", fontFamily:"var(--font-heading)", boxShadow:"0 4px 16px rgba(195,60,100,.12)", transition:"all .3s ease" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(195,60,100,.2)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(195,60,100,.12)"; }}>
            <RotateCcw size={16} />{finalMessage.restartButton}
          </button>
        </div>

        <div style={{ marginTop: "2.4rem", paddingTop: "1.6rem", borderTop: "1px dashed rgba(212,168,83,0.35)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.15rem", color: "var(--rose-deep)" }}>
          Made with ❤️ by Ashok for his Madam jiii
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedImage.image && (
        <div style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,.78)", backdropFilter:"blur(10px)", zIndex:99999, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }} onClick={() => setSelectedImage(null)}>
          <div style={{ position:"relative", maxWidth:"760px", width:"100%", backgroundColor:"rgba(255,252,248,.97)", borderRadius:"4px 24px 24px 4px", borderLeft:"5px solid var(--gold)", overflow:"hidden", boxShadow:"0 30px 60px rgba(0,0,0,.35)" }} onClick={(e)=>e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} style={{ position:"absolute", top:"14px", right:"14px", background:"rgba(195,60,100,.85)", border:"none", color:"white", borderRadius:"50%", width:"34px", height:"34px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:2 }}>
              <X size={18} />
            </button>
            <img src={selectedImage.image} alt={selectedImage.date} style={{ width:"100%", maxHeight:"62vh", objectFit:"cover", display:"block" }} />
            <div style={{ padding:"1.5rem 1.8rem" }}>
              <h3 style={{ fontFamily:"var(--font-script)", fontSize:"2rem", color:"var(--rose)", marginBottom:".4rem" }}>{selectedImage.date}</h3>
              <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", color:"var(--ink-soft)", fontSize:"1.05rem", lineHeight:1.7 }}>{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
