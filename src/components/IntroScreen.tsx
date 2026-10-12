import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const handleEnterClick = () => {
    soundFx.playWhoosh();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FFF8FA] px-6 text-center select-none"
    >
      {/* Subtle background ambient circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#F9DCE7]/60 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-[#F9DCE7]/50 via-[#E83E7A]/10 to-transparent blur-3xl"
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#222222 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main card center presentation */}
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        {/* Action figure edition stamp */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#E83E7A] uppercase">
            Official Figurine Archive
          </span>
          <span className="h-1 w-1 rounded-full bg-[#E83E7A]" />
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#777777] uppercase">
            Series 01
          </span>
        </motion.div>

        {/* 1. BETHLEHEM title appears */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-extrabold tracking-tight text-[#222222] sm:text-6xl md:text-7xl"
        >
          BETHLEHEM
        </motion.h1>

        {/* 2. KUDUMBA UNIT appears */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-2 text-2xl font-semibold tracking-wider text-[#E83E7A] sm:text-3xl md:text-4xl uppercase"
        >
          KUDUMBA UNIT
        </motion.h2>

        {/* 3. CHARACTER ARCHIVE appears */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-[#F9DCE7]" />
          <p className="text-xs font-semibold tracking-[0.3em] text-[#777777] uppercase sm:text-sm">
            CHARACTER ARCHIVE
          </p>
          <div className="h-[1px] w-8 bg-[#F9DCE7]" />
        </motion.div>

        {/* 4. ENTER button appears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            onClick={handleEnterClick}
            data-cursor="select"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#E83E7A] px-10 py-4.5 text-sm font-bold tracking-[0.2em] text-white uppercase shadow-xl shadow-[#E83E7A]/25 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d6326e] hover:shadow-2xl hover:shadow-[#E83E7A]/40 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E83E7A]"
          >
            <span>ENTER ARCHIVE</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </motion.div>

        {/* Bottom subtle footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 text-xs text-[#777777]/80"
        >
          Interactive Collectible 3D Experience · Click to Begin
        </motion.p>
      </div>
    </motion.div>
  );
}
