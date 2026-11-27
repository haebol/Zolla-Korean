import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playAdditionSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES11_MEANINGS: Record<AdditionKey, string> = {
  콧물: 'Runny nose',
  촛불: 'Candlelight',
  깻잎: 'Perilla leaf',
  한여름: 'Midsummer',
  가다: 'Go! (Imperative)',
  푸르다: 'Lush & Blue',
  푸다: 'To scoop out',
  녀자: 'Woman / Lady',
};
import { JollamanCharacterSvg, JollamanFaceMode, SparkleBurstSvg } from './JollamanSprites';
import { GiantHangulSvg, ElectricZapSvg } from './JollamanSprites8';
import {
  AdditionKey,
  AdditionBackdrop,
  TissueBoxSvg,
  DoubleCandleSvg,
  SesameLeafSvg,
  BlazingSunSvg,
  RoyalScrollSvg,
  WaterLadleSvg,
  StageBarrierGateSvg,
} from './JollamanSprites11';

export interface AdditionItem {
  key: AdditionKey;
  skyLabel: string;
  ruleBadge: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const ADDITION_ITEMS: AdditionItem[] = [
  {
    key: '콧물',
    skyLabel: '콧물',
    ruleBadge: '사잇소리 비음화',
    resultDisplay: '콧물 → [콘물]',
    pronunciation: '콘물',
    ttsReveal: '콧. 물, 콘물!',
    color: '#E11D48',
    skyX: 78,
    skyY: 60,
  },
  {
    key: '촛불',
    skyLabel: '촛불',
    ruleBadge: '사잇소리 된소리',
    resultDisplay: '촛불 → [초뿔]',
    pronunciation: '초뿔',
    ttsReveal: '촛. 불, 초뿔!',
    color: '#EA580C',
    skyX: 198,
    skyY: 84,
  },
  {
    key: '깻잎',
    skyLabel: '깻잎',
    ruleBadge: '사잇소리+ㄴ첨가',
    resultDisplay: '깻잎 → [깬닙]',
    pronunciation: '깬닙',
    ttsReveal: '깻. 잎, 깬닙!',
    color: '#16A34A',
    skyX: 319,
    skyY: 60,
  },
  {
    key: '한여름',
    skyLabel: '한여름',
    ruleBadge: 'ㄴ첨가',
    resultDisplay: '한여름 → [한녀름]',
    pronunciation: '한녀름',
    ttsReveal: '한. 여름, 한녀름!',
    color: '#D97706',
    skyX: 439,
    skyY: 84,
  },
  {
    key: '가다',
    skyLabel: '가다',
    ruleBadge: '거라·너라 불규칙',
    resultDisplay: '가다 → 가거라',
    pronunciation: '가거라',
    ttsReveal: '가다, 가거라!',
    color: '#B45309',
    skyX: 560,
    skyY: 60,
  },
  {
    key: '푸르다',
    skyLabel: '푸르다',
    ruleBadge: '러불규칙',
    resultDisplay: '푸르다 → 푸르러',
    pronunciation: '푸르러',
    ttsReveal: '푸르다, 푸르러!',
    color: '#0284C7',
    skyX: 681,
    skyY: 84,
  },
  {
    key: '푸다',
    skyLabel: '푸다',
    ruleBadge: '우불규칙',
    resultDisplay: '푸다 → 퍼',
    pronunciation: '퍼',
    ttsReveal: '푸다, 퍼!',
    color: '#0EA5E9',
    skyX: 801,
    skyY: 60,
  },
  {
    key: '녀자',
    skyLabel: '녀자',
    ruleBadge: '두음법칙',
    resultDisplay: '녀자 → 여자',
    pronunciation: '여자',
    ttsReveal: '녀자, 여자!',
    color: '#7C3AED',
    skyX: 922,
    skyY: 84,
  },
];

interface JollamanAdditionSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const getActionDuration = (key: AdditionKey): number => {
  if (key === '한여름' || key === '푸르다') return 3.65;
  return 3.55;
};

export const JollamanAdditionSimulation: React.FC<JollamanAdditionSimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    phase,
    selectedItem,
    learnedKeys,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<AdditionItem, AdditionKey>({
    seriesNum: 11,
    seriesTitle: '11. 졸라첨가·사잇소리맨 (8종)',
    items: ADDITION_ITEMS,
    audioEnabled,
    bgmTrack: 'retro2d',
    initialWalkX: 180,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 1.05,
    scrollSpeedOnApproach: 320,
    aftermathAnimMaxDur: 1.45,
    alwaysResetWalkX: true,
    playPopOnSelect: true,
    getKey: (item) => item.key,
    getLabel: (item) => item.resultDisplay,
    getBadge: (item) => item.ruleBadge,
    getAccentColor: (item) => item.color,
    getCaption: (item) => `${item.ruleBadge} · ${item.resultDisplay}`,
    getSpeakText: (item) => item.ttsReveal,
    getActionDuration: (item) => getActionDuration(item.key),
    getTargetStartX: (item) =>
      item.key === '한여름' || item.key === '가다' || item.key === '푸르다' ? 730 : 700,
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      if (t >= 0.34 && !impactTriggered) {
        markImpact();
        if (audioOn) {
          const sfxMap: Record<
            AdditionKey,
            'noseSait' | 'candleSait' | 'leafAdd' | 'summerAdd' | 'georaIrreg' | 'reoIrreg' | 'uDrop' | 'dueumKick'
          > = {
            콧물: 'noseSait',
            촛불: 'candleSait',
            깻잎: 'leafAdd',
            한여름: 'summerAdd',
            가다: 'georaIrreg',
            푸르다: 'reoIrreg',
            푸다: 'uDrop',
            녀자: 'dueumKick',
          };
          playAdditionSfx(sfxMap[item.key]);
        }
      }
      if (t >= 0.66 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          if (item.key === '푸다' || item.key === '가다') {
            playCartoonSplat();
          } else if (item.key === '한여름' || item.key === '녀자' || item.key === '촛불') {
            playCartoonImpact();
          }
        }
      }
    },
  });

  const activeKey = selectedItem.key;

  const isWalkingMotion = phase === 'walking' || phase === 'approaching';
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  const jollaFacing = phase === 'walking' ? anim.walkDir : 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';

  if (phase === 'action') {
    const t = anim.actionT;
    switch (activeKey) {
      case '콧물': {
        jollaX = 700;
        if (t < 0.36) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const hop = Math.sin(Math.min((t - 0.36) / 0.4, 1) * Math.PI) * 32;
          jollaX = 700 + Math.min((t - 0.36) / 0.4, 1) * 30;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '촛불': {
        jollaX = 700;
        if (t < 0.38) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const hop = Math.sin(Math.min((t - 0.38) / 0.42, 1) * Math.PI) * 42;
          jollaX = 700 + Math.min((t - 0.38) / 0.42, 1) * 60;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '깻잎': {
        jollaX = 700;
        if (t < 0.42) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const hop = Math.abs(Math.sin(Math.min((t - 0.42) / 0.45, 1) * Math.PI * 2)) * 22;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case '한여름': {
        jollaX = 730;
        if (t < 0.44) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'panic';
        } else {
          const knock = Math.min((t - 0.44) / 0.34, 1);
          jollaX = 730 + knock * 75;
          jollaY = GROUND_Y - 52 - Math.sin(knock * Math.PI) * 48 + knock * 14;
          jollaRot = knock * 72;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '가다': {
        jollaX = 730;
        if (t < 0.42) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const hop = Math.sin(Math.min((t - 0.42) / 0.45, 1) * Math.PI) * 48;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '푸르다': {
        jollaX = 730;
        if (t < 0.42) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const lift = Math.sin(Math.min((t - 0.42) / 0.5, 1) * Math.PI);
          jollaY = GROUND_Y - 52 - lift * 44;
          jollaRot = Math.sin(t * 18) * 14;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '푸다': {
        jollaX = 700;
        if (t < 0.42) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const hop = Math.sin(Math.min((t - 0.42) / 0.4, 1) * Math.PI) * 45;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '녀자': {
        jollaX = 700;
        if (t < 0.42) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const jump = Math.sin(Math.min((t - 0.42) / 0.44, 1) * Math.PI);
          jollaY = GROUND_Y - 52 - jump * 62;
          jollaFaceMode = 'happy';
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeKey) {
      case '콧물':
        jollaX = 730;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'dizzy';
        break;
      case '촛불':
        jollaX = 760;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'panic';
        break;
      case '깻잎':
        jollaX = 700;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'happy';
        break;
      case '한여름':
        jollaX = 805;
        jollaY = GROUND_Y - 38;
        jollaRot = 72;
        jollaFaceMode = 'dizzy';
        break;
      case '가다':
        jollaX = 730;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'happy';
        break;
      case '푸르다':
        jollaX = 730;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'dizzy';
        break;
      case '푸다':
        jollaX = 700;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'panic';
        break;
      case '녀자':
        jollaX = 700;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'happy';
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(
    11,
    selectedItem.key,
    `${selectedItem.ruleBadge} · ${selectedItem.resultDisplay}`
  );
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon="🧲"
      title="11. 졸라첨가·사잇소리맨 (8종)"
      accentButtonClass="bg-rose-600 hover:bg-rose-700"
      stageBgClass="bg-rose-50"
      ariaLabel="졸라맨 11 첨가·사잇소리·거라/러/우/두음 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'retro2d',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
        activeLabel: '🎵 레트로 BGM 켜짐',
        title: '아날로그 2D 레트로 게임 배경음악 켜기/끄기',
      }}
      items={ADDITION_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedKeys}
      getKey={(item) => item.key}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      skyTokenStyle="pill"
      pillWidth={92}
      pillHeight={48}
      getTokenText={(item) => item.skyLabel}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={600}
      walkingHint="하늘의 첨가·사잇소리 (콧물 ~ 녀자)을 눌러보세요!"
      activeCaption={`${selectedItem.resultDisplay} · [${selectedItem.pronunciation}] (${selectedItem.ruleBadge})`}
      revealAriaLabel={`${selectedItem.resultDisplay} 학습 화면`}
      revealGlyph={selectedItem.pronunciation}
      revealGlyphSize="medium"
      revealHeadline={<span>{selectedItem.resultDisplay}</span>}
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const [leftPart, rightPart] = selectedItem.resultDisplay.split('→').map((s) => s.trim());
        const isPhoneticBracket = selectedItem.resultDisplay.includes('[');
        return {
          glyph: isPhoneticBracket ? `[${selectedItem.pronunciation}]` : selectedItem.pronunciation,
          subLabel: selectedItem.ruleBadge,
          accentColor: selectedItem.color,
          headlineNode: rightPart ? (
            <>
              <span>{leftPart}</span>
              <span className="mx-1.5 text-slate-400">→</span>
              <span style={{ color: selectedItem.color }}>{rightPart}</span>
            </>
          ) : (
            <span style={{ color: selectedItem.color }}>{selectedItem.resultDisplay}</span>
          ),
          headlineCharLen: selectedItem.resultDisplay.length,
          meaning: tWordMeaning(11, selectedItem.key, SERIES11_MEANINGS[selectedItem.key]),
          romanization: romanizeKorean(selectedItem.pronunciation),
          cornerIcon: getSeriesCornerIcon(11, selectedItem.key, anim.walkTime),
        };
      })()}
      backdropSlot={
        <AdditionBackdrop
          activeKey={phase === 'walking' ? ADDITION_ITEMS[0].key : activeKey}
          isWalkingMode={false}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >

          {/* 3. GIANT INTERACTIVE MECHANICS */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* 1. 콧물 -> [콘물] (ㅅ sneezes in and morphs into ㄴ before ㅁ!) */}
              {activeKey === '콧물' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const sneezed = t >= 0.34;
                const merged = t >= 0.7;
                const dropP = sneezed ? Math.min((t - 0.34) / 0.28, 1) : 0;

                return (
                  <g>
                    <g transform="translate(155, 344)">
                      <TissueBoxSvg pop={sneezed ? 1 : 0.2} />
                    </g>

                    {!merged ? (
                      <g>
                        <g transform="translate(305, 224)">
                          <GiantHangulSvg text="코" size={172} fill="#1E293B" />
                        </g>
                        {sneezed && (
                          <g transform={`translate(${305}, ${125 + dropP * 195})`}>
                            <GiantHangulSvg
                              text={t >= 0.56 ? 'ㄴ' : 'ㅅ'}
                              size={116}
                              fill={t >= 0.56 ? '#E11D48' : '#38BDF8'}
                            />
                          </g>
                        )}
                        <g transform="translate(505, 236)">
                          <GiantHangulSvg text="물" size={172} fill="#0284C7" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(315, 240)">
                          <GiantHangulSvg text="콘" size={192} fill="#E11D48" />
                        </g>
                        <g transform="translate(505, 240)">
                          <GiantHangulSvg text="물" size={184} fill="#0284C7" />
                        </g>
                      </g>
                    )}

                    {merged && (
                      <g transform="translate(410, 240)">
                        <SparkleBurstSvg color="#38BDF8" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 2. 촛불 -> [초뿔] (ㅅ jumps in and blasts candle flame twice as big -> ㅃ!) */}
              {activeKey === '촛불' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const flared = t >= 0.36;
                const merged = t >= 0.7;

                return (
                  <g>
                    <g transform="translate(595, 332)">
                      <DoubleCandleSvg
                        flared={flared}
                        flicker={0.94 + Math.sin(anim.walkTime * 16) * 0.08}
                      />
                    </g>

                    {!merged ? (
                      <g>
                        <g transform="translate(295, 226)">
                          <GiantHangulSvg text="초" size={170} fill="#1E293B" />
                        </g>
                        {flared && (
                          <g transform="translate(295, 322)">
                            <GiantHangulSvg text="ㅅ" size={112} fill="#EA580C" />
                          </g>
                        )}
                        <g transform="translate(485, 238)">
                          <GiantHangulSvg text="불" size={172} fill="#EA580C" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(295, 240)">
                          <GiantHangulSvg text="초" size={184} fill="#1E293B" />
                        </g>
                        <g transform="translate(485, 240)">
                          <GiantHangulSvg text="뿔" size={196} fill="#EA580C" />
                        </g>
                      </g>
                    )}

                    {flared && !merged && phase === 'action' && (
                      <g transform={`translate(390, 235) scale(${1 + Math.sin(t * 44) * 0.16})`}>
                        <ElectricZapSvg color="#FACC15" />
                      </g>
                    )}
                    {merged && (
                      <g transform="translate(405, 240)">
                        <SparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 3. 깻잎 -> [깬닙] (ㅅ and ㄴ pop out together into twin ㄴ + ㄴ!) */}
              {activeKey === '깻잎' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const popped = t >= 0.34;
                const merged = t >= 0.7;

                return (
                  <g>
                    <g transform="translate(160, 318)">
                      <SesameLeafSvg scale={popped ? 1.15 : 1} />
                    </g>

                    {!merged ? (
                      <g>
                        <g transform="translate(310, 224)">
                          <GiantHangulSvg text="깨" size={168} fill="#1E293B" />
                        </g>
                        {popped && (
                          <g>
                            <g transform="translate(310, 322)">
                              <GiantHangulSvg text="ㄴ" size={114} fill="#16A34A" />
                            </g>
                            <g transform="translate(432, 228)">
                              <GiantHangulSvg text="ㄴ" size={114} fill="#16A34A" />
                            </g>
                          </g>
                        )}
                        <g transform="translate(530, 238)">
                          <GiantHangulSvg text="잎" size={168} fill="#15803D" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(335, 240)">
                          <GiantHangulSvg text="깬" size={188} fill="#16A34A" />
                        </g>
                        <g transform="translate(520, 240)">
                          <GiantHangulSvg text="닙" size={188} fill="#15803D" />
                        </g>
                      </g>
                    )}

                    {merged && (
                      <g transform="translate(425, 240)">
                        <SparkleBurstSvg color="#22C55E" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 4. 한여름 -> [한녀름] (Surprise ㄴ drops from sky into 여!) */}
              {activeKey === '한여름' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const dropped = t >= 0.34;
                const merged = t >= 0.72;
                const fallP = dropped ? Math.min((t - 0.34) / 0.32, 1) : 0;

                return (
                  <g>
                    <g transform="translate(150, 160)">
                      <BlazingSunSvg pulse={1 + Math.sin(anim.walkTime * 6) * 0.06} />
                    </g>

                    <g transform="translate(260, 242)">
                      <GiantHangulSvg text="한" size={158} fill="#1E293B" />
                    </g>

                    {!merged ? (
                      <g>
                        {dropped && (
                          <g transform={`translate(430, ${92 + fallP * 136})`}>
                            <GiantHangulSvg text="ㄴ" size={114} fill="#D97706" />
                          </g>
                        )}
                        <g transform="translate(430, 242)">
                          <GiantHangulSvg text="여" size={158} fill="#EA580C" />
                        </g>
                      </g>
                    ) : (
                      <g transform="translate(430, 242)">
                        <GiantHangulSvg text="녀" size={178} fill="#D97706" />
                      </g>
                    )}

                    <g transform="translate(595, 242)">
                      <GiantHangulSvg text="름" size={158} fill="#1E293B" />
                    </g>

                    {merged && (
                      <g transform="translate(430, 242)">
                        <SparkleBurstSvg color="#F59E0B" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 5. 가다 -> 가거라 (Royal decree stamps out -아라 and snaps -거라!) */}
              {activeKey === '가다' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const stamped = t >= 0.36;
                const merged = t >= 0.7;
                const stampP = stamped ? Math.min((t - 0.36) / 0.28, 1) : 0;

                return (
                  <g>
                    <g transform="translate(250, 242)">
                      <GiantHangulSvg text="가" size={168} fill="#1E293B" />
                    </g>

                    {!merged ? (
                      <g>
                        <g
                          transform={`translate(${420 - stampP * 35}, ${242 + stampP * 110}) rotate(${-stampP * 40})`}
                          opacity={1 - stampP}
                        >
                          <GiantHangulSvg text="아" size={160} fill="#94A3B8" />
                        </g>
                        {stamped && (
                          <g transform={`translate(420, ${135 + stampP * 107})`}>
                            <GiantHangulSvg text="거" size={172} fill="#B45309" />
                          </g>
                        )}
                      </g>
                    ) : (
                      <g transform="translate(420, 242)">
                        <GiantHangulSvg text="거" size={178} fill="#B45309" />
                      </g>
                    )}

                    <g transform="translate(580, 242)">
                      <GiantHangulSvg text="라" size={168} fill="#B45309" />
                    </g>

                    {phase === 'action' && t < 0.76 && (
                      <g transform={`translate(420, ${stamped ? 132 : 110})`}>
                        <RoyalScrollSvg open={0.85 + Math.sin(t * 20) * 0.1} />
                      </g>
                    )}

                    {merged && (
                      <g transform="translate(420, 242)">
                        <SparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 6. 푸르다 -> 푸르러 (Green leaf swirl turns -어 into -러!) */}
              {activeKey === '푸르다' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const swirled = t >= 0.36;
                const merged = t >= 0.72;

                return (
                  <g>
                    <g transform="translate(230, 242)">
                      <GiantHangulSvg text="푸" size={162} fill="#0284C7" />
                    </g>
                    <g transform="translate(390, 242)">
                      <GiantHangulSvg text="르" size={162} fill="#0284C7" />
                    </g>

                    <g transform={`translate(560, 242) scale(${merged ? 1.08 : 1})`}>
                      <GiantHangulSvg
                        text={swirled ? '러' : '어'}
                        size={172}
                        fill={swirled ? '#16A34A' : '#64748B'}
                      />
                    </g>

                    {swirled && !merged && phase === 'action' && (
                      <g transform={`translate(560, 230) rotate(${(t - 0.36) * 720})`}>
                        <g transform="translate(72, 0) scale(0.5)">
                          <SesameLeafSvg />
                        </g>
                        <g transform="translate(-72, 0) scale(0.5)">
                          <SesameLeafSvg />
                        </g>
                      </g>
                    )}

                    {merged && (
                      <g transform="translate(560, 242)">
                        <SparkleBurstSvg color="#16A34A" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 7. 푸다 -> 퍼 (Giant water ladle scoops ㅜ out and merges ㅍ + ㅓ -> 퍼!) */}
              {activeKey === '푸다' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const scooped = t >= 0.36;
                const merged = t >= 0.7;
                const scoopP = scooped ? Math.min((t - 0.36) / 0.34, 1) : 0;

                return (
                  <g>
                    <g transform="translate(185, 326)">
                      <WaterLadleSvg tilt={scooped && phase === 'action' ? -28 : 0} />
                    </g>

                    {!merged ? (
                      <g>
                        <g transform={`translate(${370 + scoopP * 35}, 212)`}>
                          <GiantHangulSvg text="ㅍ" size={138} fill="#0EA5E9" />
                        </g>
                        {scoopP < 0.96 && (
                          <g
                            transform={`translate(${370 - scoopP * 140}, ${300 - Math.sin(scoopP * Math.PI) * 110}) rotate(${-scoopP * 240})`}
                            opacity={1 - scoopP}
                          >
                            <GiantHangulSvg text="ㅜ" size={120} fill="#0284C7" />
                          </g>
                        )}
                        <g transform={`translate(${525 - scoopP * 55}, 242)`}>
                          <GiantHangulSvg text="ㅓ" size={168} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g transform="translate(445, 240)">
                        <GiantHangulSvg text="퍼" size={202} fill="#0EA5E9" />
                      </g>
                    )}

                    {merged && (
                      <g transform="translate(445, 240)">
                        <SparkleBurstSvg color="#38BDF8" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 8. 녀자 -> 여자 (Dueum barrier gate kicks initial ㄴ out of the stage!) */}
              {activeKey === '녀자' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const kicked = t >= 0.36;
                const settled = t >= 0.7;
                const kickP = kicked ? Math.min((t - 0.36) / 0.38, 1) : 0;

                return (
                  <g>
                    <g transform="translate(215, 344)">
                      <StageBarrierGateSvg />
                    </g>

                    {!settled ? (
                      <g>
                        {kickP < 0.96 && (
                          <g
                            transform={`translate(${310 - kickP * 230}, ${212 - kickP * 185}) rotate(${-kickP * 420})`}
                            opacity={1 - kickP}
                          >
                            <GiantHangulSvg text="ㄴ" size={114} fill="#EA580C" />
                          </g>
                        )}
                        <g transform={`translate(${410 - kickP * 45}, 240)`}>
                          <GiantHangulSvg text="여" size={172} fill="#7C3AED" />
                        </g>
                        <g transform={`translate(${565 - kickP * 20}, 240)`}>
                          <GiantHangulSvg text="자" size={172} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(365, 240)">
                          <GiantHangulSvg text="여" size={188} fill="#7C3AED" />
                        </g>
                        <g transform="translate(545, 240)">
                          <GiantHangulSvg text="자" size={188} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                    {settled && (
                      <g transform="translate(455, 240)">
                        <SparkleBurstSvg color="#A855F7" progress={anim.aftermathT} />
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* 4. MAIN JOLLAMAN STICK FIGURE */}
          <g
            transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing}, 1)`}
            onClick={toggleJollaPause}
            className="cursor-pointer"
          >
            <rect x="-48" y="-76" width="96" height="132" fill="transparent" />
            {jollaRot === 0 && jollaY < GROUND_Y && (
              <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.22" />
            )}
            <JollamanCharacterSvg
              faceMode={jollaFaceMode}
              isWalking={isWalkingMotion}
              legSwing={legSwing}
              armSwing={armSwing}
              walkTime={anim.walkTime}
              activeChar={activeKey}
            />
            {(phase === 'aftermath' || phase === 'reveal') &&
              (activeKey === '콧물' || activeKey === '한여름' || activeKey === '푸르다') && (
                <text
                  x={Math.cos(anim.walkTime * 6) * 16}
                  y={-66 + Math.sin(anim.walkTime * 6) * 4}
                  fontSize="16"
                  textAnchor="middle"
                >
                  ⭐
                </text>
              )}
          </g>

    </JollamanStageShell>
  );
};
