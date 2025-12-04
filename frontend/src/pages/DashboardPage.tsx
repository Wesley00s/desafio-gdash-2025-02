import { Loader2 } from 'lucide-react';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { HistoryTable } from '@/components/dashboard/HistoryTable';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { Header } from '@/components/dashboard/Header';
import { useWeather } from '@/hooks/useWeather';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
   const navigate = useNavigate();
   const {
      logs,
      insight,
      loading,
      downloadCsv,
      downloadExcel,
      meta,
      setPage,
      setDateFilter,
      refresh
   } = useWeather();

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };

   if (loading) {
      return (
         <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 mt-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p>Carregando dados climáticos...</p>
         </div>
      );
   }

   return (
      <div className="space-y-8">
         <Header
            onDownloadCsv={downloadCsv}
            onDownloadExcel={downloadExcel}
            onLogout={handleLogout}
         />
         {insight && <InsightCard insight={insight} />}
         <MetricsGrid logs={logs} />
         <HistoryTable
            logs={logs}
            meta={meta}
            onPageChange={setPage}
            onFilterChange={setDateFilter}
            onRefresh={refresh}
            loading={loading}
         />
      </div>
   );
}
