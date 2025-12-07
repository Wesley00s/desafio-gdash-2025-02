import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   Download,
   FileSpreadsheet,
   FileText,
   LogOut,
   User,
   LineChart,
   LayoutDashboard,
   Rocket,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AboutModal } from './AboutModal';

interface HeaderProps {
   onDownloadCsv: () => void;
   onDownloadExcel: () => void;
   onLogout: () => void;
   hideExports?: boolean;
}

export function Header({
   onDownloadCsv,
   onDownloadExcel,
   onLogout,
   hideExports = false,
}: HeaderProps) {
   const navigate = useNavigate();
   const location = useLocation();

   const isAnalyticsPage = location.pathname === '/analytics';
   const isDashboard = location.pathname === '/';

   return (
      <header className="flex flex-col gap-6 border-b bg-white/50 pb-6 pt-2 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
         <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl flex items-center gap-2">
               GDASH Weather <span className="text-blue-500">Monitor</span>
            </h1>
            <p className="text-sm text-slate-500">
               Monitoramento climático em tempo real
            </p>
         </div>

         <div className="flex flex-wrap items-center gap-2">
            {!isDashboard && (
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="gap-2"
               >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
               </Button>
            )}

            {!isAnalyticsPage && (
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/analytics')}
                  className="gap-2"
               >
                  <LineChart className="h-4 w-4" />
                  Gráficos
               </Button>
            )}

            {!hideExports && (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem
                        onClick={onDownloadCsv}
                        className="cursor-pointer"
                     >
                        <FileText className="mr-2 h-4 w-4 text-blue-600" />
                        CSV
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={onDownloadExcel}
                        className="cursor-pointer"
                     >
                        <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                        Excel
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )}
            <Button
               variant="outline"
               size="sm"
               onClick={() => navigate('/discover')}
               className="gap-2 border shadow-sm"
            >
               <Rocket className="h-4 w-4" />
               Descubra
            </Button>
            <AboutModal />
            <div className="mx-1 h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/profile')}
                  title="Meu Perfil"
                  className={
                     location.pathname === '/profile' ? 'bg-slate-100' : ''
                  }
               >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Perfil</span>
               </Button>

               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                  title="Sair do sistema"
               >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sair</span>
               </Button>
            </div>
         </div>
      </header>
   );
}
