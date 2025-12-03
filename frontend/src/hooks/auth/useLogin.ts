import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '@/types/LoginCredentials';
import { AuthService } from '@/services/auth.service.ts';
import * as React from 'react';
import axios from 'axios';
import type { NestErrorResponse } from '@/types/NestErrorResponse';

export function useLogin() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState<LoginCredentials>({
      email: '',
      password: '',
   });

   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
   };

   const submitLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
         const data = await AuthService.login(formData);
         localStorage.setItem('token', data.access_token);
         localStorage.setItem('user_email', data.user.email);
         navigate('/');
      } catch (err) {
         let msg = 'Email ou senha inválidos.';

         if (axios.isAxiosError(err)) {
            const errorData = err.response?.data as NestErrorResponse;
            if (errorData?.message) {
               msg = Array.isArray(errorData.message)
                  ? errorData.message[0]
                  : errorData.message;
            }
         } else if (err instanceof Error) {
            msg = err.message;
         }

         setError(msg);
      } finally {
         setLoading(false);
      }
   };

   return {
      formData,
      handleChange,
      submitLogin,
      loading,
      error,
   };
}
