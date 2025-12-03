import axios from 'axios';
import type { WeatherLog } from '@/types/WeatherLog';
import type { Insight } from '@/types/Insight';
import type { FindWeatherParams } from '@/types/FindWeatherParams';
import type { PaginatedResponse } from '@/types/PaginatedResponse';

const API_URL = 'http://localhost:3000/api/weather';

export const WeatherService = {
   getLogs: async (
      params?: FindWeatherParams,
   ): Promise<PaginatedResponse<WeatherLog>> => {
      const response = await axios.get<PaginatedResponse<WeatherLog>>(API_URL, {
         params: params,
      });
      return response.data;
   },

   getInsight: async (): Promise<Insight> => {
      const response = await axios.get<Insight>(`${API_URL}/insights`);
      return response.data;
   },

   getChartData: async (limit = 50): Promise<WeatherLog[]> => {
      const response = await axios.get<PaginatedResponse<WeatherLog>>(API_URL, {
         params: { limit, page: 1 },
      });
      return response.data.data.reverse();
   },

   downloadCsv: () => window.open(`${API_URL}/export/csv`, '_blank'),
   downloadExcel: () => window.open(`${API_URL}/export/xlsx`, '_blank'),
};
