// Live SVG Stage Snapshot + High-Contrast Yellow-Red Meme Thumbnail Generator (1080x1920 & 1280x720 PNG)

export type ThumbnailDimensions = '1080x1920' | '1280x720';

export interface ThumbnailDraft {
  snapshotDataUrl: string | null;
  stageBgHex: string;
  badgeText: string;
  headline1: string;
  headline2: string;
  footerSub: string;
}

const STAGE_BG_CLASS_HEX: Record<string, string> = {
  'bg-sky-50': '#F0F9FF',
  'bg-cyan-700': '#0E7490',
  'bg-amber-50': '#FFFBEB',
  'bg-indigo-950': '#1E1B4B',
  'bg-emerald-50': '#ECFDF5',
  'bg-rose-50': '#FFF1F2',
  'bg-slate-900': '#0F172A',
  'bg-slate-950': '#020617',
  'bg-blue-50': '#EFF6FF',
  'bg-violet-50': '#F5F3FF',
  'bg-fuchsia-50': '#FDF4FF',
};

export function resolveStageBgHex(stageBgClass?: string): string {
  if (!stageBgClass) return '#F0F9FF';
  for (const [cls, hex] of Object.entries(STAGE_BG_CLASS_HEX)) {
    if (stageBgClass.includes(cls)) return hex;
  }
  return '#F0F9FF';
}

/**
 * Serializes the live SVG inside stageContainer into a standalone SVG data URL image.
 */
export async function captureLiveStageSnapshot(
  stageContainer: HTMLElement | null,
  stageBgClass?: string
): Promise<{ dataUrl: string; bgHex: string }> {
  const bgHex = resolveStageBgHex(stageBgClass);
  const svgEl = stageContainer?.querySelector('svg');
  if (!svgEl) {
    throw new Error('현재 무대 SVG를 찾을 수 없습니다.');
  }

  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  const viewBoxAttr = clone.getAttribute('viewBox') || '0 0 1000 460';
  const vbParts = viewBoxAttr.trim().split(/\s+/).map(Number);
  const vbW = vbParts.length === 4 && Number.isFinite(vbParts[2]) ? vbParts[2] : 1000;
  const vbH = vbParts.length === 4 && Number.isFinite(vbParts[3]) ? vbParts[3] : 460;

  clone.setAttribute('width', String(Math.round(vbW * 2)));
  clone.setAttribute('height', String(Math.round(vbH * 2)));
  clone.setAttribute(
    'style',
    'font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;'
  );

  // Add clean background rect at the start of the serialized SVG so transparent parts keep stage tint
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('x', String(vbParts[0] || 0));
  bgRect.setAttribute('y', String(vbParts[1] || 0));
  bgRect.setAttribute('width', String(vbW));
  bgRect.setAttribute('height', String(vbH));
  bgRect.setAttribute('fill', bgHex);
  clone.insertBefore(bgRect, clone.firstChild);

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await loadImage(blobUrl);
    const rasterCanvas = document.createElement('canvas');
    rasterCanvas.width = Math.max(800, Math.round(vbW * 2));
    rasterCanvas.height = Math.max(600, Math.round(vbH * 2));
    const ctx = rasterCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgHex;
      ctx.fillRect(0, 0, rasterCanvas.width, rasterCanvas.height);
      ctx.drawImage(img, 0, 0, rasterCanvas.width, rasterCanvas.height);
    }
    return {
      dataUrl: rasterCanvas.toDataURL('image/png'),
      bgHex,
    };
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지 변환에 실패했습니다.'));
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
  weight = 900
): number {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  return size;
}

/**
 * Renders the final High-Contrast Yellow-Red Meme Thumbnail onto target Canvas.
 */
export async function renderThumbnailCanvas(
  canvas: HTMLCanvasElement,
  dimensions: ThumbnailDimensions,
  draft: ThumbnailDraft
): Promise<void> {
  const isVertical = dimensions === '1080x1920';
  const W = isVertical ? 1080 : 1280;
  const H = isVertical ? 1920 : 720;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Dark Studio Backdrop
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#020617');
  bgGrad.addColorStop(0.5, '#0F172A');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Subtle diagonal energy stripes in dark backdrop
  ctx.save();
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.06)';
  ctx.lineWidth = 28;
  for (let i = -H; i < W + H; i += 110) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - H * 0.45, H);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Draw Captured Live SVG Stage Frame
  const img = draft.snapshotDataUrl ? await loadImage(draft.snapshotDataUrl) : null;

  if (isVertical) {
    // 9:16 Layout: Top Meme Headline Deck + Center 1:1 Stage Window + Bottom CTA Footer
    const stageMargin = 42;
    const stageSize = W - stageMargin * 2; // 996x996
    const stageTop = 530;

    // Bright yellow-red border glow around live frame
    ctx.save();
    drawRoundedRect(ctx, stageMargin - 8, stageTop - 8, stageSize + 16, stageSize + 16, 42);
    ctx.fillStyle = '#FACC15';
    ctx.fill();
    drawRoundedRect(ctx, stageMargin, stageTop, stageSize, stageSize, 36);
    ctx.clip();
    ctx.fillStyle = draft.stageBgHex || '#F0F9FF';
    ctx.fillRect(stageMargin, stageTop, stageSize, stageSize);

    if (img) {
      const scale = Math.max(stageSize / img.width, stageSize / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(
        img,
        stageMargin + (stageSize - dw) / 2,
        stageTop + (stageSize - dh) / 2,
        dw,
        dh
      );
    }
    ctx.restore();

    // Inner stage border
    ctx.save();
    drawRoundedRect(ctx, stageMargin, stageTop, stageSize, stageSize, 36);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#E11D48';
    ctx.stroke();
    ctx.restore();

    // Top Yellow-Red High-Contrast Accent Badge
    const badgeLabel = (draft.badgeText || '외국인 99% 헷갈리는!').trim();
    ctx.save();
    ctx.font = '900 42px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
    const badgeMetrics = ctx.measureText(badgeLabel);
    const badgeW = Math.min(W - 100, badgeMetrics.width + 92);
    const badgeH = 82;
    const badgeX = (W - badgeW) / 2;
    const badgeY = 92;

    // Red shadow offset + Yellow pill body
    drawRoundedRect(ctx, badgeX + 10, badgeY + 10, badgeW, badgeH, 20);
    ctx.fillStyle = '#E11D48';
    ctx.fill();

    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 20);
    ctx.fillStyle = '#FACC15';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0F172A';
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeLabel, W / 2, badgeY + badgeH / 2 + 2, badgeW - 36);
    ctx.restore();

    // 2-Line Giant Meme Headline (Line 1 White + Line 2 Yellow)
    const line1 = (draft.headline1 || '졸라맨 한국어 3초 컷').trim();
    const line2 = (draft.headline2 || '진짜 발음 맞혀봐!').trim();
    const maxHeadlineW = W - 88;

    const f1 = fitFontSize(ctx, line1, maxHeadlineW, 96, 48);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${f1}px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#0F172A';
    ctx.strokeText(line1, W / 2, 268, maxHeadlineW);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(line1, W / 2, 268, maxHeadlineW);
    ctx.restore();

    const f2 = fitFontSize(ctx, line2, maxHeadlineW, 108, 52);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${f2}px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 22;
    ctx.strokeStyle = '#E11D48';
    ctx.strokeText(line2, W / 2, 402, maxHeadlineW);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0F172A';
    ctx.strokeText(line2, W / 2, 402, maxHeadlineW);
    ctx.fillStyle = '#FACC15';
    ctx.fillText(line2, W / 2, 402, maxHeadlineW);
    ctx.restore();

    // Bottom punchy strip inside safe upper zone (above YouTube bottom bar)
    const footerText = (draft.footerSub || '졸라한글맨 · 1초 만에 이해하기!').trim();
    ctx.save();
    drawRoundedRect(ctx, 110, 1572, W - 220, 88, 22);
    ctx.fillStyle = '#E11D48';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FACC15';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 40px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(footerText, W / 2, 1618, W - 270);
    ctx.restore();
  } else {
    // 16:9 Layout (1280x720): Full-bleed crisp SVG frame + High-Contrast Yellow-Red Lower/Left Scrim Meme Typography
    ctx.save();
    ctx.fillStyle = draft.stageBgHex || '#F0F9FF';
    ctx.fillRect(0, 0, W, H);
    if (img) {
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    }

    // Bottom dark gradient scrim for crisp WCAG contrast without covering center action
    const scrim = ctx.createLinearGradient(0, H * 0.42, 0, H);
    scrim.addColorStop(0, 'rgba(2, 6, 23, 0)');
    scrim.addColorStop(0.55, 'rgba(2, 6, 23, 0.72)');
    scrim.addColorStop(1, 'rgba(2, 6, 23, 0.94)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, H * 0.42, W, H * 0.58);

    // Outer Yellow-Red YouTube border accent
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FACC15';
    ctx.strokeRect(7, 7, W - 14, H - 14);
    ctx.restore();

    // Top-Left Yellow-Red Accent Badge
    const badgeLabel = (draft.badgeText || '외국인 99% 헷갈리는!').trim();
    ctx.save();
    ctx.font = '900 32px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
    const bm = ctx.measureText(badgeLabel);
    const bw = Math.min(W - 120, bm.width + 70);
    const bh = 62;
    drawRoundedRect(ctx, 48 + 7, 38 + 7, bw, bh, 16);
    ctx.fillStyle = '#E11D48';
    ctx.fill();
    drawRoundedRect(ctx, 48, 38, bw, bh, 16);
    ctx.fillStyle = '#FACC15';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0F172A';
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeLabel, 48 + bw / 2, 38 + bh / 2 + 2, bw - 28);
    ctx.restore();

    // Bottom 2-Line Giant Meme Headline (Left-aligned crisp editorial punch)
    const line1 = (draft.headline1 || '졸라맨 한국어 3초 컷').trim();
    const line2 = (draft.headline2 || '진짜 발음 맞혀봐!').trim();
    const maxW = W - 110;

    const f1 = fitFontSize(ctx, line1, maxW, 74, 40);
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${f1}px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#0F172A';
    ctx.strokeText(line1, 56, 540, maxW);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(line1, 56, 540, maxW);
    ctx.restore();

    const f2 = fitFontSize(ctx, line2, maxW, 88, 44);
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${f2}px "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#E11D48';
    ctx.strokeText(line2, 56, 636, maxW);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#0F172A';
    ctx.strokeText(line2, 56, 636, maxW);
    ctx.fillStyle = '#FACC15';
    ctx.fillText(line2, 56, 636, maxW);
    ctx.restore();
  }
}

/**
 * Generates and downloads a full-resolution PNG (1080x1920 or 1280x720).
 */
export async function exportThumbnailPng(
  dimensions: ThumbnailDimensions,
  draft: ThumbnailDraft,
  filenamePrefix = 'jollaman-thumbnail'
): Promise<void> {
  const offscreen = document.createElement('canvas');
  await renderThumbnailCanvas(offscreen, dimensions, draft);

  return new Promise((resolve, reject) => {
    offscreen.toBlob((blob) => {
      if (!blob) {
        reject(new Error('PNG 생성 실패'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filenamePrefix}-${dimensions}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      resolve();
    }, 'image/png');
  });
}
