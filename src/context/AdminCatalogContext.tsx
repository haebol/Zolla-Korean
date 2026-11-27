import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SERIES_CATALOG, SeriesId, SeriesMeta } from '../constants/seriesCatalog';

const ADMIN_CATALOG_STORAGE_KEY = 'haebol_admin_catalog_v1';

export interface AdminCatalogConfig {
  seriesOrder: SeriesId[];
  itemOrderBySeries: Partial<Record<SeriesId, string[]>>;
}

const DEFAULT_SERIES_ORDER: SeriesId[] = SERIES_CATALOG.map((s) => s.id);
const VALID_SERIES_SET = new Set<SeriesId>(DEFAULT_SERIES_ORDER);

function normalizeSeriesOrder(raw?: unknown): SeriesId[] {
  if (!Array.isArray(raw)) return [...DEFAULT_SERIES_ORDER];
  const seen = new Set<SeriesId>();
  const result: SeriesId[] = [];
  for (const item of raw) {
    if (typeof item === 'string' && VALID_SERIES_SET.has(item as SeriesId) && !seen.has(item as SeriesId)) {
      const id = item as SeriesId;
      seen.add(id);
      result.push(id);
    }
  }
  for (const id of DEFAULT_SERIES_ORDER) {
    if (!seen.has(id)) {
      result.push(id);
    }
  }
  return result;
}

function normalizeItemOrders(raw?: unknown): Partial<Record<SeriesId, string[]>> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const result: Partial<Record<SeriesId, string[]>> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!VALID_SERIES_SET.has(k as SeriesId) || !Array.isArray(v)) continue;
    const keys = Array.from(new Set(v.filter((x): x is string => typeof x === 'string' && x.length > 0)));
    if (keys.length > 0) {
      result[k as SeriesId] = keys;
    }
  }
  return result;
}

function loadInitialConfig(): AdminCatalogConfig {
  try {
    const saved = window.localStorage.getItem(ADMIN_CATALOG_STORAGE_KEY);
    if (!saved) {
      return {
        seriesOrder: [...DEFAULT_SERIES_ORDER],
        itemOrderBySeries: {},
      };
    }
    const parsed = JSON.parse(saved) as Partial<AdminCatalogConfig>;
    return {
      seriesOrder: normalizeSeriesOrder(parsed.seriesOrder),
      itemOrderBySeries: normalizeItemOrders(parsed.itemOrderBySeries),
    };
  } catch {
    return {
      seriesOrder: [...DEFAULT_SERIES_ORDER],
      itemOrderBySeries: {},
    };
  }
}

export interface AdminCatalogContextValue {
  seriesOrder: SeriesId[];
  itemOrderBySeries: Partial<Record<SeriesId, string[]>>;
  orderedSeries: SeriesMeta[];
  totalSeriesCount: number;
  currentViewSeriesId: SeriesId;
  setCurrentViewSeriesId: (id: SeriesId) => void;
  moveSeriesOrder: (id: SeriesId, direction: 'up' | 'down') => void;
  getOrderedItems: <T>(seriesId: SeriesId, items: T[], getKey: (item: T) => string) => T[];
  moveItemOrder: (seriesId: SeriesId, currentOrderedKeys: string[], key: string, direction: 'up' | 'down') => void;
  resetItemOrderForSeries: (seriesId: SeriesId) => void;
  resetAllAdminConfig: () => void;
  exportConfigJson: () => string;
  importConfigJson: (raw: string) => { ok: boolean; message: string };
}

const AdminCatalogContext = createContext<AdminCatalogContextValue | null>(null);

export const AdminCatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AdminCatalogConfig>(loadInitialConfig);
  const [currentViewSeriesId, setCurrentViewSeriesId] = useState<SeriesId>('consonants');

  useEffect(() => {
    try {
      window.localStorage.setItem(ADMIN_CATALOG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota or private-browsing errors
    }
  }, [config]);

  const seriesMetaMap = useMemo(() => {
    const map = new Map<SeriesId, SeriesMeta>();
    for (const item of SERIES_CATALOG) {
      map.set(item.id, item);
    }
    return map;
  }, []);

  const orderedSeries = useMemo(() => {
    return config.seriesOrder
      .map((id) => seriesMetaMap.get(id))
      .filter((s): s is SeriesMeta => Boolean(s));
  }, [config.seriesOrder, seriesMetaMap]);

  const moveSeriesOrder = useCallback((id: SeriesId, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const idx = prev.seriesOrder.indexOf(id);
      if (idx < 0) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.seriesOrder.length) return prev;
      const nextOrder = [...prev.seriesOrder];
      const [moved] = nextOrder.splice(idx, 1);
      nextOrder.splice(targetIdx, 0, moved);
      return {
        ...prev,
        seriesOrder: nextOrder,
      };
    });
  }, []);

  const getOrderedItems = useCallback(
    <T,>(seriesId: SeriesId, items: T[], getKey: (item: T) => string): T[] => {
      const customOrder = config.itemOrderBySeries[seriesId];
      if (!customOrder || customOrder.length === 0) return items;
      const rank = new Map<string, number>();
      customOrder.forEach((k, i) => rank.set(k, i));
      return [...items].sort((a, b) => {
        const ra = rank.get(getKey(a));
        const rb = rank.get(getKey(b));
        if (ra !== undefined && rb !== undefined) return ra - rb;
        if (ra !== undefined) return -1;
        if (rb !== undefined) return 1;
        return 0;
      });
    },
    [config.itemOrderBySeries]
  );

  const moveItemOrder = useCallback(
    (seriesId: SeriesId, currentOrderedKeys: string[], key: string, direction: 'up' | 'down') => {
      const idx = currentOrderedKeys.indexOf(key);
      if (idx < 0) return;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= currentOrderedKeys.length) return;
      const nextKeys = [...currentOrderedKeys];
      const [moved] = nextKeys.splice(idx, 1);
      nextKeys.splice(targetIdx, 0, moved);
      setConfig((prev) => ({
        ...prev,
        itemOrderBySeries: {
          ...prev.itemOrderBySeries,
          [seriesId]: nextKeys,
        },
      }));
    },
    []
  );

  const resetItemOrderForSeries = useCallback((seriesId: SeriesId) => {
    setConfig((prev) => {
      const nextMap = { ...prev.itemOrderBySeries };
      delete nextMap[seriesId];
      return {
        ...prev,
        itemOrderBySeries: nextMap,
      };
    });
  }, []);

  const resetAllAdminConfig = useCallback(() => {
    setConfig({
      seriesOrder: [...DEFAULT_SERIES_ORDER],
      itemOrderBySeries: {},
    });
  }, []);

  const exportConfigJson = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfigJson = useCallback((raw: string) => {
    try {
      const parsed = JSON.parse(raw) as Partial<AdminCatalogConfig>;
      setConfig({
        seriesOrder: normalizeSeriesOrder(parsed.seriesOrder),
        itemOrderBySeries: normalizeItemOrders(parsed.itemOrderBySeries),
      });
      return { ok: true, message: '설정을 불러왔습니다.' };
    } catch {
      return { ok: false, message: '올바른 JSON 설정 형식이 아닙니다.' };
    }
  }, []);

  const totalSeriesCount = orderedSeries.length;

  const value = useMemo<AdminCatalogContextValue>(
    () => ({
      seriesOrder: config.seriesOrder,
      itemOrderBySeries: config.itemOrderBySeries,
      orderedSeries,
      totalSeriesCount,
      currentViewSeriesId,
      setCurrentViewSeriesId,
      moveSeriesOrder,
      getOrderedItems,
      moveItemOrder,
      resetItemOrderForSeries,
      resetAllAdminConfig,
      exportConfigJson,
      importConfigJson,
    }),
    [
      config.seriesOrder,
      config.itemOrderBySeries,
      orderedSeries,
      totalSeriesCount,
      currentViewSeriesId,
      moveSeriesOrder,
      getOrderedItems,
      moveItemOrder,
      resetItemOrderForSeries,
      resetAllAdminConfig,
      exportConfigJson,
      importConfigJson,
    ]
  );

  return <AdminCatalogContext.Provider value={value}>{children}</AdminCatalogContext.Provider>;
};

export function useAdminCatalog(): AdminCatalogContextValue {
  const ctx = useContext(AdminCatalogContext);
  if (!ctx) {
    throw new Error('useAdminCatalog must be used within AdminCatalogProvider');
  }
  return ctx;
}
