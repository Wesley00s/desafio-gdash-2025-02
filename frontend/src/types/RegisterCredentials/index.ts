import type { LoginCredentials } from '@/types/LoginCredentials';

export interface RegisterCredentials extends LoginCredentials {
   name: string;
}
