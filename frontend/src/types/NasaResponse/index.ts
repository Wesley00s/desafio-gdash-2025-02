import type { Asteroid } from '@/types/Asteroid';

export interface NasaResponse {
   near_earth_objects: Asteroid[];
   page: {
      size: number;
      total_elements: number;
      total_pages: number;
      number: number;
   };
}
