import type { PaginationMeta } from '@/types/PaginationMeta';

export interface PaginatedResponse<T> {
   data: T[];
   meta: PaginationMeta;
}
