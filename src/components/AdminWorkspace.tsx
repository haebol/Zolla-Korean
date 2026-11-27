import React, { Suspense, useMemo, useRef, useState } from 'react';
import { playCutePop } from '../utils/audio';
import {
  MainCategory,
  SeriesId,
  TeacherSubTab,
} from '../constants/seriesCatalog';
import { useAdminCatalog } from '../context/AdminCatalogContext';
import { useShortsStudio } from '../context/ShortsStudioContext';
import { getTeacherPassword, TEACHER_PASSWORD_STORAGE_KEY } from '../App';
import { getStandaloneAppUrl } from '../utils/appUrl';

interface AdminWorkspaceProps {
  activeSeries: SeriesId;
  onSelectSeries: (id: SeriesId) => void;
  onSelectCategory: (cat: MainCategory) => void;
  teacherSubTab: TeacherSubTab;
  onSelectTeacherSubTab: (tab: TeacherSubTab) => void;
  onExitToLearner: () => void;
  onLockTeacher: () => void;
  audioEnabled: boolean;
  renderSimulationForSeries: (seriesId: SeriesId, audioEnabled: boolean) => React.ReactNode;
  renderChantViewer: (seriesId: SeriesId, audioEnabled: boolean) => React.ReactNode;
  renderShortsStudioToolbar: () => React.ReactNode;
  renderChantStudio: (audioEnabled: boolean) => React.ReactNode;
}

const CATEGORY_LABELS: Record<MainCategory, string> = {
  all: '전체',
  jamo: '자음모음',
  batchim: '받침',
  phonology: '음운변동',
  particles: '조사회화',
};

const CATEGORY_FILTER_OPTIONS: { id: MainCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'jamo', label: '자음모음' },
  { id: 'batchim', label: '받침' },
  { id: 'phonology', label: '음운변동' },
  { id: 'particles', label: '조사회화' },
];

const StageFallback: React.FC = () => (
  <div className="w-full min-h-[320px] bg-slate-50 border-2 border-slate-900 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-500">
    화면 불러오는 중...
  </div>
);

export const AdminWorkspace: React.FC<AdminWorkspaceProps> = ({
  activeSeries,
  onSelectSeries,
  onSelectCategory,
  teacherSubTab,
  onSelectTeacherSubTab,
  onExitToLearner,
  onLockTeacher,
  audioEnabled,
  renderSimulationForSeries,
  renderChantViewer,
  renderShortsStudioToolbar,
  renderChantStudio,
}) => {
  const {
    orderedSeries,
    totalSeriesCount,
    moveSeriesOrder,
    getOrderedItems,
    moveItemOrder,
    resetItemOrderForSeries,
    itemOrderBySeries,
    resetAllAdminConfig,
    exportConfigJson,
    importConfigJson,
  } = useAdminCatalog();

  const {
    activeCatalog,
    activeMeta,
    customSelectedKeys,
    setCustomSelectedKeys,
    setRangeMode,
  } = useShortsStudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [catFilter, setCatFilter] = useState<MainCategory>('all');
  const [itemSearch, setItemSearch] = useState('');
  const [previewMode, setPreviewMode] = useState<'theater' | 'chant'>('theater');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Inline password & backup settings state (no narrow popup modal)
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [backupMsg, setBackupMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [resetArmed, setResetArmed] = useState(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const standaloneUrl = getStandaloneAppUrl();

  const selectedMeta = useMemo(
    () => orderedSeries.find((s) => s.id === activeSeries) ?? orderedSeries[0],
    [orderedSeries, activeSeries]
  );

  const filteredSeries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return orderedSeries.filter((s) => {
      if (catFilter !== 'all' && s.category !== catFilter) return false;
      if (!q) return true;
      const catLabel = CATEGORY_LABELS[s.category].toLowerCase();
      return (
        s.theaterTitle.toLowerCase().includes(q) ||
        s.label.toLowerCase().includes(q) ||
        s.mobileLabel.toLowerCase().includes(q) ||
        s.chantTitle.toLowerCase().includes(q) ||
        catLabel.includes(q)
      );
    });
  }, [orderedSeries, catFilter, searchQuery]);

  const canReorderUnits = searchQuery.trim() === '' && catFilter === 'all';

  // Ordered items for the currently selected unit (populated live by the preview stage)
  const orderedUnitItems = useMemo(() => {
    return getOrderedItems(activeSeries, activeCatalog, (c) => c.key);
  }, [activeSeries, activeCatalog, getOrderedItems]);

  const orderedUnitKeys = useMemo(
    () => orderedUnitItems.map((c) => c.key),
    [orderedUnitItems]
  );

  const visibleUnitItems = useMemo(() => {
    const q = itemSearch.trim().toLowerCase();
    if (!q) return orderedUnitItems;
    return orderedUnitItems.filter(
      (it) =>
        it.key.toLowerCase().includes(q) ||
        it.label.toLowerCase().includes(q) ||
        it.badge.toLowerCase().includes(q) ||
        it.caption.toLowerCase().includes(q) ||
        it.romanized.toLowerCase().includes(q)
    );
  }, [orderedUnitItems, itemSearch]);

  const canReorderItems = itemSearch.trim() === '';
  const hasCustomItemOrder = Boolean(
    itemOrderBySeries[activeSeries] && itemOrderBySeries[activeSeries]!.length > 0
  );

  const activePreviewKey = customSelectedKeys[0] || activeMeta.itemKey || orderedUnitItems[0]?.key;

  const handleSelectUnit = (seriesId: SeriesId, category: Exclude<MainCategory, 'all'>) => {
    playCutePop();
    setRangeMode('all');
    onSelectCategory(category);
    onSelectSeries(seriesId);
    setItemSearch('');
  };

  const handleSelectPreviewItem = (itemKey: string) => {
    playCutePop();
    setRangeMode('single');
    setCustomSelectedKeys([itemKey]);
  };

  const handleCopyStandaloneUrl = async () => {
    playCutePop();
    try {
      await navigator.clipboard.writeText(standaloneUrl);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 1600);
    } catch {
      setCopiedUrl(false);
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentActual = getTeacherPassword();
    if (curPw.trim() !== currentActual) {
      setPwMsg({ type: 'err', text: '현재 비밀번호가 일치하지 않습니다.' });
      return;
    }
    const next = newPw.trim();
    if (next.length < 1) {
      setPwMsg({ type: 'err', text: '새 비밀번호를 입력해 주세요.' });
      return;
    }
    if (next !== confirmPw.trim()) {
      setPwMsg({ type: 'err', text: '새 비밀번호 확인이 일치하지 않습니다.' });
      return;
    }
    try {
      window.localStorage.setItem(TEACHER_PASSWORD_STORAGE_KEY, next);
    } catch {
      setPwMsg({ type: 'err', text: '브라우저 저장소에 저장할 수 없습니다.' });
      return;
    }
    playCutePop();
    setCurPw('');
    setNewPw('');
    setConfirmPw('');
    setPwMsg({ type: 'ok', text: '비밀번호가 변경되었습니다.' });
    window.setTimeout(() => setPwMsg(null), 2000);
  };

  const handleDownloadJsonBackup = () => {
    playCutePop();
    const json = exportConfigJson();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jollaman-admin-settings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg({ type: 'ok', text: '단원·항목 순서 설정 JSON을 저장했습니다.' });
    window.setTimeout(() => setBackupMsg(null), 2500);
  };

  const handleImportJsonFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const res = importConfigJson(text);
      setBackupMsg({ type: res.ok ? 'ok' : 'err', text: res.message });
      window.setTimeout(() => setBackupMsg(null), 3000);
    } catch {
      setBackupMsg({ type: 'err', text: '파일을 읽을 수 없습니다.' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900 flex flex-col font-body">
      {/* Top Full-Width Admin Bar */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-slate-900 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="font-game text-lg sm:text-xl tracking-tight text-slate-900">
              졸라한글맨 관리자
            </span>
            <span className="px-1.5 py-0.5 text-[11px] font-bold bg-slate-900 text-white">
              ADMIN
            </span>
          </div>

          {/* 전체 단원 수 */}
          <div
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold"
            aria-label="전체 단원 수"
          >
            <span className="px-2 py-1 bg-slate-100 border border-slate-300 text-slate-800 tabular-nums">
              전체 단원 <strong className="text-slate-950">{totalSeriesCount}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div
            className="inline-flex items-stretch border-2 border-slate-900 divide-x divide-slate-900 bg-white"
            role="tablist"
            aria-label="관리자 작업 모드"
          >
            <button
              type="button"
              role="tab"
              aria-selected={teacherSubTab === 'admin'}
              onClick={() => {
                playCutePop();
                onSelectTeacherSubTab('admin');
              }}
              className={`px-2.5 py-1.5 text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                teacherSubTab === 'admin'
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              단원 관리 (3단)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={teacherSubTab === 'shorts'}
              onClick={() => {
                playCutePop();
                onSelectTeacherSubTab('shorts');
              }}
              className={`px-2.5 py-1.5 text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                teacherSubTab === 'shorts'
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              쇼츠 스튜디오
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={teacherSubTab === 'chantStudio'}
              onClick={() => {
                playCutePop();
                onSelectTeacherSubTab('chantStudio');
              }}
              className={`px-2.5 py-1.5 text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                teacherSubTab === 'chantStudio'
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              챈트송 스튜디오
            </button>
          </div>

          <a
            href={standaloneUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCutePop()}
            title="독립 웹앱으로 바로 열기 (인쇄 가능)"
            aria-label="독립 웹앱으로 바로 열기 (인쇄 가능)"
            className="px-2.5 py-1.5 text-xs font-bold bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1"
          >
            <span aria-hidden="true">🌐</span>
            <span>독립웹</span>
          </a>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              setSettingsOpen((v) => !v);
            }}
            className={`px-2.5 py-1.5 text-xs font-bold border-2 border-slate-900 cursor-pointer transition-colors whitespace-nowrap ${
              settingsOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'
            }`}
          >
            ⚙ 설정·백업
          </button>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onExitToLearner();
            }}
            className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 cursor-pointer transition-colors whitespace-nowrap"
          >
            ← 학습자 화면으로 돌아가기
          </button>
        </div>
      </header>

      {/* Inline Settings & Backup Panel (No narrow popup modal) */}
      {settingsOpen && (
        <section
          aria-label="관리자 설정 및 백업"
          className="bg-white border-b-2 border-slate-900 px-3 sm:px-6 py-3 flex flex-col gap-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleDownloadJsonBackup}
                className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50 cursor-pointer"
              >
                설정 JSON 백업
              </button>
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50 cursor-pointer"
              >
                설정 불러오기
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportJsonFile}
                className="hidden"
              />
              {!resetArmed ? (
                <button
                  type="button"
                  onClick={() => setResetArmed(true)}
                  className="px-2.5 py-1 border border-rose-300 bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 cursor-pointer"
                >
                  순서 초기화
                </button>
              ) : (
                <div className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      resetAllAdminConfig();
                      setResetArmed(false);
                      setBackupMsg({ type: 'ok', text: '기본 순서로 초기화했습니다.' });
                      window.setTimeout(() => setBackupMsg(null), 2500);
                    }}
                    className="px-2.5 py-1 bg-[#DC2626] text-white font-bold cursor-pointer"
                  >
                    초기화 확인
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetArmed(false)}
                    className="px-2 py-1 border border-slate-300 bg-white text-slate-600 font-bold cursor-pointer"
                  >
                    취소
                  </button>
                </div>
              )}
              {backupMsg && (
                <span
                  className={`font-bold ${
                    backupMsg.type === 'ok' ? 'text-emerald-700' : 'text-[#DC2626]'
                  }`}
                >
                  {backupMsg.text}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <a
                href={standaloneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50"
              >
                🌐 독립 웹 열기
              </a>
              <button
                type="button"
                onClick={handleCopyStandaloneUrl}
                className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50 cursor-pointer"
              >
                {copiedUrl ? '✓ 주소 복사됨' : '📋 독립 웹 주소 복사'}
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onLockTeacher();
                }}
                className="px-2.5 py-1 border border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50 cursor-pointer"
              >
                🔒 관리자 잠금
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSaveNewPassword}
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 text-xs"
          >
            <span className="font-bold text-slate-700">관리자 비밀번호 변경:</span>
            <input
              type="password"
              inputMode="numeric"
              value={curPw}
              onChange={(e) => setCurPw(e.target.value)}
              placeholder="현재 비번"
              className="w-24 px-2 py-1 border border-slate-900 bg-white text-slate-900 focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="password"
              inputMode="numeric"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비번"
              className="w-24 px-2 py-1 border border-slate-900 bg-white text-slate-900 focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="password"
              inputMode="numeric"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="새 비번 확인"
              className="w-24 px-2 py-1 border border-slate-900 bg-white text-slate-900 focus:outline-none focus:border-[#DC2626]"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold cursor-pointer"
            >
              비밀번호 저장
            </button>
            {pwMsg && (
              <span className={`font-bold ${pwMsg.type === 'ok' ? 'text-emerald-700' : 'text-[#DC2626]'}`}>
                {pwMsg.text}
              </span>
            )}
          </form>
        </section>
      )}

      {/* Main Workspace Area */}
      {teacherSubTab === 'admin' ? (
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-[320px_340px_1fr] xl:grid-cols-[350px_380px_1fr] min-h-0">
          {/* [1단 좌측 패널] 전체 단원 및 카테고리 목록 */}
          <aside
            aria-label="전체 단원 및 카테고리 목록"
            className="bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 flex flex-col lg:h-[calc(100vh-62px)] lg:sticky lg:top-[62px]"
          >
            <div className="p-3 border-b border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900">1. 전체 단원 목록</h2>
                <span className="text-[11px] font-bold text-slate-500">
                  {filteredSeries.length} / {totalSeriesCount}개
                </span>
              </div>

              {/* 키워드 빠른 검색창 */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="단원·카테고리 빠른 검색..."
                  aria-label="단원 키워드 검색"
                  className="w-full pl-2.5 pr-7 py-1.5 text-xs border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#DC2626]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="검색어 지우기"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-900 px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 카테고리 필터 */}
              <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="카테고리 필터">
                {CATEGORY_FILTER_OPTIONS.map((opt) => {
                  const active = catFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCatFilter(opt.id)}
                      className={`px-2 py-0.5 text-[11px] font-bold border cursor-pointer transition-colors ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 단원 리스트 */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {filteredSeries.length === 0 ? (
                <div className="p-6 text-center text-xs font-bold text-slate-400">
                  검색 조건에 맞는 단원이 없습니다.
                </div>
              ) : (
                filteredSeries.map((series, idx) => {
                  const isSelected = series.id === activeSeries;
                  const globalIdx = orderedSeries.findIndex((s) => s.id === series.id);
                  return (
                    <div
                      key={series.id}
                      className={`px-3 py-2.5 flex items-center gap-2 transition-colors ${
                        isSelected
                          ? 'bg-rose-50 border-l-4 border-l-[#DC2626]'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* 순서 이동 (▲/▼) */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          type="button"
                          disabled={!canReorderUnits || globalIdx <= 0}
                          onClick={() => {
                            playCutePop();
                            moveSeriesOrder(series.id, 'up');
                          }}
                          title={canReorderUnits ? '위로 이동' : '전체 필터에서만 순서 이동 가능'}
                          aria-label={`${series.theaterTitle} 위로 이동`}
                          className="w-5 h-4 flex items-center justify-center text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={!canReorderUnits || globalIdx >= orderedSeries.length - 1}
                          onClick={() => {
                            playCutePop();
                            moveSeriesOrder(series.id, 'down');
                          }}
                          title={canReorderUnits ? '아래로 이동' : '전체 필터에서만 순서 이동 가능'}
                          aria-label={`${series.theaterTitle} 아래로 이동`}
                          className="w-5 h-4 flex items-center justify-center text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          ▼
                        </button>
                      </div>

                      {/* 단원 선택 영역 */}
                      <button
                        type="button"
                        onClick={() => handleSelectUnit(series.id, series.category)}
                        className="flex-1 min-w-0 text-left cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="px-1.5 py-0.2 text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            {CATEGORY_LABELS[series.category]}
                          </span>
                        </div>
                        <div
                          className={`text-xs sm:text-[13px] font-extrabold truncate ${
                            isSelected ? 'text-[#DC2626]' : 'text-slate-900'
                          }`}
                        >
                          {series.theaterTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          단원버튼: {series.label} ({series.mobileLabel})
                        </div>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* [2단 중앙 패널] 선택된 단원의 항목 리스트 */}
          <section
            aria-label="선택된 단원의 항목 목록"
            className="bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 flex flex-col lg:h-[calc(100vh-62px)] lg:sticky lg:top-[62px]"
          >
            <div className="p-3 border-b border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-black text-slate-900 truncate">
                      2. {selectedMeta?.theaterTitle ?? ''} 항목
                    </h2>
                    <span className="px-1.5 py-0.5 text-[11px] font-bold bg-slate-900 text-white tabular-nums shrink-0">
                      {orderedUnitItems.length}개
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    항목을 클릭하면 우측 학생 미리보기에서 즉시 재생됩니다.
                  </p>
                </div>

                {hasCustomItemOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      resetItemOrderForSeries(activeSeries);
                    }}
                    className="px-2 py-1 text-[10px] font-bold border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-200 shrink-0 cursor-pointer"
                  >
                    순서 기본값
                  </button>
                )}
              </div>

              {/* 항목 빠른 검색 */}
              <div className="relative">
                <input
                  type="text"
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  placeholder="현재 단원 내 항목 검색..."
                  aria-label="현재 단원 항목 검색"
                  className="w-full pl-2.5 pr-7 py-1.5 text-xs border border-slate-400 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white"
                />
                {itemSearch && (
                  <button
                    type="button"
                    onClick={() => setItemSearch('')}
                    aria-label="항목 검색어 지우기"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-900 px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {visibleUnitItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-bold text-slate-400">
                  {orderedUnitItems.length === 0
                    ? '단원 항목을 불러오는 중입니다...'
                    : '검색어에 해당하는 항목이 없습니다.'}
                </div>
              ) : (
                visibleUnitItems.map((item) => {
                  const realIdx = orderedUnitKeys.indexOf(item.key);
                  const isActiveItem = item.key === activePreviewKey;
                  return (
                    <div
                      key={item.key}
                      className={`px-3 py-2.5 flex items-center gap-2 transition-colors ${
                        isActiveItem
                          ? 'bg-sky-50 border-l-4 border-l-sky-600'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* 항목 순서 이동 (▲/▼) */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          type="button"
                          disabled={!canReorderItems || realIdx <= 0}
                          onClick={() => {
                            playCutePop();
                            moveItemOrder(activeSeries, orderedUnitKeys, item.key, 'up');
                          }}
                          title="항목 위로 이동"
                          aria-label={`${item.label} 위로 이동`}
                          className="w-5 h-4 flex items-center justify-center text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={!canReorderItems || realIdx >= orderedUnitKeys.length - 1}
                          onClick={() => {
                            playCutePop();
                            moveItemOrder(activeSeries, orderedUnitKeys, item.key, 'down');
                          }}
                          title="항목 아래로 이동"
                          aria-label={`${item.label} 아래로 이동`}
                          className="w-5 h-4 flex items-center justify-center text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          ▼
                        </button>
                      </div>

                      {/* 항목 정보 및 클릭 시 우측 실시간 미리보기 점프 */}
                      <button
                        type="button"
                        onClick={() => handleSelectPreviewItem(item.key)}
                        className="flex-1 min-w-0 text-left cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400 tabular-nums shrink-0">
                            {String(realIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="px-1.5 py-0.5 text-xs font-black bg-slate-900 text-white shrink-0">
                            {item.key}
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 truncate">
                            {item.label}
                          </span>
                          {item.badge && item.badge !== item.key && (
                            <span className="text-[11px] font-bold text-slate-500 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.caption && (
                          <div className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-snug">
                            {item.caption}
                          </div>
                        )}
                        {item.romanized && (
                          <div className="text-[10px] font-bold text-emerald-700 mt-0.5 truncate">
                            [{item.romanized}]
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* [3단 우측 패널] 실시간 학생 화면 미리보기 */}
          <main
            aria-label="학생 화면 실시간 미리보기"
            className="bg-slate-100 p-3 sm:p-5 flex flex-col gap-3 min-w-0"
          >
            <div className="bg-white border-2 border-slate-900 p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 text-[11px] font-black bg-sky-600 text-white">
                  3. 실시간 학생 화면 미리보기
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {previewMode === 'theater'
                    ? selectedMeta?.theaterTitle
                    : selectedMeta?.chantTitle}
                </span>
                {activeMeta.itemLabel && (
                  <span className="text-xs font-bold text-[#DC2626] truncate">
                    · {activeMeta.itemLabel}
                  </span>
                )}
              </div>

              <div className="inline-flex items-stretch border-2 border-slate-900 divide-x divide-slate-900 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setRangeMode('all');
                    setPreviewMode('theater');
                  }}
                  className={`px-2.5 py-1 text-xs font-bold cursor-pointer transition-colors ${
                    previewMode === 'theater'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  졸라맨극장 보기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setRangeMode('all');
                    setPreviewMode('chant');
                  }}
                  className={`px-2.5 py-1 text-xs font-bold cursor-pointer transition-colors ${
                    previewMode === 'chant'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  챈트송 보기
                </button>
              </div>
            </div>

            {/* Authentic Student Stage Frame */}
            <div className="bg-white border-2 border-slate-900 p-3 sm:p-5 shadow-sm">
              <Suspense fallback={<StageFallback />}>
                {previewMode === 'chant'
                  ? renderChantViewer(activeSeries, audioEnabled)
                  : renderSimulationForSeries(activeSeries, audioEnabled)}
              </Suspense>
            </div>
          </main>
        </div>
      ) : (
        /* Existing Teacher Studios (Shorts Studio / Chant Studio) preserved in full width */
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-6 py-4 flex flex-col gap-3">
          {teacherSubTab === 'shorts' ? (
            <div className="flex flex-col gap-2">
              <div
                className="flex flex-wrap items-center gap-1 sm:gap-2"
                role="tablist"
                aria-label="쇼츠 스튜디오 단원 선택"
              >
                {orderedSeries.map((series) => {
                  const active = activeSeries === series.id;
                  return (
                    <button
                      key={series.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleSelectUnit(series.id, series.category)}
                      className={`py-1 px-2 sm:py-1.5 sm:px-3 text-xs font-bold rounded-none border-2 border-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="sm:hidden">{series.mobileLabel}</span>
                      <span className="hidden sm:inline">{series.label}</span>
                    </button>
                  );
                })}
              </div>

              <Suspense fallback={<StageFallback />}>
                {renderShortsStudioToolbar()}
                {renderSimulationForSeries(activeSeries, audioEnabled)}
              </Suspense>
            </div>
          ) : (
            <Suspense fallback={<StageFallback />}>
              {renderChantStudio(audioEnabled)}
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};
