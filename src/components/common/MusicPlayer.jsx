import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Disc, Music2 } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying]       = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume]             = useState(0.7);
  const [showVolume, setShowVolume]     = useState(false);
  const audioRef = useRef(null);

  /* ── sync volume knob → audio element ── */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay prevented:', err));
    }
  };

  /* auto-start on first user click anywhere */
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => { setIsPlaying(true); setHasInteracted(true); })
          .catch(() => {});
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted, isPlaying]);

  const { title } = birthdayData.music;

  return (
    <div style={{ position: 'fixed', top: '18px', right: '18px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
      <style>{`
        @keyframes spin        { 100% { transform: rotate(360deg); } }
        @keyframes discGlow    { 0%,100%{ filter:drop-shadow(0 0 4px rgba(232,85,122,.5)); } 50%{ filter:drop-shadow(0 0 12px rgba(232,85,122,.95)); } }
        @keyframes ring        { 0%{ transform:scale(1); opacity:.55; } 100%{ transform:scale(1.85); opacity:0; } }
        @keyframes wave1 { 0%,100%{height:6px}  50%{height:14px} }
        @keyframes wave2 { 0%,100%{height:12px} 50%{height:5px}  }
        @keyframes wave3 { 0%,100%{height:8px}  50%{height:16px} }
        @keyframes wave4 { 0%,100%{height:14px} 50%{height:6px}  }
        @keyframes wave5 { 0%,100%{height:5px}  50%{height:12px} }
        @keyframes marquee     { 0%{ transform:translateX(0) } 100%{ transform:translateX(-50%) } }
        @keyframes songFadeIn  { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .music-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: 32px;
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(232,85,122,.28);
          color: var(--rose-deep);
          font-size: .88rem;
          font-weight: 700;
          font-family: var(--font-heading);
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(195,60,100,.22), inset 0 1px 0 rgba(255,255,255,.7);
          transition: all .3s cubic-bezier(.22,.68,0,1.2);
          outline: none;
          position: relative;
          overflow: hidden;
        }
        .music-btn::before {
          content:"";
          position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(232,85,122,.07) 0%,transparent 60%);
          border-radius:inherit;
          pointer-events:none;
        }
        .music-btn:hover {
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 10px 32px rgba(195,60,100,.38);
          border-color: rgba(232,85,122,.5);
        }
        .disc-spin { animation: spin 3s linear infinite, discGlow 2s ease-in-out infinite; }
        .pulse-ring {
          position: absolute;
          top: 50%; left: 14px;
          width: 22px; height: 22px;
          margin-top: -11px; margin-left: -2px;
          border-radius: 50%;
          border: 2px solid rgba(232,85,122,.5);
          animation: ring 1.6s ease-out infinite;
        }
        .wave-bars { display:flex; align-items:center; gap:2px; height:16px; }
        .wave-bar  { width:3px; border-radius:2px; background:linear-gradient(180deg,var(--rose),var(--rose-deep)); }

        /* song title ticker */
        .song-ticker-wrap {
          max-width: 140px;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .song-ticker {
          display: flex;
          white-space: nowrap;
          animation: marquee 9s linear infinite;
          gap: 0;
        }
        .song-ticker span { padding-right: 32px; }

        /* volume slider pill */
        .vol-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 24px;
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(232,85,122,.22);
          box-shadow: 0 4px 16px rgba(195,60,100,.15);
          animation: songFadeIn .3s ease-out;
        }
        .vol-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 90px; height: 4px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        .vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--rose-deep);
          box-shadow: 0 2px 6px rgba(195,60,100,.5);
          cursor: pointer;
          transition: transform .2s;
        }
        .vol-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }

        .now-playing-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(232,85,122,.18);
          box-shadow: 0 3px 12px rgba(195,60,100,.12);
          font-size: .72rem;
          font-weight: 600;
          font-family: var(--font-heading);
          color: var(--rose-deep);
          letter-spacing: .3px;
          animation: songFadeIn .4s ease-out;
        }
      `}</style>

      <audio ref={audioRef} src={birthdayData.music.url} loop preload="auto" />

      {/* Main player button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        className="music-btn"
        title={isPlaying ? 'Pause Music' : 'Play Birthday Music'}
      >
        {isPlaying && <div className="pulse-ring" />}

        <span style={{ display: 'inline-flex', flexShrink: 0 }}>
          <Disc size={18} style={{ color: 'var(--rose)' }} className={isPlaying ? 'disc-spin' : ''} />
        </span>

        {isPlaying ? (
          <div className="song-ticker-wrap">
            <div className="song-ticker">
              <span style={{ fontSize: '.78rem', color: 'var(--rose-deep)' }}>{title}</span>
              <span style={{ fontSize: '.78rem', color: 'var(--rose-deep)' }}>{title}</span>
            </div>
          </div>
        ) : (
          <span style={{ fontSize: '.82rem', letterSpacing: '.3px' }}>Play Music</span>
        )}

        {isPlaying
          ? <Volume2 size={15} style={{ color: 'var(--rose)', flexShrink: 0 }} />
          : <VolumeX size={15} style={{ color: 'rgba(90,63,80,.5)', flexShrink: 0 }} />
        }
      </button>

      {/* Volume slider — appears on hover */}
      {showVolume && (
        <div
          className="vol-pill"
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <VolumeX size={13} style={{ color: 'var(--rose-deep)', opacity: .6 }} />
          <input
            type="range"
            min="0" max="1" step="0.02"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="vol-slider"
            style={{
              background: `linear-gradient(to right, var(--rose) 0%, var(--rose) ${Math.round(volume * 100)}%, rgba(195,60,100,.18) ${Math.round(volume * 100)}%, rgba(195,60,100,.18) 100%)`
            }}
            title="Volume"
          />
          <Volume2 size={13} style={{ color: 'var(--rose-deep)' }} />
        </div>
      )}

      {/* "Now playing" tag shown when music is playing */}
      {isPlaying && (
        <div className="now-playing-tag">
          <Music2 size={11} style={{ color: 'var(--rose)' }} />
          <div className="wave-bars">
            {[1,2,3,4,5].map(n => (
              <div
                key={n}
                className="wave-bar"
                style={{ animation: `wave${n} ${0.5 + n * 0.12}s ease-in-out infinite`, animationDelay: `${n * 0.08}s` }}
              />
            ))}
          </div>
          Now Playing
        </div>
      )}
    </div>
  );
}
