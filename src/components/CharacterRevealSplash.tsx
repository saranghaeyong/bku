import { useEffect } from 'react';
import { motion } from 'motion/react';
import { CharacterItem } from '../data/characters';
import { Sparkles } from 'lucide-react';

interface CharacterRevealSplashProps {
  character: CharacterItem;
  onComplete: () => void;
}

export default function CharacterRevealSplash({ character, onComplete }: CharacterRevealSplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8FA] p-6 text-center select-none"
    >
      {/* Dynamic reveal backdrop */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.4, 2], opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[#E83E7A]/25 blur-3xl"
      />

      <div className="relative z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F9DCE7] bg-white px-4 py-1.5 shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-[#E83E7A]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#E83E7A] uppercase">
            CHARACTER REVEAL
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 text-6xl font-black tracking-tight text-[#222222] sm:text-7xl md:text-8xl"
        >
          {character.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-3 font-display text-sm font-semibold tracking-widest text-[#E83E7A] uppercase sm:text-base"
        >
          {character.unit}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="mx-auto mt-6 h-0.5 w-32 bg-[#E83E7A]"
        />
      </div>
    </motion.div>
  );
}
