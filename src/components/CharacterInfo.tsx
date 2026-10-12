import { CharacterItem } from '../data/characters';
import { Tag, Shirt, Shield, Eye } from 'lucide-react';

interface CharacterInfoProps {
  character: CharacterItem;
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#F9DCE7] pb-4">
        <div className="h-6 w-1 rounded-full bg-[#E83E7A]" />
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#E83E7A] uppercase">
            ARCHIVE SPECIFICATIONS
          </span>
          <h2 className="font-display text-2xl font-black tracking-tight text-[#222222] sm:text-3xl">
            CHARACTER
          </h2>
        </div>
      </div>

      {/* Main Grid: Essential Info Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Core Identity */}
        <div className="rounded-2xl border border-[#F9DCE7] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E83E7A]">
            <Shield className="h-4 w-4" />
            <span>CORE REGISTRATION</span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#777777] uppercase">
                NAME
              </p>
              <p className="font-display text-2xl font-black text-[#222222]">
                {character.name}
              </p>
            </div>

            <div className="border-t border-[#F9DCE7]/60 pt-3">
              <p className="text-[11px] font-bold tracking-widest text-[#777777] uppercase">
                UNIT
              </p>
              <p className="font-display text-sm font-bold text-[#E83E7A]">
                {character.unit}
              </p>
            </div>

            <div className="border-t border-[#F9DCE7]/60 pt-3 flex justify-between items-center">
              <span className="text-[11px] font-bold tracking-widest text-[#777777] uppercase">
                ARCHIVE ID
              </span>
              <span className="font-mono text-xs font-semibold text-[#222222]">
                {character.archiveId}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Figurine Production Specs */}
        <div className="rounded-2xl border border-[#F9DCE7] bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E83E7A]">
            <Eye className="h-4 w-4" />
            <span>ACTION FIGURE MODEL SPECIFICATIONS</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {character.specs.map((spec, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#F9DCE7]/60 bg-[#FFF8FA] p-3.5"
              >
                <p className="text-[10px] font-bold tracking-wider text-[#777777] uppercase">
                  {spec.label}
                </p>
                <p className="mt-1 text-xs font-bold text-[#222222] leading-snug">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attire & Prototype Visual Breakout */}
      {character.attireDetails && (
        <div className="mt-6 rounded-2xl border border-[#F9DCE7] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E83E7A]">
            <Shirt className="h-4 w-4" />
            <span>ATTIRE & PROTOTYPE DETAILS</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-[#FFF8FA] p-4 border border-[#F9DCE7]/80">
              <span className="text-[10px] font-bold tracking-wider text-[#E83E7A] uppercase">
                SHIRT
              </span>
              <p className="mt-1 text-xs font-medium text-[#222222]">
                {character.attireDetails.upper}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFF8FA] p-4 border border-[#F9DCE7]/80">
              <span className="text-[10px] font-bold tracking-wider text-[#E83E7A] uppercase">
                DHOTI (MUNDU)
              </span>
              <p className="mt-1 text-xs font-medium text-[#222222]">
                {character.attireDetails.lower}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFF8FA] p-4 border border-[#F9DCE7]/80">
              <span className="text-[10px] font-bold tracking-wider text-[#E83E7A] uppercase">
                HAIR & BEARD
              </span>
              <p className="mt-1 text-xs font-medium text-[#222222]">
                {character.attireDetails.hairBeard}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFF8FA] p-4 border border-[#F9DCE7]/80">
              <span className="text-[10px] font-bold tracking-wider text-[#E83E7A] uppercase">
                FOOTWEAR & BASE
              </span>
              <p className="mt-1 text-xs font-medium text-[#222222]">
                {character.attireDetails.footwear}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#F9DCE7]/60">
            <Tag className="h-3.5 w-3.5 text-[#777777]" />
            <span className="text-[11px] font-semibold text-[#777777]">ARCHIVE TAGS:</span>
            {character.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-[#222222] font-medium"
              >
                {tag}
                {idx < character.tags.length - 1 && <span className="mx-1 text-[#F9DCE7]">·</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
