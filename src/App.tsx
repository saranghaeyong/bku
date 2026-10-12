/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import IntroScreen from './components/IntroScreen';
import Navigation from './components/Navigation';
import CharacterSelection from './components/CharacterSelection';
import CharacterPage from './pages/CharacterPage';
import CharacterRevealSplash from './components/CharacterRevealSplash';
import AboutModal from './components/AboutModal';
import CustomCursor from './components/CustomCursor';
import { CHARACTERS, CharacterItem, getCharacterById } from './data/characters';
import { soundFx } from './utils/audio';

type ViewMode = 'intro' | 'selection' | 'revealing' | 'character';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterItem>(CHARACTERS[0]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Flow handlers
  const handleEnterFromIntro = () => {
    setViewMode('selection');
  };

  const handleSelectCharacter = (character: CharacterItem) => {
    setSelectedCharacter(character);
    setViewMode('revealing');
  };

  const handleRevealComplete = () => {
    setViewMode('character');
  };

  const handleNavigateHome = () => {
    setViewMode('selection');
  };

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8FA] text-[#222222] font-body">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* 1. Intro Screen */}
      <AnimatePresence mode="wait">
        {viewMode === 'intro' && (
          <IntroScreen key="intro" onEnter={handleEnterFromIntro} />
        )}
      </AnimatePresence>

      {/* 2. Main Experience (Selection or Character Detail) */}
      {viewMode !== 'intro' && (
        <div className="flex min-h-screen flex-col">
          {/* Top Bar Navigation */}
          <Navigation
            currentView={viewMode === 'character' ? 'character' : 'selection'}
            onNavigateHome={handleNavigateHome}
            onOpenAbout={() => setIsAboutOpen(true)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />

          {/* Reveal Splash Cinematic */}
          <AnimatePresence>
            {viewMode === 'revealing' && (
              <CharacterRevealSplash
                character={selectedCharacter}
                onComplete={handleRevealComplete}
              />
            )}
          </AnimatePresence>

          {/* Main Views */}
          <main className="flex-1">
            {viewMode === 'selection' && (
              <CharacterSelection onSelectCharacter={handleSelectCharacter} />
            )}

            {viewMode === 'character' && (
              <CharacterPage
                character={selectedCharacter}
                onBackToCharacters={handleNavigateHome}
                onSelectCharacter={(newChar) => {
                  setSelectedCharacter(newChar);
                  setViewMode('revealing');
                }}
              />
            )}
          </main>

          {/* Clean Editorial Footer */}
          <footer className="border-t border-[#F9DCE7]/80 bg-white/70 py-8 text-center text-xs text-[#777777]">
            <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[#222222]">
                  BETHLEHEM KUDUMBA UNIT
                </span>
                <span className="text-[#F9DCE7]">·</span>
                <span>Interactive Character Archive</span>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsAboutOpen(true)}
                  data-cursor="select"
                  className="hover:text-[#E83E7A] transition-colors"
                >
                  Archive Details
                </button>
                <button
                  onClick={handleNavigateHome}
                  data-cursor="select"
                  className="hover:text-[#E83E7A] transition-colors"
                >
                  Character Index
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
