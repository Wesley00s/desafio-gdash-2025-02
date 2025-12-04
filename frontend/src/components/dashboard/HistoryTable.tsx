import {useState} from 'react';
import type {WeatherLog} from '@/types/WeatherLog';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {
   Table,
   TableRow,
   TableBody,
   TableCell,
   TableHeader,
   TableHead,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
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
   RefreshCw,
   Info
} from 'lucide-react';
import {formatDate} from '@/util/formatDate';
import type {PaginationMeta} from "@/types/PaginationMeta";


interface Props {
   logs: WeatherLog[];
   meta: PaginationMeta | null;
   onPageChange: (page: number) => void;
   onFilterChange: (startDate: string, endDate: string) => void;
   onRefresh: () => void;
   loading?: boolean;
}

export function HistoryTable({
  logs,
  meta,
  onPageChange,
  onFilterChange,
  onRefresh, loading = false,
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
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
               <div>
                  <CardTitle className="text-xl">Histórico de Coleta</CardTitle>

                  <div
                     className="mt-2 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-md border border-blue-100 w-fit">
                     <Info className="h-3.5 w-3.5"/>
                     <span>
                        Dados coletados automaticamente a cada <strong>5 minutos</strong> (Fonte: Open-Meteo).
                     </span>
                  </div>
               </div>

               {meta && (
                  <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start">
                     Total: {meta.total}
                  </span>
               )}
            </div>
         </CardHeader>
         <CardContent>

            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm backdrop-blur-sm">
               <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                     <div className="space-y-2">
                        <span
                           className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                           <CalendarClock className="h-3.5 w-3.5"/>
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
                        <span
                           className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                           <CalendarClock className="h-3.5 w-3.5"/>
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
                        className="w-full bg-slate-900 shadow-md hover:bg-slate-800 sm:w-auto"
                     >
                        <Filter className="mr-2 h-4 w-4"/>
                        Filtrar
                     </Button>

                     <Button
                        variant="secondary"
                        onClick={onRefresh}
                        disabled={loading}
                        className="w-full border shadow-sm sm:w-auto"
                        title="Recarregar dados"
                     >
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}/>
                        Atualizar
                     </Button>

                     {(dateStart || dateEnd) && (
                        <Button
                           variant="outline"
                           onClick={clearFilter}
                           className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
                        >
                           <X className="mr-2 h-4 w-4"/>
                           Limpar
                        </Button>
                     )}
                  </div>
               </div>
            </div>

            {loading && (
               <div className="py-12 flex flex-col items-center justify-center text-blue-500 gap-2">
                  <Loader2 className="h-8 w-8 animate-spin"/>
                  <span className="text-sm text-slate-400">Atualizando registros...</span>
               </div>
            )}

            {!loading && logs.length === 0 ? (
               <div className="text-center py-12 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
                  <p className="text-slate-500">Nenhum registro encontrado para os filtros selecionados.</p>
                  {(dateStart || dateEnd) && (
                     <Button variant="link" onClick={clearFilter} className="mt-2">
                        Limpar filtros
                     </Button>
                  )}
               </div>
            ) : (
               !loading && (
                  <>
                     <div className="hidden md:block rounded-md border mb-4 shadow-sm overflow-hidden">
                        <Table>
                           <TableHeader className="bg-slate-50">
                              <TableRow>
                                 <TableHead>Data/Hora</TableHead>
                                 <TableHead>Temperatura</TableHead>
                                 <TableHead>Umidade</TableHead>
                                 <TableHead>Vento</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {logs.map((log) => (
                                 <TableRow key={log._id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-medium text-slate-700">
                                       {formatDate(log.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                       <span
                                          className="inline-flex items-center gap-1 font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs">
                                          <Thermometer className="h-3 w-3"/>
                                          {log.temperature}°C
                                       </span>
                                    </TableCell>
                                    <TableCell>
                                       <span
                                          className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                                          <CloudRain className="h-3 w-3"/>
                                          {log.humidity}%
                                       </span>
                                    </TableCell>
                                    <TableCell>
                                       <span
                                          className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                                          <Wind className="h-3 w-3"/>
                                          {log.wind_speed} km/h
                                       </span>
                                    </TableCell>
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
                                    {formatDate(log.createdAt).split(',')[0]}
                                 </span>
                                 <span className="text-xs text-slate-500">
                                    {formatDate(log.createdAt).split(',')[1]}
                                 </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-center">
                                 <div
                                    className="flex flex-col items-center justify-center p-2 bg-orange-50 rounded-md border border-orange-100">
                                    <Thermometer className="h-4 w-4 text-orange-500 mb-1"/>
                                    <span className="font-bold text-slate-700">
                                       {log.temperature}°
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase">
                                       Temp
                                    </span>
                                 </div>
                                 <div
                                    className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-md border border-blue-100">
                                    <CloudRain className="h-4 w-4 text-blue-500 mb-1"/>
                                    <span className="font-bold text-slate-700">
                                       {log.humidity}%
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase">
                                       Umid
                                    </span>
                                 </div>
                                 <div
                                    className="flex flex-col items-center justify-center p-2 bg-green-50 rounded-md border border-green-100">
                                    <Wind className="h-4 w-4 text-green-500 mb-1"/>
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
               <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handlePrevious}
                     disabled={loading || meta.page <= 1}
                     className="h-8 w-8 p-0"
                  >
                     <ChevronLeft className="h-4 w-4"/>
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
                     <ChevronRight className="h-4 w-4"/>
                  </Button>
               </div>
            )}
         </CardContent>
      </Card>
   );
}
