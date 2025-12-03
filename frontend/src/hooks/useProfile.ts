import { useState, useEffect } from 'react';
import type { UserProfile } from '@/types/UserProfile';
import { AuthService } from '@/services/auth.service.ts';
import { useNavigate } from 'react-router-dom';
import type { UpdateUserData } from '@/types/UpdateUserData';

export function useProfile() {
   const [user, setUser] = useState<UserProfile | null>(null);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      loadProfile();
   }, []);

   const loadProfile = async () => {
      try {
         const email = localStorage.getItem('user_email');
         if (email) {
            const data = await AuthService.getProfile(email);
            setUser(data);
         }
      } catch (error) {
         console.error('Erro ao carregar perfil', error);
      } finally {
         setLoading(false);
      }
   };

   const deleteAccount = async () => {
      if (!user?._id) return;
      try {
         setLoading(true);
         await AuthService.deleteAccount(user._id);

         localStorage.removeItem('token');
         localStorage.removeItem('user_email');
         navigate('/login');
      } catch (error) {
         console.error('Erro ao deletar conta', error);
         alert('Erro ao deletar conta. Tente novamente.');
         setLoading(false);
      }
   };

   const updateAccount = async (data: UpdateUserData) => {
      if (!user?._id) return;
      try {
         setLoading(true);
         const updatedUser = await AuthService.updateProfile(user._id, data);
         setUser(updatedUser);
         alert('Perfil atualizado com sucesso!');
      } catch (error) {
         console.error('Erro ao atualizar', error);
         alert('Erro ao atualizar perfil.');
      } finally {
         setLoading(false);
      }
   };

   return { user, loading, deleteAccount, updateAccount };
}
