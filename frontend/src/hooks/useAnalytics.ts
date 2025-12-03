import { useState, useEffect } from 'react';
import type { WeatherLog } from '@/types/WeatherLog';
import { WeatherService } from '@/services/weather.service';

export function useAnalytics() {
   const [chartData, setChartData] = useState<WeatherLog[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadData();
   }, []);

   const loadData = async () => {
      try {
         setLoading(true);
         const data = await WeatherService.getChartData(50);
         setChartData(data);
      } catch (error) {
         console.error('Erro ao carregar dados do gráfico', error);
      } finally {
         setLoading(false);
      }
   };

   return { chartData, loading, refresh: loadData };
}
