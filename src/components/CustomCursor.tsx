import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'select' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Detect touch / mobile device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorType('default');
        return;
      }

      const dragZone = target.closest('[data-cursor="drag"]');
      if (dragZone) {
        setCursorType('drag');
        return;
      }

      const interactive = target.closest('button, a, [data-cursor="select"], input, select');
      if (interactive) {
        setCursorType('select');
        return;
      }

      setCursorType('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        {cursorType === 'default' && (
          <div className="h-4 w-4 rounded-full border-2 border-[#E83E7A] bg-[#E83E7A]/20 backdrop-blur-[1px] transition-transform duration-150" />
        )}

        {cursorType === 'select' && (
          <div className="flex items-center justify-center rounded-full bg-[#E83E7A] px-3 py-1 shadow-lg shadow-[#E83E7A]/25">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              SELECT
            </span>
          </div>
        )}

        {cursorType === 'drag' && (
          <div className="flex items-center justify-center gap-1.5 rounded-full bg-[#222222] px-3 py-1 shadow-lg shadow-black/20">
            <span className="text-xs text-[#E83E7A]">↻</span>
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              DRAG
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
