import { RotateCcw, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type ViewAngle = 'front' | 'side' | 'back' | 'auto';

interface ViewerControlsProps {
  currentAngle: ViewAngle;
  isAutoRotating: boolean;
  onSetAngle: (angle: ViewAngle) => void;
  onToggleAutoRotate: () => void;
  onResetView: () => void;
}

export default function ViewerControls({
  currentAngle,
  isAutoRotating,
  onSetAngle,
  onToggleAutoRotate,
  onResetView,
}: ViewerControlsProps) {
  const handleViewClick = (angle: ViewAngle) => {
    soundFx.playClick();
    onSetAngle(angle);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {/* Front */}
      <button
        onClick={() => handleViewClick('front')}
        data-cursor="select"
        className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
          currentAngle === 'front' && !isAutoRotating
            ? 'bg-[#E83E7A] text-white shadow-md shadow-[#E83E7A]/25'
            : 'border border-[#F9DCE7] bg-white text-[#222222] hover:border-[#E83E7A] hover:text-[#E83E7A]'
        }`}
      >
        FRONT
      </button>

      {/* Side */}
      <button
        onClick={() => handleViewClick('side')}
        data-cursor="select"
        className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
          currentAngle === 'side' && !isAutoRotating
            ? 'bg-[#E83E7A] text-white shadow-md shadow-[#E83E7A]/25'
            : 'border border-[#F9DCE7] bg-white text-[#222222] hover:border-[#E83E7A] hover:text-[#E83E7A]'
        }`}
      >
        SIDE
      </button>

      {/* Back */}
      <button
        onClick={() => handleViewClick('back')}
        data-cursor="select"
        className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
          currentAngle === 'back' && !isAutoRotating
            ? 'bg-[#E83E7A] text-white shadow-md shadow-[#E83E7A]/25'
            : 'border border-[#F9DCE7] bg-white text-[#222222] hover:border-[#E83E7A] hover:text-[#E83E7A]'
        }`}
      >
        BACK
      </button>

      {/* 360 Auto-Rotate */}
      <button
        onClick={() => {
          soundFx.playClick();
          onToggleAutoRotate();
        }}
        data-cursor="select"
        className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
          isAutoRotating
            ? 'bg-[#222222] text-white shadow-md shadow-black/20'
            : 'border border-[#F9DCE7] bg-white text-[#222222] hover:border-[#E83E7A] hover:text-[#E83E7A]'
        }`}
      >
        <Compass className={`h-3.5 w-3.5 ${isAutoRotating ? 'text-[#E83E7A] animate-spin' : ''}`} />
        <span>360° ROTATE</span>
      </button>

      {/* Reset */}
      <button
        onClick={() => {
          soundFx.playClick();
          onResetView();
        }}
        data-cursor="select"
        title="Reset Camera View"
        aria-label="Reset Camera View"
        className="rounded-full border border-[#F9DCE7] bg-white p-2 text-[#777777] transition-all hover:border-[#E83E7A] hover:text-[#E83E7A]"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
