import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from 'recharts';
import type { WeatherLog } from '@/types/WeatherLog';
import { formatTime } from '@/util/formatTime.ts';

interface Props {
   data: WeatherLog[];
}

export function TemperatureChart({ data }: Props) {
   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
               Tendência de Temperatura
            </CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
         </CardHeader>
         <CardContent className="pb-4">
            <div className="h-[250px] mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                     data={data}
                     margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                     {/* Gradiente de cor para a área */}
                     <defs>
                        <linearGradient
                           id="colorTemp"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="5%"
                              stopColor="#f97316"
                              stopOpacity={0.8}
                           />
                           <stop
                              offset="95%"
                              stopColor="#f97316"
                              stopOpacity={0}
                           />
                        </linearGradient>
                     </defs>
                     <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                     />
                     <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatTime}
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                     />
                     <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        unit="°C"
                        domain={['auto', 'auto']}
                     />
                     <Tooltip
                        labelFormatter={(label) => formatTime(label as string)}
                        contentStyle={{
                           borderRadius: '8px',
                           border: 'none',
                           boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                     />
                     <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        fillOpacity={1}
                        fill="url(#colorTemp)"
                        name="Temperatura"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   );
}
