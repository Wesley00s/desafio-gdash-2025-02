import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CloudRain, Thermometer, Wind } from 'lucide-react';
import type { WeatherLog } from '@/types/WeatherLog';

interface Props {
   logs: WeatherLog[];
}

export function MetricsGrid({ logs }: Props) {
   if (!logs || logs.length === 0) {
      return null;
   }

   const current = logs[0];

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-slate-500">
                  Temperatura
               </CardTitle>
               <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold text-slate-800">
                  {current.temperature}°C
               </div>
               <p className="text-xs text-slate-400 mt-1">Atualizado agora</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-slate-500">
                  Umidade
               </CardTitle>
               <CloudRain className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold text-slate-800">
                  {current.humidity}%
               </div>
               <p className="text-xs text-slate-400 mt-1">
                  Umidade relativa do ar
               </p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-slate-500">
                  Vento
               </CardTitle>
               <Wind className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold text-slate-800">
                  {current.wind_speed} km/h
               </div>
               <p className="text-xs text-slate-400 mt-1">
                  Velocidade do vento
               </p>
            </CardContent>
         </Card>
      </div>
   );
}
