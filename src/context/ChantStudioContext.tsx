import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  buildPresetText,
  ChantHangulGroup,
  ChantItem,
  ChantPresetId,
  parseChantLines,
} from '../utils/chantPresets';
import { BeatPresetId, MelodyOverlayId } from '../utils/chantAudioEngine';

export interface ChantStudioContextValue {
  presetId: ChantPresetId;
  setPresetId: React.Dispatch<React.SetStateAction<ChantPresetId>>;
  rawText: string;
  setRawText: React.Dispatch<React.SetStateAction<string>>;
  items: ChantItem[];
  setItems: React.Dispatch<React.SetStateAction<ChantItem[]>>;
  checkedIds: string[];
  setCheckedIds: React.Dispatch<React.SetStateAction<string[]>>;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  beatPreset: BeatPresetId;
  setBeatPreset: React.Dispatch<React.SetStateAction<BeatPresetId>>;
  melodyOverlay: MelodyOverlayId;
  setMelodyOverlay: React.Dispatch<React.SetStateAction<MelodyOverlayId>>;
  rhythmVolume: number;
  setRhythmVolume: React.Dispatch<React.SetStateAction<number>>;
  rhythmMuted: boolean;
  setRhythmMuted: React.Dispatch<React.SetStateAction<boolean>>;
  repeats: 1 | 2;
  setRepeats: React.Dispatch<React.SetStateAction<1 | 2>>;
  activeEditKey: string;
  setActiveEditKey: React.Dispatch<React.SetStateAction<string>>;
  customVoices: Record<string, AudioBuffer>;
  setCustomVoices: React.Dispatch<React.SetStateAction<Record<string, AudioBuffer>>>;
  loadChantSeries: (preset: ChantPresetId, group?: ChantHangulGroup | 'all') => ChantItem[];
}

const ChantStudioContext = createContext<ChantStudioContextValue | null>(null);

const INITIAL_PRESET: ChantPresetId = 'hangul40_combo';
const INITIAL_TEXT = buildPresetText(INITIAL_PRESET);
const INITIAL_ITEMS = parseChantLines(INITIAL_TEXT, INITIAL_PRESET);
const INITIAL_CONSONANT_IDS = INITIAL_ITEMS.filter((i) => i.group === 'consonant').map((i) => i.id);

export const ChantStudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presetId, setPresetId] = useState<ChantPresetId>(INITIAL_PRESET);
  const [rawText, setRawText] = useState<string>(INITIAL_TEXT);
  const [items, setItems] = useState<ChantItem[]>(INITIAL_ITEMS);
  const [checkedIds, setCheckedIds] = useState<string[]>(
    INITIAL_CONSONANT_IDS.length > 0 ? INITIAL_CONSONANT_IDS : INITIAL_ITEMS.map((i) => i.id)
  );
  const [bpm, setBpm] = useState<number>(100);
  const [beatPreset, setBeatPreset] = useState<BeatPresetId>('boombap');
  const [melodyOverlay, setMelodyOverlay] = useState<MelodyOverlayId>('none');
  const [rhythmVolume, setRhythmVolume] = useState<number>(0.75);
  const [rhythmMuted, setRhythmMuted] = useState<boolean>(false);
  const [repeats, setRepeats] = useState<1 | 2>(2);
  const [activeEditKey, setActiveEditKey] = useState<string>(
    INITIAL_CONSONANT_IDS[0] ?? INITIAL_ITEMS[0]?.id ?? 'ㄱ'
  );
  const [customVoices, setCustomVoices] = useState<Record<string, AudioBuffer>>({});

  const loadChantSeries = useCallback(
    (nextPreset: ChantPresetId, group: ChantHangulGroup | 'all' = 'all') => {
      const text = buildPresetText(nextPreset);
      const parsed = parseChantLines(text, nextPreset);
      const filteredIds =
        group === 'all'
          ? parsed.map((i) => i.id)
          : parsed.filter((i) => i.group === group).map((i) => i.id);
      const finalIds = filteredIds.length > 0 ? filteredIds : parsed.map((i) => i.id);

      setPresetId(nextPreset);
      setRawText(text);
      setItems(parsed);
      setCheckedIds(finalIds);
      if (finalIds[0]) setActiveEditKey(finalIds[0]);
      return parsed;
    },
    []
  );

  return (
    <ChantStudioContext.Provider
      value={{
        presetId,
        setPresetId,
        rawText,
        setRawText,
        items,
        setItems,
        checkedIds,
        setCheckedIds,
        bpm,
        setBpm,
        beatPreset,
        setBeatPreset,
        melodyOverlay,
        setMelodyOverlay,
        rhythmVolume,
        setRhythmVolume,
        rhythmMuted,
        setRhythmMuted,
        repeats,
        setRepeats,
        activeEditKey,
        setActiveEditKey,
        customVoices,
        setCustomVoices,
        loadChantSeries,
      }}
    >
      {children}
    </ChantStudioContext.Provider>
  );
};

export function useChantStudio(): ChantStudioContextValue {
  const ctx = useContext(ChantStudioContext);
  if (!ctx) {
    throw new Error('useChantStudio must be used within ChantStudioProvider');
  }
  return ctx;
}
