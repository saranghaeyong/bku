import { useState } from 'react';
import { motion } from 'motion/react';
import { CharacterItem } from '../data/characters';
import CharacterViewer from '../components/CharacterViewer';
import CharacterInfo from '../components/CharacterInfo';
import CharacterSheet from '../components/CharacterSheet';
import NextCharacterNav from '../components/NextCharacterNav';

interface CharacterPageProps {
  character: CharacterItem;
  onBackToCharacters: () => void;
  onSelectCharacter: (char: CharacterItem) => void;
}

export default function CharacterPage({
  character,
  onBackToCharacters,
  onSelectCharacter,
}: CharacterPageProps) {
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#FFF8FA]"
    >
      {/* 3D Character Viewer & Stage */}
      <CharacterViewer
        character={character}
        onOpenSheetModal={() => setIsSheetModalOpen(true)}
      />

      {/* Character Specifications & Attire Details */}
      <CharacterInfo character={character} />

      {/* Official Character Sheet & Turnaround Gallery */}
      <CharacterSheet
        character={character}
        externalActiveModal={isSheetModalOpen}
        onCloseExternalModal={() => setIsSheetModalOpen(false)}
      />

      {/* Next Character & Return Navigation */}
      <NextCharacterNav
        currentCharacter={character}
        onSelectCharacter={onSelectCharacter}
        onBackToCharacters={onBackToCharacters}
      />
    </motion.div>
  );
}
