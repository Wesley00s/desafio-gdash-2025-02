import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Loader2} from "lucide-react";
import {AuthService} from "@/services/auth.service.ts";

export function ProtectedLayout() {
   const [isVerifying, setIsVerifying] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const checkAuth = async () => {
         const isValid = await AuthService.verifyToken();

         if (!isValid) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_email');
            setIsAuthenticated(false);
         } else {
            setIsAuthenticated(true);
         }

         setIsVerifying(false);
      };

      checkAuth();
   }, []);

   if (isVerifying) {
      return (
         <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500"/>
         </div>
      );
   }

   if (!isAuthenticated) {
      return <Navigate to="/login" replace/>;
   }

   return (
      <div className="min-h-screen bg-slate-50 p-8">
         <div className="max-w-6xl mx-auto">
            <Outlet/>
         </div>
      </div>
   );
}
