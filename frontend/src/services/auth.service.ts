import axios from 'axios';
import type { LoginCredentials } from '@/types/LoginCredentials';
import type { AuthResponse } from '@/types/AuthResponse';
import type { RegisterCredentials } from '@/types/RegisterCredentials';
import type { UserProfile } from '@/types/UserProfile';
import type { UpdateUserData } from '@/types/UpdateUserData';

const API_URL = 'http://localhost:3000';

export const AuthService = {
   login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await axios.post<AuthResponse>(
         `${API_URL}/auth/login`,
         credentials,
      );
      return response.data;
   },

   register: async (data: RegisterCredentials): Promise<void> => {
      await axios.post(`${API_URL}/users`, data);
   },

   getProfile: async (email: string): Promise<UserProfile> => {
      const response = await axios.get<UserProfile>(
         `${API_URL}/users/profile?email=${email}`,
      );
      return response.data;
   },

   deleteAccount: async (userId: string): Promise<void> => {
      await axios.delete(`${API_URL}/users/${userId}`);
   },

   updateProfile: async (
      id: string,
      data: UpdateUserData,
   ): Promise<UserProfile> => {
      const response = await axios.patch<UserProfile>(
         `${API_URL}/users/${id}`,
         data,
      );
      return response.data;
   },

   verifyToken: async (): Promise<boolean> => {
      const token = localStorage.getItem('token');
      if (!token) return false;

      try {
         await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
         });
         return true;
      } catch (error) {
         return false;
      }
   },
};
