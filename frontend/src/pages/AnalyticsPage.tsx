import { useAnalytics } from '@/hooks/useAnalytics';
import { Header } from '@/components/dashboard/Header';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { MetricsChart } from '@/components/charts/MetricsChart';
import { Loader2, CloudRain, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AnalyticsPage() {
   const navigate = useNavigate();
   const { chartData, loading } = useAnalytics();

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };
   const doNothing = () => {};

   if (loading) {
      return (
         <div className="h-screen flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p>Carregando gráficos...</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-slate-50">
         <div className="max-w-6xl mx-auto space-y-8">
            <Header
               onDownloadCsv={doNothing}
               onDownloadExcel={doNothing}
               onLogout={handleLogout}
               hideExports={true}
            />

            <div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Análise Gráfica
               </h2>
               <p className="text-slate-500 mb-6">
                  Visualização dos últimos 50 registros.
               </p>

               {chartData.length === 0 ? (
                  <div className="p-10 text-center border rounded-md bg-white text-slate-500">
                     Sem dados suficientes para gerar gráficos.
                  </div>
               ) : (
                  <div className="grid grid-cols-1 gap-6">
                     <TemperatureChart data={chartData} />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MetricsChart
                           data={chartData}
                           title="Umidade Relativa"
                           dataKey="humidity"
                           icon={CloudRain}
                           color="#3b82f6"
                           unit="%"
                        />
                        <MetricsChart
                           data={chartData}
                           title="Velocidade do Vento"
                           dataKey="wind_speed"
                           icon={Wind}
                           color="#22c55e"
                           unit=" km/h"
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
