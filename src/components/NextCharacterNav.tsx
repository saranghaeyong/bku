import { motion } from 'motion/react';
import { ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import { CharacterItem, CHARACTERS } from '../data/characters';
import { soundFx } from '../utils/audio';

interface NextCharacterNavProps {
  currentCharacter: CharacterItem;
  onSelectCharacter: (char: CharacterItem) => void;
  onBackToCharacters: () => void;
}

export default function NextCharacterNav({
  currentCharacter,
  onSelectCharacter,
  onBackToCharacters,
}: NextCharacterNavProps) {
  const currentIndex = CHARACTERS.findIndex((c) => c.id === currentCharacter.id);
  const nextCharacter =
    currentIndex !== -1 && currentIndex < CHARACTERS.length - 1
      ? CHARACTERS[currentIndex + 1]
      : CHARACTERS[0];

  const handleNextClick = () => {
    soundFx.playClick();
    if (nextCharacter.available) {
      onSelectCharacter(nextCharacter);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 border-t border-[#F9DCE7]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-[#F9DCE7] bg-white p-6 sm:p-8 shadow-sm">
        {/* Return to Character Selection */}
        <div>
          <button
            onClick={() => {
              soundFx.playClick();
              onBackToCharacters();
            }}
            data-cursor="select"
            className="inline-flex items-center gap-2 rounded-full border border-[#F9DCE7] bg-[#FFF8FA] px-5 py-2.5 text-xs font-bold tracking-wider text-[#222222] uppercase transition hover:border-[#E83E7A] hover:text-[#E83E7A]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO CHARACTERS</span>
          </button>
        </div>

        {/* Next Character Teaser */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E83E7A] uppercase">
              NEXT ARCHIVE RELEASE
            </span>
            <h4 className="font-display text-xl font-bold text-[#222222]">
              {nextCharacter.name}
            </h4>
            <p className="text-xs text-[#777777]">
              {nextCharacter.available ? 'Ready to inspect' : 'Coming Soon in Bethlehem Kudumba Unit'}
            </p>
          </div>

          {nextCharacter.available ? (
            <button
              onClick={handleNextClick}
              data-cursor="select"
              className="inline-flex items-center gap-2 rounded-full bg-[#E83E7A] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#E83E7A]/20 transition hover:bg-[#d6326e]"
            >
              <span>NEXT CHARACTER</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F9DCE7] bg-[#FFF8FA] px-5 py-2.5 text-xs font-bold tracking-wider text-[#777777] uppercase">
              <Lock className="h-3.5 w-3.5 text-[#E83E7A]" />
              <span>ASHLEY (COMING SOON)</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
