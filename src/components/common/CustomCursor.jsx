import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse/trackpad, not touch)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target;
      const clickable = target.closest('button, a, input, .reason-card, .memory-card');
      setIsPointer(!!clickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Heart / Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isPointer ? 1.3 : 1})`,
          transition: 'transform 0.15s ease-out',
          mixBlendMode: 'difference',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 105, 180, 0.7))',
          }}
        >
          <path
            fill="#ff69b4"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>

      {/* Trailing Soft Glow Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#ff1493',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          boxShadow: '0 0 10px #ff1493',
          transition: 'transform 0.05s linear',
        }}
      />
    </>
  );
}
