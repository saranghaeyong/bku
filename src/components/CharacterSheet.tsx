import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterItem } from '../data/characters';
import { Maximize2, X, ZoomIn, ZoomOut, Download, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface CharacterSheetProps {
  character: CharacterItem;
  externalActiveModal?: boolean;
  onCloseExternalModal?: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  aspect: string;
}

export default function CharacterSheet({
  character,
  externalActiveModal,
  onCloseExternalModal,
}: CharacterSheetProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Gallery items derived from character data
  const galleryItems: GalleryItem[] = [];

  if (character.sheetImage) {
    galleryItems.push({
      id: 'sheet',
      title: 'MASTER PROTOTYPE SHEET',
      subtitle: 'Complete Front, Side & Back Orthographic Reference',
      src: character.sheetImage,
      aspect: 'aspect-video',
    });
  }

  if (character.views) {
    galleryItems.push({
      id: 'front',
      title: 'FRONT TURNAROUND VIEW',
      subtitle: 'Orthographic Full-Body Model View',
      src: character.views.front,
      aspect: 'aspect-[3/4]',
    });

    galleryItems.push({
      id: 'side',
      title: 'PROFILE SIDE TURNAROUND',
      subtitle: '90° Orthographic Profile View',
      src: character.views.side,
      aspect: 'aspect-[3/4]',
    });

    galleryItems.push({
      id: 'back',
      title: 'BACK TURNAROUND VIEW',
      subtitle: '180° Rear Turnaround View',
      src: character.views.back,
      aspect: 'aspect-[3/4]',
    });
  }

  if (character.cardArt) {
    galleryItems.push({
      id: 'card',
      title: 'COLLECTIBLE PACKAGING ART',
      subtitle: 'Series Showcase Box Illustration',
      src: character.cardArt,
      aspect: 'aspect-[3/4]',
    });
  }

  const handleOpenLightbox = (item: GalleryItem) => {
    soundFx.playClick();
    setSelectedImage(item);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    soundFx.playClick();
    setSelectedImage(null);
    setZoomLevel(1);
    if (onCloseExternalModal) {
      onCloseExternalModal();
    }
  };

  // If externally triggered to open the master sheet
  const activeModalItem =
    selectedImage || (externalActiveModal && galleryItems.length > 0 ? galleryItems[0] : null);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-[#F9DCE7] pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#E83E7A] uppercase">
            COLLECTIBLE ARCHIVE ASSETS
          </span>
          <h2 className="font-display mt-1 text-3xl font-black tracking-tight text-[#222222] sm:text-4xl">
            CHARACTER SHEET
          </h2>
        </div>

        <p className="mt-2 sm:mt-0 text-xs font-semibold text-[#777777]">
          {galleryItems.length} Orthographic & Packaging Views Available
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => {
          const isWide = item.id === 'sheet';
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#F9DCE7] bg-white shadow-md shadow-[#E83E7A]/5 transition-all duration-300 hover:border-[#E83E7A] hover:shadow-xl hover:shadow-[#E83E7A]/15 ${
                isWide ? 'sm:col-span-2 lg:col-span-3' : ''
              }`}
            >
              {/* Image Container */}
              <div
                onClick={() => handleOpenLightbox(item)}
                data-cursor="select"
                className={`relative w-full cursor-pointer overflow-hidden bg-[#FFF8FA] ${
                  isWide ? 'aspect-[16/9] max-h-[500px]' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={item.src}
                  alt={`${character.name} - ${item.title}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-102"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#222222]/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wider text-[#222222] shadow-lg uppercase">
                    <Maximize2 className="h-3.5 w-3.5 text-[#E83E7A]" />
                    <span>INSPECT FULL VIEW</span>
                  </div>
                </div>

                {/* View Badge */}
                <div className="absolute top-3 left-3">
                  <span className="rounded-md border border-[#F9DCE7] bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#222222] uppercase shadow-xs">
                    {item.id.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between border-t border-[#F9DCE7]/60 p-4 bg-white">
                <div>
                  <h4 className="font-display text-sm font-bold text-[#222222] group-hover:text-[#E83E7A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#777777]">{item.subtitle}</p>
                </div>

                <button
                  onClick={() => handleOpenLightbox(item)}
                  data-cursor="select"
                  aria-label={`Open ${item.title}`}
                  className="rounded-full border border-[#F9DCE7] p-2 text-[#777777] transition hover:border-[#E83E7A] hover:text-[#E83E7A]"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="fixed inset-0 bg-[#222222]/80 backdrop-blur-md"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col rounded-3xl border border-white/20 bg-[#FFF8FA] overflow-hidden shadow-2xl"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#F9DCE7] bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E83E7A]/10 text-[#E83E7A]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#222222]">
                      {activeModalItem.title}
                    </h3>
                    <p className="text-xs text-[#777777]">
                      {character.name} · {character.unit}
                    </p>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                    data-cursor="select"
                    title="Zoom in"
                    aria-label="Zoom in"
                    className="rounded-full border border-[#F9DCE7] p-2 text-[#777777] hover:border-[#E83E7A] hover:text-[#E83E7A]"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                    data-cursor="select"
                    title="Zoom out"
                    aria-label="Zoom out"
                    className="rounded-full border border-[#F9DCE7] p-2 text-[#777777] hover:border-[#E83E7A] hover:text-[#E83E7A]"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>

                  <a
                    href={activeModalItem.src}
                    download={`${character.id}-${activeModalItem.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="select"
                    title="Open or Save Original"
                    className="rounded-full border border-[#F9DCE7] p-2 text-[#777777] hover:border-[#E83E7A] hover:text-[#E83E7A]"
                  >
                    <Download className="h-4 w-4" />
                  </a>

                  <button
                    onClick={handleCloseLightbox}
                    data-cursor="select"
                    aria-label="Close"
                    className="rounded-full bg-[#222222] p-2 text-white hover:bg-[#E83E7A] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Image Viewport */}
              <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8 bg-[#FFF8FA] max-h-[75vh]">
                <img
                  src={activeModalItem.src}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl transition-transform duration-200 select-none shadow-lg"
                />
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between border-t border-[#F9DCE7] bg-white px-6 py-3 text-xs text-[#777777]">
                <span>Zoom Level: {Math.round(zoomLevel * 100)}%</span>
                <span>Bethlehem Kudumba Unit Action-Figure Master Asset</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
