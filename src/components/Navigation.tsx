import { useState } from 'react';
import { Volume2, VolumeX, Info, ArrowLeft, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavigationProps {
  currentView: 'selection' | 'character';
  onNavigateHome: () => void;
  onOpenAbout: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navigation({
  currentView,
  onNavigateHome,
  onOpenAbout,
  soundEnabled,
  onToggleSound,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F9DCE7]/80 bg-[#FFF8FA]/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title, single line */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'character' && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateHome();
              }}
              data-cursor="select"
              aria-label="Return to Characters"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#F9DCE7] bg-white px-3 py-1.5 text-xs font-semibold text-[#222222] shadow-xs transition hover:border-[#E83E7A] hover:text-[#E83E7A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">CHARACTERS</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onNavigateHome();
            }}
            data-cursor="select"
            className="text-left group"
          >
            <span className="font-display text-base font-extrabold tracking-tight text-[#222222] transition group-hover:text-[#E83E7A] sm:text-lg whitespace-nowrap">
              BETHLEHEM KUDUMBA UNIT
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#777777] uppercase">
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigateHome();
            }}
            data-cursor="select"
            className={`whitespace-nowrap transition hover:text-[#E83E7A] ${
              currentView === 'selection' ? 'text-[#E83E7A] underline underline-offset-8 decoration-2' : ''
            }`}
          >
            CHARACTERS
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAbout();
            }}
            data-cursor="select"
            className="whitespace-nowrap transition hover:text-[#E83E7A]"
          >
            ABOUT ARCHIVE
          </button>

          <button
            onClick={onToggleSound}
            data-cursor="select"
            aria-label="Toggle audio effects"
            className="flex items-center gap-1.5 whitespace-nowrap transition hover:text-[#E83E7A]"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-[#E83E7A]" />
                <span className="text-[#E83E7A]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span>AUDIO OFF</span>
              </>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary action / archive badge */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenAbout();
            }}
            data-cursor="select"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#E83E7A]/20 bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[#E83E7A] shadow-xs transition hover:bg-[#F9DCE7]/40 hover:border-[#E83E7A] whitespace-nowrap"
          >
            <Info className="h-3.5 w-3.5" />
            <span>ARCHIVE INFO</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-cursor="select"
            className="inline-flex md:hidden rounded-lg p-2 text-[#222222] hover:bg-[#F9DCE7]/50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#F9DCE7] bg-[#FFF8FA] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#222222]">
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg p-2 text-left hover:bg-[#F9DCE7]/40"
            >
              <span>CHARACTERS</span>
              <span className="text-xs text-[#E83E7A]">VIEW ALL</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg p-2 text-left hover:bg-[#F9DCE7]/40"
            >
              <span>ABOUT ARCHIVE</span>
              <Info className="h-4 w-4 text-[#777777]" />
            </button>

            <button
              onClick={() => {
                onToggleSound();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg p-2 text-left hover:bg-[#F9DCE7]/40"
            >
              <span>SOUND EFFECTS</span>
              <span className="text-xs font-bold text-[#E83E7A]">
                {soundEnabled ? 'ENABLED' : 'MUTED'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
