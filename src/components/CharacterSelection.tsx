import { motion } from 'motion/react';
import { CHARACTERS, CharacterItem } from '../data/characters';
import CharacterCard from './CharacterCard';
import { Sparkles } from 'lucide-react';

interface CharacterSelectionProps {
  onSelectCharacter: (character: CharacterItem) => void;
}

export default function CharacterSelection({ onSelectCharacter }: CharacterSelectionProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F9DCE7] bg-white px-4 py-1 shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#E83E7A]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#E83E7A] uppercase">
            BETHLEHEM KUDUMBA UNIT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-4 text-4xl font-black tracking-tight text-[#222222] sm:text-5xl"
        >
          CHARACTERS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm font-medium text-[#777777] sm:text-base"
        >
          Explore interactive action-figure character reveals, 3D turnaround viewers, and official prototype model sheets.
        </motion.p>
      </div>

      {/* Characters Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        {CHARACTERS.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <CharacterCard character={char} onSelect={onSelectCharacter} />
          </motion.div>
        ))}
      </div>

      {/* Architecture note / subtle guarantee footer */}
      <div className="mt-16 text-center text-xs text-[#777777]">
        <span>Total Cataloged: {CHARACTERS.length} Figures</span>
        <span className="mx-2 text-[#F9DCE7]">·</span>
        <span>Series Architecture Ready for Future Releases</span>
      </div>
    </div>
  );
}
