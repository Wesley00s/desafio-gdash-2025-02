import axios from 'axios';
import type { NasaResponse } from '@/types/Nasa';

const API_URL = 'http://localhost:3000/nasa';

export const NasaService = {
   getAsteroids: async (page: number = 0): Promise<NasaResponse> => {
      const token = localStorage.getItem('token');

      const response = await axios.get<NasaResponse>(`${API_URL}/asteroids`, {
         params: { page },
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data;
   },
};
