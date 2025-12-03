import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import type { RegisterCredentials } from '@/types/RegisterCredentials';
import { AuthService } from '@/services/auth.service.ts';
import axios from 'axios';
import type { NestErrorResponse } from '@/types/NestErrorResponse';

export function useRegister() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState<RegisterCredentials>({
      name: '',
      email: '',
      password: '',
   });

   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [loading, setLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
   };

   const submitRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess('');

      try {
         await AuthService.register(formData);

         setSuccess('Conta criada com sucesso!');
         setFormData({ name: '', email: '', password: '' });

         setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
         let msg = 'Erro ao criar conta.';

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
      submitRegister,
      loading,
      error,
      success,
      navigate,
   };
}
