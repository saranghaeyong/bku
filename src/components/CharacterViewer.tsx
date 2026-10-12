import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterItem } from '../data/characters';
import ThreeCharacterScene from './ThreeCharacterScene';
import ViewerControls, { ViewAngle } from './ViewerControls';
import { RotateCw, Sparkles, Maximize2 } from 'lucide-react';

interface CharacterViewerProps {
  character: CharacterItem;
  onOpenSheetModal?: () => void;
}

export default function CharacterViewer({ character, onOpenSheetModal }: CharacterViewerProps) {
  const [viewAngle, setViewAngle] = useState<ViewAngle>('front');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    // Pause auto-rotation while dragging
    setIsAutoRotating(false);

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    // Slowly resume auto rotation after interaction settles
    resumeTimerRef.current = window.setTimeout(() => {
      setIsAutoRotating(true);
    }, 3200);
  };

  const handleSetAngle = (angle: ViewAngle) => {
    setViewAngle(angle);
    setIsAutoRotating(false);
    setHasInteracted(true);
  };

  const handleToggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
    setHasInteracted(true);
  };

  const handleResetView = () => {
    setViewAngle('front');
    setIsAutoRotating(true);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center overflow-hidden px-4 pt-4 pb-12 sm:px-6 lg:px-8">
      {/* 11. Large Background Typography behind the character */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-0 flex select-none justify-center overflow-hidden text-center">
        <span className="font-display text-[18vw] font-black tracking-[0.18em] text-[#E83E7A]/[0.06] uppercase leading-none blur-[0.5px]">
          {character.name}
        </span>
      </div>

      {/* Header Titles (Main & Small Headings) */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F9DCE7] bg-white/80 px-4 py-1 backdrop-blur-xs shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#E83E7A]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#E83E7A] uppercase">
            {character.unit}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-3 text-5xl font-black tracking-tight text-[#222222] sm:text-6xl md:text-7xl uppercase"
        >
          {character.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#777777]"
        >
          <span>{character.scale}</span>
          <span className="text-[#F9DCE7]">·</span>
          <span className="text-[#E83E7A] font-bold">{character.statusLabel}</span>
          <span className="text-[#F9DCE7]">·</span>
          <span>{character.archiveId}</span>
        </motion.div>
      </div>

      {/* 3D Interactive Canvas Container */}
      <div
        data-cursor="drag"
        className="relative z-10 mt-6 h-[460px] w-full max-w-4xl rounded-3xl border border-[#F9DCE7]/80 bg-gradient-to-b from-white/90 via-[#FFF8FA]/70 to-white/90 shadow-2xl shadow-[#E83E7A]/5 backdrop-blur-sm sm:h-[540px] md:h-[600px]"
      >
        {/* Subtle decorative corner brackets */}
        <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-[#E83E7A]/30 rounded-tl-sm" />
        <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-[#E83E7A]/30 rounded-tr-sm" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#E83E7A]/30 rounded-bl-sm" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#E83E7A]/30 rounded-br-sm" />

        {/* Action Figure Presentation Badge */}
        <div className="pointer-events-none absolute top-5 left-6 z-20 flex items-center gap-2">
          <span className="rounded-md border border-[#F9DCE7] bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#222222] uppercase shadow-xs">
            1/12 PROTOTYPE
          </span>
          {isAutoRotating && (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#E83E7A]/10 px-2 py-0.5 text-[10px] font-semibold text-[#E83E7A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E83E7A] animate-pulse" />
              TURNTABLE ACTIVE
            </span>
          )}
        </div>

        {/* Expand / Sheet quick action */}
        {onOpenSheetModal && (
          <button
            onClick={onOpenSheetModal}
            data-cursor="select"
            title="Inspect Character Sheet"
            className="absolute top-5 right-6 z-20 flex items-center gap-1.5 rounded-full border border-[#F9DCE7] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#222222] shadow-xs transition hover:border-[#E83E7A] hover:text-[#E83E7A]"
          >
            <Maximize2 className="h-3.5 w-3.5 text-[#E83E7A]" />
            <span className="hidden sm:inline">SHEET VIEW</span>
          </button>
        )}

        {/* 10. DRAG INDICATOR (Fades after interaction) */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute bottom-6 inset-x-0 z-20 flex justify-center"
            >
              <div className="flex items-center gap-2 rounded-full border border-[#E83E7A]/25 bg-white/95 px-5 py-2 text-xs font-bold tracking-wider text-[#222222] shadow-lg shadow-[#E83E7A]/15 backdrop-blur-md">
                <RotateCw className="h-3.5 w-3.5 text-[#E83E7A] animate-spin" />
                <span>{isMobile ? 'SWIPE TO ROTATE' : 'DRAG TO ROTATE'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Three.js R3F Canvas */}
        <ThreeCharacterScene
          character={character}
          viewAngle={viewAngle}
          isAutoRotating={isAutoRotating}
          onUserInteraction={handleUserInteraction}
        />
      </div>

      {/* 9. VIEW BUTTONS Below 3D Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 mt-6"
      >
        <ViewerControls
          currentAngle={viewAngle}
          isAutoRotating={isAutoRotating}
          onSetAngle={handleSetAngle}
          onToggleAutoRotate={handleToggleAutoRotate}
          onResetView={handleResetView}
        />
      </motion.div>

      {/* Helpful Hint */}
      <p className="mt-3 text-xs text-[#777777]">
        Click view angles or drag freely to inspect 360° turnaround.
      </p>
    </div>
  );
}
