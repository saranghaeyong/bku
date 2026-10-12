import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Box, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#222222]/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-lg rounded-2xl border border-[#F9DCE7] bg-white p-6 shadow-2xl sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#F9DCE7] pb-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#E83E7A] uppercase">
                Official Archive
              </p>
              <h3 className="font-display text-xl font-bold text-[#222222]">
                Bethlehem Kudumba Unit
              </h3>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              data-cursor="select"
              aria-label="Close dialog"
              className="rounded-full p-1.5 text-[#777777] hover:bg-[#F9DCE7]/50 hover:text-[#222222]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-5 space-y-4 text-sm text-[#777777]">
            <p className="leading-relaxed">
              Welcome to the <strong className="text-[#222222]">Bethlehem Kudumba Unit Interactive Character Archive</strong>. This platform preserves and showcases character editions in high-fidelity collectible action-figure formats.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border border-[#F9DCE7] bg-[#FFF8FA] p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                  <Box className="h-4 w-4 text-[#E83E7A]" />
                  <span>1/12 Scale Figurine</span>
                </div>
                <p className="mt-1 text-xs text-[#777777]">
                  Engineered with authentic turnaround orthographic views and prototype detailing.
                </p>
              </div>

              <div className="rounded-xl border border-[#F9DCE7] bg-[#FFF8FA] p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                  <ShieldCheck className="h-4 w-4 text-[#E83E7A]" />
                  <span>Official Reference</span>
                </div>
                <p className="mt-1 text-xs text-[#777777]">
                  Preserves authentic attire, grooming, and traditional elements faithfully.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#F9DCE7]/30 p-4 border border-[#F9DCE7]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E83E7A]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>EXPANDABLE ROSTER</span>
              </div>
              <p className="mt-1 text-xs text-[#222222]/80">
                Justin is the inaugural release. Future characters including Ashley are cataloged for upcoming reveals.
              </p>
            </div>
          </div>

          {/* Footer action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              data-cursor="select"
              className="rounded-full bg-[#E83E7A] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#E83E7A]/20 transition hover:bg-[#d6326e]"
            >
              Close Info
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
