import { useState } from 'react';
import type { WeatherLog } from '@/types/WeatherLog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
   Table,
   TableRow,
   TableBody,
   TableCell,
   TableHeader,
   TableHead,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   CloudRain,
   Thermometer,
   Wind,
   ChevronLeft,
   ChevronRight,
   Loader2,
   Filter,
   X,
   CalendarClock,
} from 'lucide-react';
import { formatDate } from '@/util/formatDate.ts';
import type { PaginationMeta } from '@/types/PaginationMeta';

interface Props {
   logs: WeatherLog[];
   meta: PaginationMeta | null;
   onPageChange: (page: number) => void;
   onFilterChange: (startDate: string, endDate: string) => void;
   loading?: boolean;
}

export function HistoryTable({
   logs,
   meta,
   onPageChange,
   onFilterChange,
   loading = false,
}: Props) {
   const [dateStart, setDateStart] = useState('');
   const [dateEnd, setDateEnd] = useState('');

   const handlePrevious = () => {
      if (meta && meta.page > 1) {
         onPageChange(meta.page - 1);
      }
   };

   const handleNext = () => {
      if (meta && meta.page < meta.lastPage) {
         onPageChange(meta.page + 1);
      }
   };

   const applyFilter = () => {
      const startISO = dateStart ? new Date(dateStart).toISOString() : '';
      const endISO = dateEnd ? new Date(dateEnd).toISOString() : '';
      onFilterChange(startISO, endISO);
   };

   const clearFilter = () => {
      setDateStart('');
      setDateEnd('');
      onFilterChange('', '');
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex flex-col md:flex-row justify-between md:items-center gap-2">
               <span>Histórico de Coleta</span>
               {meta && (
                  <span className="text-sm font-normal text-slate-500">
                     Total: {meta.total} registros
                  </span>
               )}
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm backdrop-blur-sm">
               <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                     <div className="space-y-2">
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                           <CalendarClock className="h-3.5 w-3.5" />
                           Início
                        </span>
                        <Input
                           type="datetime-local"
                           value={dateStart}
                           onChange={(e) => setDateStart(e.target.value)}
                           className="border-slate-200 bg-white transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                     </div>

                     <div className="space-y-2">
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                           <CalendarClock className="h-3.5 w-3.5" />
                           Fim
                        </span>
                        <Input
                           type="datetime-local"
                           value={dateEnd}
                           onChange={(e) => setDateEnd(e.target.value)}
                           className="border-slate-200 bg-white transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:w-auto">
                     <Button
                        onClick={applyFilter}
                        className="w-full bg-slate-900 shadow-md hover:bg-slate-800 sm:w-auto lg:min-w-[120px]"
                     >
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrar
                     </Button>

                     {(dateStart || dateEnd) && (
                        <Button
                           variant="outline"
                           onClick={clearFilter}
                           className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
                        >
                           <X className="mr-2 h-4 w-4" />
                           Limpar
                        </Button>
                     )}
                  </div>
               </div>
            </div>
            {loading && (
               <div className="py-8 flex justify-center text-blue-500">
                  <Loader2 className="animate-spin" />
               </div>
            )}

            {!loading && logs.length === 0 ? (
               <div className="text-center py-10 text-slate-500">
                  Nenhum registro encontrado.
               </div>
            ) : (
               !loading && (
                  <>
                     <div className="hidden md:block rounded-md border mb-4">
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Data/Hora</TableHead>
                                 <TableHead>Temperatura</TableHead>
                                 <TableHead>Umidade</TableHead>
                                 <TableHead>Vento</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {logs.map((log) => (
                                 <TableRow key={log._id}>
                                    <TableCell className="font-medium">
                                       {formatDate(log.timestamp)}
                                    </TableCell>
                                    <TableCell>
                                       <span className="inline-flex items-center gap-1">
                                          {log.temperature}°C
                                       </span>
                                    </TableCell>
                                    <TableCell>{log.humidity}%</TableCell>
                                    <TableCell>{log.wind_speed} km/h</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </div>

                     <div className="md:hidden space-y-4 mb-4">
                        {logs.map((log) => (
                           <div
                              key={log._id}
                              className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-3"
                           >
                              <div className="flex justify-between items-center border-b pb-2">
                                 <span className="text-sm font-semibold text-slate-700">
                                    {formatDate(log.timestamp).split(',')[0]}
                                 </span>
                                 <span className="text-xs text-slate-500">
                                    {formatDate(log.timestamp).split(',')[1]}
                                 </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-center">
                                 <div className="flex flex-col items-center justify-center p-2 bg-orange-50 rounded-md">
                                    <Thermometer className="h-4 w-4 text-orange-500 mb-1" />
                                    <span className="font-bold text-slate-700">
                                       {log.temperature}°
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase">
                                       Temp
                                    </span>
                                 </div>
                                 <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-md">
                                    <CloudRain className="h-4 w-4 text-blue-500 mb-1" />
                                    <span className="font-bold text-slate-700">
                                       {log.humidity}%
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase">
                                       Umid
                                    </span>
                                 </div>
                                 <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-md">
                                    <Wind className="h-4 w-4 text-green-500 mb-1" />
                                    <span className="font-bold text-slate-700">
                                       {log.wind_speed}
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase">
                                       Vento
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </>
               )
            )}

            {meta && meta.lastPage > 1 && (
               <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handlePrevious}
                     disabled={loading || meta.page <= 1}
                     className="h-8 w-8 p-0"
                  >
                     <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="text-sm text-slate-600 font-medium">
                     Página {meta.page} de {meta.lastPage}
                  </div>

                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handleNext}
                     disabled={loading || meta.page >= meta.lastPage}
                     className="h-8 w-8 p-0"
                  >
                     <ChevronRight className="h-4 w-4" />
                  </Button>
               </div>
            )}
         </CardContent>
      </Card>
   );
}
