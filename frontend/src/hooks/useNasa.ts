import { useState, useEffect, useCallback } from 'react';
import { NasaService } from '@/services/nasa.service';
import type { NasaResponse } from '@/types/NasaResponse';

export function useNasa() {
   const [data, setData] = useState<NasaResponse | null>(null);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);

   const fetchAsteroids = useCallback(async () => {
      setLoading(true);
      try {
         const response = await NasaService.getAsteroids(page);
         setData(response);
      } catch (error) {
         console.error('Erro ao buscar asteroides:', error);
      } finally {
         setLoading(false);
      }
   }, [page]);
   useEffect(() => {
      fetchAsteroids();
   }, [fetchAsteroids]);

   const nextPage = () => {
      if (data && page < data.page.total_pages - 1) {
         setPage((p) => p + 1);
      }
   };

   const prevPage = () => {
      if (page > 0) {
         setPage((p) => p - 1);
      }
   };

   return {
      data,
      loading,
      page,
      setPage,
      nextPage,
      prevPage,
      refresh: fetchAsteroids,
   };
}
