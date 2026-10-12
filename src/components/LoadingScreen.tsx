import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  characterName?: string;
}

export default function LoadingScreen({ characterName = 'JUSTIN' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8FA] p-6 text-center select-none">
      {/* Background Soft Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-[#F9DCE7]/40 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-sm">
        {/* Emblem */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F9DCE7] bg-white shadow-md shadow-[#E83E7A]/10">
          <Sparkles className="h-6 w-6 text-[#E83E7A] animate-spin" />
        </div>

        {/* Titles */}
        <p className="text-[11px] font-bold tracking-[0.25em] text-[#777777] uppercase">
          BETHLEHEM
        </p>
        <p className="font-display text-xl font-bold tracking-wider text-[#E83E7A] uppercase">
          KUDUMBA UNIT
        </p>

        <div className="my-6 h-[1px] w-24 mx-auto bg-[#F9DCE7]" />

        <p className="text-[11px] font-bold tracking-[0.2em] text-[#777777] uppercase">
          LOADING CHARACTER
        </p>
        <h3 className="font-display mt-1 text-3xl font-black tracking-tight text-[#222222]">
          {characterName}
        </h3>

        {/* Animated Progress Bar */}
        <div className="mt-8 h-1.5 w-48 mx-auto overflow-hidden rounded-full bg-[#F9DCE7]">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-[#E83E7A]"
          />
        </div>

        <p className="mt-4 text-[11px] text-[#777777]">
          Preparing Collectible 3D Assets...
        </p>
      </div>
    </div>
  );
}
