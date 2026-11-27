import React, { useEffect, useRef, useState } from 'react';
import { BgmVolumeLevel, playCutePop } from '../utils/audio';

interface BgmCompactButtonProps {
  enabled: boolean;
  volumeLevel: BgmVolumeLevel;
  onToggleEnabled: () => void;
  onSelectVolume: (lvl: BgmVolumeLevel) => void;
  onStartBgm?: () => void;
}

/**
 * Simplified 🎵 BGM button. Clicking 🎵 toggles BGM ON (if off) and pops
 * the 1 · 2 · 3 volume selector + OFF control upward above the button.
 */
export const BgmCompactButton: React.FC<BgmCompactButtonProps> = ({
  enabled,
  volumeLevel,
  onToggleEnabled,
  onSelectVolume,
  onStartBgm,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-flex shrink-0">
      {open && (
        <div
          role="group"
          aria-label="BGM 음량 3단 조절"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-40 flex items-stretch border border-[#0F172A] bg-[#FFFFFF] shadow-md divide-x divide-[#0F172A]"
        >
          {([1, 2, 3] as BgmVolumeLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                playCutePop();
                if (!enabled) {
                  onToggleEnabled();
                  onStartBgm?.();
                }
                onSelectVolume(lvl);
                setOpen(false);
              }}
              className={`font-mono-num w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-xs font-bold leading-none transition-colors cursor-pointer ${
                enabled && volumeLevel === lvl
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-[#FFFFFF] text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              title={`BGM 음량 ${lvl}단계`}
            >
              {lvl}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              if (enabled) onToggleEnabled();
              setOpen(false);
            }}
            className="px-1.5 sm:px-2 h-6 sm:h-7 text-[11px] font-bold bg-[#FFFFFF] text-slate-600 hover:bg-slate-100 hover:text-[#0F172A] whitespace-nowrap cursor-pointer"
            title="BGM 끄기"
          >
            끄기
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          playCutePop();
          if (!enabled) {
            onToggleEnabled();
            onStartBgm?.();
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
        title={enabled ? 'BGM 음량(1·2·3) / 끄기' : 'BGM 켜기'}
        aria-label={enabled ? 'BGM 음량 및 끄기 열기' : 'BGM 켜기'}
        aria-expanded={open}
        className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-none border text-[11px] sm:text-xs font-bold transition-colors shrink-0 cursor-pointer ${
          enabled
            ? 'bg-[#DC2626] border-[#DC2626] text-white hover:bg-[#B91C1C]'
            : 'bg-[#FFFFFF] border-[#0F172A] text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC]'
        }`}
      >
        🎵
      </button>
    </div>
  );
};
