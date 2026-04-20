import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const hoverTargets = document.querySelectorAll('a, button, .cursor-hover');
    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', move);
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 opacity-90"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div
        className={`h-8 w-8 rounded-full border border-gold/80 bg-white/5 shadow-glow transition-all duration-200 ${
          isHovering ? 'scale-110 bg-gold/20' : 'scale-75'
        }`}
      />
    </div>
  );
}
