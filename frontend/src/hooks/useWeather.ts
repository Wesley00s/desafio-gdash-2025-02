import { useState, useEffect, useCallback } from 'react';
import type { WeatherLog } from '@/types/WeatherLog';
import type { Insight } from '@/types/Insight';
import { WeatherService } from '@/services/weather.service';
import type { PaginationMeta } from '@/types/PaginationMeta';
import type { FindWeatherParams } from '@/types/FindWeatherParams';

export function useWeather() {
   const [logs, setLogs] = useState<WeatherLog[]>([]);
   const [insight, setInsight] = useState<Insight | null>(null);
   const [meta, setMeta] = useState<PaginationMeta | null>(null);
   const [filters, setFilters] = useState<FindWeatherParams>({
      page: 1,
      limit: 10,
   });

   const [loading, setLoading] = useState(true);

   const loadData = useCallback(async () => {
      try {
         setLoading(true);

         const [logsResponse, insightData] = await Promise.all([
            WeatherService.getLogs(filters),
            WeatherService.getInsight(),
         ]);

         setLogs(logsResponse.data);
         setMeta(logsResponse.meta);

         setInsight(insightData);
      } catch (error) {
         console.error('Erro ao carregar dados', error);
      } finally {
         setLoading(false);
      }
   }, [filters]);
   useEffect(() => {
      loadData();
   }, [loadData]);

   const setPage = (page: number) => {
      setFilters((prev) => ({ ...prev, page }));
   };

   const setDateFilter = (startDate?: string, endDate?: string) => {
      setFilters((prev) => ({
         ...prev,
         startDate,
         endDate,
         page: 1,
      }));
   };

   return {
      logs,
      insight,
      meta,
      loading,
      refresh: loadData,
      setPage,
      setDateFilter,
      downloadCsv: WeatherService.downloadCsv,
      downloadExcel: WeatherService.downloadExcel,
   };
}
