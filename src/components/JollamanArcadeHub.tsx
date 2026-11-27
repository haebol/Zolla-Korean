import React, { lazy, Suspense, useEffect } from 'react';
import { playCutePop } from '../utils/audio';
import { AdminWorkspace } from './AdminWorkspace';
import { useAdminCatalog } from '../context/AdminCatalogContext';

const ShortsStudioToolbar = lazy(() =>
  import('./ShortsStudioToolbar').then((m) => ({ default: m.ShortsStudioToolbar }))
);
const JollamanConsonantSimulation = lazy(() =>
  import('./JollamanConsonantSimulation').then((m) => ({ default: m.JollamanConsonantSimulation }))
);
const JollamanVowelSimulation = lazy(() =>
  import('./JollamanVowelSimulation').then((m) => ({ default: m.JollamanVowelSimulation }))
);
const JollamanAdvancedSimulation = lazy(() =>
  import('./JollamanAdvancedSimulation').then((m) => ({ default: m.JollamanAdvancedSimulation }))
);
const JollamanCompoundVowelSimulation = lazy(() =>
  import('./JollamanCompoundVowelSimulation').then((m) => ({ default: m.JollamanCompoundVowelSimulation }))
);
const JollamanBatchimSimulation = lazy(() =>
  import('./JollamanBatchimSimulation').then((m) => ({ default: m.JollamanBatchimSimulation }))
);
const JollamanBatchim2Simulation = lazy(() =>
  import('./JollamanBatchim2Simulation').then((m) => ({ default: m.JollamanBatchim2Simulation }))
);
const JollamanDoubleBatchimSimulation = lazy(() =>
  import('./JollamanDoubleBatchimSimulation').then((m) => ({ default: m.JollamanDoubleBatchimSimulation }))
);
const JollamanPhonologySimulation = lazy(() =>
  import('./JollamanPhonologySimulation').then((m) => ({ default: m.JollamanPhonologySimulation }))
);
const JollamanPhonology2Simulation = lazy(() =>
  import('./JollamanPhonology2Simulation').then((m) => ({ default: m.JollamanPhonology2Simulation }))
);
const JollamanIrregularSimulation = lazy(() =>
  import('./JollamanIrregularSimulation').then((m) => ({ default: m.JollamanIrregularSimulation }))
);
const JollamanAdditionSimulation = lazy(() =>
  import('./JollamanAdditionSimulation').then((m) => ({ default: m.JollamanAdditionSimulation }))
);
const JollamanParticleV2Simulation = lazy(() =>
  import('./JollamanParticleV2Simulation').then((m) => ({ default: m.JollamanParticleV2Simulation }))
);
const JollamanParticleExtSimulation = lazy(() =>
  import('./JollamanParticleExtSimulation').then((m) => ({ default: m.JollamanParticleExtSimulation }))
);
const JollamanParticle3Simulation = lazy(() =>
  import('./JollamanParticle3Simulation').then((m) => ({ default: m.JollamanParticle3Simulation }))
);
const JollamanDailyLifeSimulation = lazy(() =>
  import('./JollamanDailyLifeSimulation').then((m) => ({ default: m.JollamanDailyLifeSimulation }))
);
const JollamanKPatternSimulation = lazy(() =>
  import('./JollamanKPatternSimulation').then((m) => ({ default: m.JollamanKPatternSimulation }))
);
const JollamanChantSimulation = lazy(() =>
  import('./JollamanChantSimulation').then((m) => ({ default: m.JollamanChantSimulation }))
);

const StageLoadingFallback: React.FC = () => (
  <div className="w-full min-h-[320px] sm:min-h-[420px] bg-[#F8FAFC] border-2 border-[#0F172A] flex items-center justify-center text-xs sm:text-sm font-bold text-[#475569]">
    무대 불러오는 중...
  </div>
);
import {
  AppMode,
  isCategoryPublic,
  isSeriesPublic,
  MainCategory,
  SeriesId,
  TeacherSubTab,
} from '../constants/seriesCatalog';

export type { MainCategory, SeriesId, AppMode, TeacherSubTab };

interface JollamanArcadeHubProps {
  appMode: AppMode;
  category: MainCategory;
  activeSeries: SeriesId;
  onSelectSeries: (id: SeriesId) => void;
  onSelectCategory: (cat: MainCategory) => void;
  teacherSubTab: TeacherSubTab;
  onSelectTeacherSubTab: (tab: TeacherSubTab) => void;
  onExitAdmin: () => void;
  onLockTeacher: () => void;
  audioEnabled: boolean;
}

const CATEGORY_TABS: { id: Exclude<MainCategory, 'all'>; label: string }[] = [
  { id: 'jamo', label: '자음모음' },
  { id: 'batchim', label: '받침' },
  { id: 'phonology', label: '음운변동' },
  { id: 'particles', label: '조사회화' },
];

const renderSimulationForSeries = (seriesId: SeriesId, audioEnabled: boolean) => {
  switch (seriesId) {
    case 'consonants':
      return <JollamanConsonantSimulation audioEnabled={audioEnabled} />;
    case 'vowels':
      return <JollamanVowelSimulation audioEnabled={audioEnabled} />;
    case 'advanced':
      return <JollamanAdvancedSimulation audioEnabled={audioEnabled} />;
    case 'compound':
      return <JollamanCompoundVowelSimulation audioEnabled={audioEnabled} />;
    case 'batchim':
      return <JollamanBatchimSimulation audioEnabled={audioEnabled} />;
    case 'batchim2':
      return <JollamanBatchim2Simulation audioEnabled={audioEnabled} />;
    case 'doubleBatchim1':
      return <JollamanDoubleBatchimSimulation key="double-front" part="front" audioEnabled={audioEnabled} />;
    case 'doubleBatchim2':
      return <JollamanDoubleBatchimSimulation key="double-back" part="back" audioEnabled={audioEnabled} />;
    case 'phonology':
      return <JollamanPhonologySimulation audioEnabled={audioEnabled} />;
    case 'phonology2':
      return <JollamanPhonology2Simulation audioEnabled={audioEnabled} />;
    case 'irregular':
      return <JollamanIrregularSimulation audioEnabled={audioEnabled} />;
    case 'addition':
      return <JollamanAdditionSimulation audioEnabled={audioEnabled} />;
    case 'particleV2':
      return <JollamanParticleV2Simulation audioEnabled={audioEnabled} />;
    case 'particleExt':
      return <JollamanParticleExtSimulation audioEnabled={audioEnabled} />;
    case 'particle3':
      return <JollamanParticle3Simulation audioEnabled={audioEnabled} />;
    case 'dailyLife':
      return <JollamanDailyLifeSimulation audioEnabled={audioEnabled} />;
    case 'kPattern':
      return <JollamanKPatternSimulation audioEnabled={audioEnabled} />;
  }
};

export const JollamanArcadeHub: React.FC<JollamanArcadeHubProps> = ({
  appMode,
  category,
  activeSeries,
  onSelectSeries,
  onSelectCategory,
  teacherSubTab,
  onSelectTeacherSubTab,
  onExitAdmin,
  onLockTeacher,
  audioEnabled,
}) => {
  const { orderedSeries, setCurrentViewSeriesId } = useAdminCatalog();

  useEffect(() => {
    setCurrentViewSeriesId(activeSeries);
  }, [activeSeries, setCurrentViewSeriesId]);

  const visibleSeries = (
    category === 'all'
      ? orderedSeries
      : orderedSeries.filter((s) => s.category === category)
  ).filter((s) => isSeriesPublic(s.id));

  // Full-Screen 3-Column Admin Workspace (and integrated Shorts/Chant Studio)
  if (appMode === 'teacher') {
    return (
      <AdminWorkspace
        activeSeries={activeSeries}
        onSelectSeries={onSelectSeries}
        onSelectCategory={onSelectCategory}
        teacherSubTab={teacherSubTab}
        onSelectTeacherSubTab={onSelectTeacherSubTab}
        onExitToLearner={onExitAdmin}
        onLockTeacher={onLockTeacher}
        audioEnabled={audioEnabled}
        renderSimulationForSeries={renderSimulationForSeries}
        renderChantViewer={(seriesId, audioOn) => (
          <JollamanChantSimulation
            mode="viewer"
            selectedSeriesId={seriesId}
            audioEnabled={audioOn}
          />
        )}
        renderShortsStudioToolbar={() => <ShortsStudioToolbar />}
        renderChantStudio={(audioOn) => (
          <JollamanChantSimulation mode="studio" audioEnabled={audioOn} />
        )}
      />
    );
  }

  const displaySeriesId: SeriesId = isSeriesPublic(activeSeries)
    ? activeSeries
    : visibleSeries[0]?.id ?? 'consonants';

  // Public Twin-App View: Combined 1단(대분류) + 2단(단원 버튼) matching 해볼수학 proportions
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col font-body">
      <div className="pb-4 border-b border-slate-200 space-y-3">
        {/* 1단 대분류 줄: 전체 / 자음모음 받침 음운변동 조사회화 */}
        <nav
          className="flex flex-nowrap items-center gap-x-2 sm:gap-x-4 text-[13px] sm:text-sm font-bold tracking-tight overflow-x-auto"
          aria-label="단원 대분류"
        >
          <button
            onClick={() => onSelectCategory('all')}
            className={`pb-0.5 border-b-2 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              category === 'all'
                ? 'border-[#DC2626] text-[#DC2626]'
                : 'border-transparent text-[#0F172A] hover:text-[#DC2626]'
            }`}
          >
            전체
          </button>

          <span className="text-[#CBD5E1] select-none shrink-0" aria-hidden="true">
            /
          </span>

          {CATEGORY_TABS.map((tab) => {
            const open = isCategoryPublic(tab.id);
            const active = open && category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                disabled={!open}
                aria-disabled={!open}
                onClick={() => {
                  if (!open) return;
                  onSelectCategory(tab.id);
                }}
                className={`pb-0.5 border-b-2 whitespace-nowrap shrink-0 transition-colors ${
                  !open
                    ? 'border-transparent text-slate-300 cursor-not-allowed'
                    : active
                    ? 'border-[#DC2626] text-[#DC2626] cursor-pointer'
                    : 'border-transparent text-[#0F172A] hover:text-[#DC2626] cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* 2단 단원 버튼 줄: px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold border-2 border-slate-900 */}
        <div
          className="flex flex-wrap items-center gap-1.5 sm:gap-2"
          role="tablist"
          aria-label="단원 시리즈 선택"
        >
          {visibleSeries.map((series) => {
            const active = displaySeriesId === series.id;
            return (
              <button
                key={series.id}
                role="tab"
                aria-selected={active}
                title={series.label}
                onClick={() => {
                  playCutePop();
                  onSelectSeries(series.id);
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-none border-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#DC2626] text-[#FFFFFF] border-slate-900'
                    : 'bg-[#FFFFFF] text-[#1E293B] border-slate-900 hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="sm:hidden">{series.mobileLabel}</span>
                <span className="hidden sm:inline">{series.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3단 단원 제목/컨트롤 + 무대 */}
      <Suspense fallback={<StageLoadingFallback />}>
        {renderSimulationForSeries(displaySeriesId, audioEnabled)}
      </Suspense>
    </div>
  );
};
