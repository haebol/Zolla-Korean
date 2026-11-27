import React, { useEffect, useRef, useState } from 'react';
import { JollamanArcadeHub } from './components/JollamanArcadeHub';
import { ShortsStudioProvider, useShortsStudio } from './context/ShortsStudioContext';
import { ChantStudioProvider } from './context/ChantStudioContext';
import { AdminCatalogProvider, useAdminCatalog } from './context/AdminCatalogContext';
import { playCutePop } from './utils/audio';
import { RedShoesJollamanLogoSvg } from './components/RedShoesJollamanLogoSvg';
import {
  AppMode,
  isCategoryPublic,
  isSeriesPublic,
  MainCategory,
  SeriesId,
  TeacherSubTab,
} from './constants/seriesCatalog';

const TEACHER_LOCKED_STORAGE_KEY = 'haebol_admin_explicit_lock';
export const TEACHER_PASSWORD_STORAGE_KEY = 'haebol_teacher_password';
const DEFAULT_TEACHER_PASSWORD = '1234';

export function getTeacherPassword(): string {
  try {
    const saved = window.localStorage.getItem(TEACHER_PASSWORD_STORAGE_KEY);
    if (saved && saved.length > 0) return saved;
  } catch {
    // Ignore storage errors
  }
  return DEFAULT_TEACHER_PASSWORD;
}

const AppContent: React.FC = () => {
  const [appMode, setAppMode] = useState<AppMode>('theater');
  const [activeCategory, setActiveCategory] = useState<MainCategory>('jamo');
  const [activeSeries, setActiveSeries] = useState<SeriesId>('consonants');
  const [teacherSubTab, setTeacherSubTab] = useState<TeacherSubTab>('admin');
  const [adminLocked, setAdminLocked] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(TEACHER_LOCKED_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Inline full-screen password gate state (used only if teacher explicitly locked Admin mode)
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const pwInputRef = useRef<HTMLInputElement | null>(null);
  const lastBrandTapRef = useRef<number>(0);
  const singleClickTimerRef = useRef<number | null>(null);

  const { setStudioOpen, setShortsAspect, setCleanRecordMode, setRangeMode } = useShortsStudio();
  const { orderedSeries } = useAdminCatalog();

  // Keep ShortsStudioContext synced cleanly: studio mode active only inside Shorts/Chant studios (not 3-col preview)
  useEffect(() => {
    if (appMode === 'teacher' && teacherSubTab !== 'admin') {
      setStudioOpen(true);
    } else {
      setStudioOpen(false);
      setShortsAspect(false);
      setCleanRecordMode(false);
    }
  }, [appMode, teacherSubTab, setStudioOpen, setShortsAspect, setCleanRecordMode]);

  // Ensure learner view only renders released mode, category, and series
  useEffect(() => {
    if (appMode === 'teacher') return;
    if (appMode === 'chant') {
      setAppMode('theater');
    }
    if (!isCategoryPublic(activeCategory)) {
      setActiveCategory('jamo');
    }
    if (!isSeriesPublic(activeSeries)) {
      const firstPublic = orderedSeries.find((s) => isSeriesPublic(s.id));
      if (firstPublic) {
        setActiveSeries(firstPublic.id);
        if (activeCategory !== 'all' && firstPublic.category !== activeCategory) {
          setActiveCategory(firstPublic.category);
        }
      }
    }
  }, [appMode, activeSeries, activeCategory, orderedSeries]);

  useEffect(() => {
    if (appMode === 'teacher' && adminLocked) {
      window.setTimeout(() => pwInputRef.current?.focus(), 40);
    }
  }, [appMode, adminLocked]);

  useEffect(() => {
    return () => {
      if (singleClickTimerRef.current !== null) {
        window.clearTimeout(singleClickTimerRef.current);
      }
    };
  }, []);

  const handleSelectCategory = (cat: MainCategory) => {
    if (appMode !== 'teacher' && !isCategoryPublic(cat)) return;
    playCutePop();
    setActiveCategory(cat);
    const inCategory =
      cat === 'all' ? orderedSeries : orderedSeries.filter((s) => s.category === cat);
    const currentInCat = inCategory.find((s) => s.id === activeSeries);
    if (!currentInCat || (appMode !== 'teacher' && !isSeriesPublic(activeSeries))) {
      const firstAvailable =
        appMode === 'teacher'
          ? inCategory[0]
          : inCategory.find((s) => isSeriesPublic(s.id)) ?? inCategory[0];
      if (firstAvailable) setActiveSeries(firstAvailable.id);
    }
  };

  const handleSelectAppMode = (mode: AppMode) => {
    if (mode === 'chant') return;
    playCutePop();
    setAppMode(mode);
  };

  const handleEnterAdminMode = () => {
    playCutePop();
    setPwInput('');
    setPwError('');
    setTeacherSubTab('admin');
    setAppMode('teacher');
  };

  const handleExitToLearner = () => {
    playCutePop();
    setRangeMode('all');
    if (!isCategoryPublic(activeCategory)) {
      setActiveCategory('jamo');
    }
    if (!isSeriesPublic(activeSeries)) {
      const firstPublic = orderedSeries.find((s) => isSeriesPublic(s.id));
      if (firstPublic) {
        setActiveSeries(firstPublic.id);
        setActiveCategory(firstPublic.category);
      }
    }
    setAppMode('theater');
  };

  // Single click returns to Consonant screen (자음 화면); double-click/double-tap opens Admin mode
  const handleBrandClick = () => {
    const now = Date.now();
    if (now - lastBrandTapRef.current < 320) {
      lastBrandTapRef.current = 0;
      if (singleClickTimerRef.current !== null) {
        window.clearTimeout(singleClickTimerRef.current);
        singleClickTimerRef.current = null;
      }
      handleEnterAdminMode();
      return;
    }

    lastBrandTapRef.current = now;
    if (singleClickTimerRef.current !== null) {
      window.clearTimeout(singleClickTimerRef.current);
    }
    singleClickTimerRef.current = window.setTimeout(() => {
      singleClickTimerRef.current = null;
      lastBrandTapRef.current = 0;
      playCutePop();
      setRangeMode('all');
      setAppMode('theater');
      setActiveCategory('jamo');
      setActiveSeries('consonants');
    }, 240);
  };

  const handleBrandDoubleClick = () => {
    lastBrandTapRef.current = 0;
    if (singleClickTimerRef.current !== null) {
      window.clearTimeout(singleClickTimerRef.current);
      singleClickTimerRef.current = null;
    }
    handleEnterAdminMode();
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.trim() === getTeacherPassword()) {
      playCutePop();
      try {
        window.sessionStorage.removeItem(TEACHER_LOCKED_STORAGE_KEY);
      } catch {
        // Ignore storage restrictions
      }
      setAdminLocked(false);
      setPwInput('');
      setPwError('');
    } else {
      setPwError('비밀번호가 올바르지 않습니다.');
      pwInputRef.current?.focus();
      pwInputRef.current?.select();
    }
  };

  const handleLockTeacher = () => {
    try {
      window.sessionStorage.setItem(TEACHER_LOCKED_STORAGE_KEY, '1');
    } catch {
      // Ignore storage restrictions
    }
    setAdminLocked(true);
    setAppMode('theater');
  };

  // Full-Screen Admin Mode (Popup removed -> full browser width 3-column Admin workspace)
  if (appMode === 'teacher') {
    if (adminLocked) {
      return (
        <div className="min-h-screen w-full bg-slate-100 text-slate-900 flex flex-col font-body">
          <header className="bg-white border-b-2 border-slate-900 px-4 sm:px-6 h-16 flex items-center justify-between">
            <span className="font-game text-xl sm:text-2xl tracking-tight text-slate-900">
              졸라한글맨 관리자
            </span>
            <button
              type="button"
              onClick={handleExitToLearner}
              className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white border-2 border-slate-900 cursor-pointer hover:bg-slate-800"
            >
              ← 학습자 화면으로 돌아가기
            </button>
          </header>
          <div className="flex-1 flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmitPassword}
              className="w-full max-w-[360px] bg-white border-2 border-slate-900 p-6 flex flex-col gap-3"
            >
              <h2 className="font-game text-xl text-slate-900 font-normal">관리자 잠금 해제</h2>
              <p className="text-xs text-slate-600">
                비밀번호를 입력하면 전체 화면 3단 관리자 화면으로 이동합니다.
              </p>
              <input
                ref={pwInputRef}
                type="password"
                inputMode="numeric"
                value={pwInput}
                onChange={(e) => {
                  setPwInput(e.target.value);
                  if (pwError) setPwError('');
                }}
                placeholder="비밀번호 입력"
                className="w-full px-3 py-2 text-sm border-2 border-slate-900 bg-white text-slate-900 focus:outline-none focus:border-[#DC2626]"
              />
              {pwError && (
                <p className="text-xs font-bold text-[#DC2626]" role="alert">
                  {pwError}
                </p>
              )}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExitToLearner}
                  className="px-3.5 py-1.5 text-xs font-bold border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 cursor-pointer"
                >
                  학습자 화면
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#DC2626] hover:bg-[#B91C1C] text-white border-2 border-slate-900 cursor-pointer"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <JollamanArcadeHub
        appMode="teacher"
        category={activeCategory}
        activeSeries={activeSeries}
        onSelectSeries={setActiveSeries}
        onSelectCategory={handleSelectCategory}
        teacherSubTab={teacherSubTab}
        onSelectTeacherSubTab={setTeacherSubTab}
        onExitAdmin={handleExitToLearner}
        onLockTeacher={handleLockTeacher}
        audioEnabled={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] flex flex-col font-body">
      {/* Row 1 Twin Global Header: Height 64px (h-16), sticky top-0, 1px border-slate-200 bottom line */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <button
            type="button"
            onClick={handleBrandClick}
            onDoubleClick={handleBrandDoubleClick}
            className="flex items-center gap-1.5 sm:gap-2 shrink-0 select-none cursor-pointer touch-manipulation bg-transparent border-0 p-0 text-left focus:outline-none"
          >
            <span className="font-game text-xl sm:text-2xl tracking-tight text-slate-900 whitespace-nowrap leading-none font-normal">
              졸라한글맨
            </span>
            <RedShoesJollamanLogoSvg className="h-8 sm:h-9 w-auto shrink-0" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <nav className="flex items-center gap-1 sm:gap-2" aria-label="모드 전환">
              <button
                onClick={() => handleSelectAppMode('theater')}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer border-b-2 transition-colors ${
                  appMode === 'theater'
                    ? 'border-[#DC2626] text-[#DC2626]'
                    : 'border-transparent text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                졸라맨극장
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 border-b-2 border-transparent text-slate-300 cursor-not-allowed"
              >
                챈트송
              </button>
            </nav>

            <span className="w-px h-4 bg-[#E2E8F0] mx-0.5 shrink-0" aria-hidden="true" />

            <button
              type="button"
              disabled
              aria-disabled="true"
              aria-label="인쇄"
              className="py-1.5 sm:py-2 px-2.5 sm:px-3.5 text-xs font-bold text-slate-300 bg-slate-100 border-2 border-slate-200 rounded-none whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-not-allowed"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>인쇄</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: max-w-[1200px] mx-auto px-3 sm:px-6 pt-4 */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-3 sm:px-6 pt-4 flex flex-col justify-start">
        <JollamanArcadeHub
          appMode={appMode}
          category={activeCategory}
          activeSeries={activeSeries}
          onSelectSeries={setActiveSeries}
          onSelectCategory={handleSelectCategory}
          teacherSubTab={teacherSubTab}
          onSelectTeacherSubTab={setTeacherSubTab}
          onExitAdmin={handleExitToLearner}
          onLockTeacher={handleLockTeacher}
          audioEnabled={true}
        />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E2E8F0] py-2.5 px-3 sm:px-6 text-[11px] text-[#475569] print:hidden">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center text-center">
          <span>졸라한글맨 haebol.com | 한글 나라 고생 배틀</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AdminCatalogProvider>
      <ShortsStudioProvider>
        <ChantStudioProvider>
          <AppContent />
        </ChantStudioProvider>
      </ShortsStudioProvider>
    </AdminCatalogProvider>
  );
}

