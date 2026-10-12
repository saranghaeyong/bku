import { motion } from 'motion/react';
import { ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import { CharacterItem } from '../data/characters';
import { soundFx } from '../utils/audio';

interface CharacterCardProps {
  character: CharacterItem;
  onSelect: (character: CharacterItem) => void;
}

export default function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const isAvailable = character.available;

  const handleClick = () => {
    if (!isAvailable) {
      soundFx.playClick();
      return;
    }
    soundFx.playWhoosh();
    onSelect(character);
  };

  return (
    <motion.div
      whileHover={
        isAvailable
          ? {
              y: -8,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }
          : {}
      }
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isAvailable
          ? 'border-[#F9DCE7] bg-white shadow-lg shadow-[#E83E7A]/5 hover:border-[#E83E7A] hover:shadow-2xl hover:shadow-[#E83E7A]/20'
          : 'border-dashed border-[#F9DCE7] bg-[#FFF8FA]/60 opacity-85'
      }`}
    >
      {/* Card Header Tag */}
      <div className="flex items-center justify-between border-b border-[#F9DCE7]/60 px-5 py-3.5 bg-gradient-to-r from-white to-[#FFF8FA]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold tracking-wider text-[#777777]">
            {character.archiveId}
          </span>
          <span className="text-[#F9DCE7]">/</span>
          <span className="text-[11px] font-bold tracking-widest text-[#E83E7A] uppercase">
            {character.scale}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#E83E7A] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E83E7A]" />
              AVAILABLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#777777] uppercase">
              <Lock className="h-3 w-3 text-[#777777]" />
              COMING SOON
            </span>
          )}
        </div>
      </div>

      {/* Visual Media Zone */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FFF8FA]">
        {isAvailable && character.cardArt ? (
          <div className="relative h-full w-full">
            <img
              src={character.cardArt}
              alt={`${character.name} action figure collectible portrait`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Subtle gradient vignette at bottom */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-75" />

            {/* Pink highlight aura on hover */}
            <div className="pointer-events-none absolute inset-0 bg-[#E83E7A]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay" />
          </div>
        ) : (
          /* Placeholder Vault Card for Ashley / Coming Soon without fake artwork */
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#FFF8FA] via-white to-[#F9DCE7]/30">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-[#E83E7A]/30 bg-white shadow-xs">
              <Lock className="h-8 w-8 text-[#E83E7A]/60" />
              <div className="absolute -top-1.5 -right-1.5">
                <Sparkles className="h-4 w-4 text-[#E83E7A]" />
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#E83E7A] uppercase">
                Bethlehem Kudumba Unit
              </span>
              <h4 className="font-display mt-1 text-2xl font-black tracking-tight text-[#222222]">
                {character.name}
              </h4>
              <p className="mt-2 text-xs font-medium text-[#777777]">
                Prototype in production. Character model and reference sheet reveal scheduled.
              </p>
            </div>

            <div className="mt-6 rounded-full border border-[#F9DCE7] bg-white px-4 py-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#777777] uppercase">
                VAULT ENTRY RESERVED
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content Footer */}
      <div className="flex flex-1 flex-col justify-between p-6 bg-white">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#777777] uppercase">
            {character.unit}
          </span>
          <h3 className="font-display mt-0.5 text-2xl font-black tracking-tight text-[#222222] transition-colors group-hover:text-[#E83E7A]">
            {character.name}
          </h3>
          <p className="mt-1 text-xs text-[#777777]">
            {isAvailable
              ? 'Inaugural 1/12 Scale Action Figure Archive with 3D turntable viewer and official reference views.'
              : 'Upcoming character entry for Bethlehem Kudumba Unit. Details will unlock upon availability.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-[#F9DCE7]/60">
          {isAvailable ? (
            <button
              onClick={handleClick}
              data-cursor="select"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E83E7A] px-5 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#E83E7A]/20 transition-all duration-200 hover:bg-[#d6326e] hover:shadow-lg hover:shadow-[#E83E7A]/30 active:scale-[0.99]"
            >
              <span>VIEW CHARACTER</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#F9DCE7] bg-[#FFF8FA] px-5 py-3 text-xs font-bold tracking-wider text-[#777777] uppercase opacity-70"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>COMING SOON</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
