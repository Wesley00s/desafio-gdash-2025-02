import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/layouts/ProtectedLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { AsteroidsPage } from '@/pages/AsteroidsPage';

export const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/register',
      element: <RegisterPage />,
   },

   {
      path: '/',
      element: <ProtectedLayout />,
      children: [
         {
            index: true,
            element: <DashboardPage />,
         },
         {
            path: 'analytics',
            element: <AnalyticsPage />,
         },
         {
            path: 'discover',
            element: <AsteroidsPage />,
         },
         {
            path: 'profile',
            element: <ProfilePage />,
         },
      ],
   },
   {
      path: '*',
      element: <Navigate to="/login" replace />,
   },
]);
