import React, { useState, useEffect } from "react";
import CustomCursor from "./components/common/CustomCursor";
import FloatingHearts from "./components/common/FloatingHearts";
import SparkleEffect from "./components/common/SparkleEffect";
import MusicPlayer from "./components/common/MusicPlayer";
import LoveLetterView from "./components/views/LoveLetterView";
import IntroView from "./components/views/IntroView";
import ReasonsView from "./components/views/ReasonsView";
import MemoriesView from "./components/views/MemoriesView";

// Stages: loveLetter -> intro -> reasons -> memories
export default function App() {
  const [currentStage, setCurrentStage] = useState("loveLetter");
  const [fading, setFading] = useState(false);
  const [nextStage, setNextStage] = useState(null);

  const go = (stage) => {
    setFading(true);
    setNextStage(stage);
  };

  useEffect(() => {
    if (fading && nextStage) {
      const t = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setCurrentStage(nextStage);
        setNextStage(null);
        setFading(false);
      }, 420);
      return () => clearTimeout(t);
    }
  }, [fading, nextStage]);

  return (
    <div style={{ position:"relative", minHeight:"100vh", width:"100%" }}>
      <style>{`
        @keyframes stageFadeIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stageFadeOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-14px)} }
        .stage-in  { animation: stageFadeIn  .45s cubic-bezier(.22,.68,0,1.2) forwards; }
        .stage-out { animation: stageFadeOut .38s ease-in forwards; pointer-events:none; }
      `}</style>
      <CustomCursor />
      <FloatingHearts />
      <SparkleEffect count={45} />
      <MusicPlayer />

      <main
        className={fading ? "stage-out" : "stage-in"}
        style={{ minHeight:"100vh", width:"100%", position:"relative", zIndex:5 }}
      >
        {currentStage === "loveLetter" && <LoveLetterView onNext={() => go("intro")} />}
        {currentStage === "intro"      && <IntroView onNext={() => go("reasons")} />}
        {currentStage === "reasons"    && <ReasonsView onNext={() => go("memories")} onPrev={() => go("intro")} />}
        {currentStage === "memories"   && <MemoriesView onPrev={() => go("reasons")} onRestart={() => go("loveLetter")} />}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1.2rem 1rem",
          fontSize: "0.95rem",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          color: "var(--ink-soft)",
          opacity: 0.85,
          position: "relative",
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        Made with <span style={{ color: "var(--rose)", display: "inline-block" }}>❤️</span> by Ashok for his Madam jiii
      </footer>
    </div>
  );
}
