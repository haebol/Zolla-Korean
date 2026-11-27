import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_VOICES = new Set(['Kore', 'Zephyr', 'Puck']);

const VOICE_STYLES: Record<string, string> = {
  Kore: 'Warm, clear, gentle Korean elementary school teacher pronouncing Hangul distinctly for children and learners.',
  Zephyr: 'Bright, cheerful, lively Korean kids show host pronouncing Hangul with upbeat clarity.',
  Puck: 'Playful, energetic young Korean boy character pronouncing Hangul enthusiastically and clearly.',
};

// Server-side in-memory cache so repeated/looped requests for the same text+voice consume 0 extra Gemini quota
const ttsCache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 250;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: 'v1beta',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '64kb' }));

  app.post('/api/tts', async (req, res) => {
    try {
      const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
      const rawVoice = typeof req.body?.voiceName === 'string' ? req.body.voiceName.trim() : 'Kore';

      if (!rawText || rawText.length > 120) {
        return res.status(400).json({ error: '유효하지 않은 음성 텍스트입니다. (1~120자)' });
      }

      if (!ALLOWED_VOICES.has(rawVoice)) {
        return res.status(400).json({ error: '지원하지 않는 AI 성우입니다. (Kore, Zephyr, Puck만 가능)' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: '서버에 GEMINI_API_KEY가 설정되어 있지 않습니다.' });
      }

      const cacheKey = `${rawVoice}::${rawText}`;
      const cached = ttsCache.get(cacheKey);
      if (cached) {
        return res.json({ audioBase64: cached, mimeType: 'audio/wav', cached: true });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: rawText,
                speechMetadata: {
                  style: VOICE_STYLES[rawVoice] || VOICE_STYLES.Kore,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: rawVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(502).json({ error: 'AI 음성 데이터를 생성하지 못했습니다.' });
      }

      if (ttsCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = ttsCache.keys().next().value;
        if (oldestKey) ttsCache.delete(oldestKey);
      }
      ttsCache.set(cacheKey, base64Audio);

      return res.json({ audioBase64: base64Audio, mimeType: 'audio/wav', cached: false });
    } catch (err: unknown) {
      const anyErr = err as { status?: number; message?: string };
      const status = typeof anyErr?.status === 'number' && anyErr.status >= 400 ? anyErr.status : 500;
      const msg = anyErr?.message || 'AI 음성 생성 중 오류가 발생했습니다.';
      const isQuota = status === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');

      return res.status(isQuota ? 429 : status).json({
        error: isQuota
          ? 'Gemini 무료 등급 일일 요청 한도(429)에 도달했습니다. (기존 캐시된 음성은 계속 재생되며, 새 음성은 기기 음성으로 대체됩니다)'
          : msg,
        code: isQuota ? 'RESOURCE_EXHAUSTED' : 'TTS_ERROR',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
