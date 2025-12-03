import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from 'recharts';
import { formatTime } from '@/util/formatTime';
import type { WeatherLog } from '@/types/WeatherLog';
import type { LucideIcon } from 'lucide-react';

interface Props {
   data: WeatherLog[];
   title: string;
   dataKey: keyof WeatherLog;
   icon: LucideIcon;
   color: string;
   unit: string;
}

export function MetricsChart({
   data,
   title,
   dataKey,
   icon: Icon,
   color,
   unit,
}: Props) {
   const gradientId = `color-${dataKey}`;

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4" style={{ color: color }} />
         </CardHeader>
         <CardContent className="pb-4">
            <div className="h-[250px] mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                     data={data}
                     margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                     <defs>
                        <linearGradient
                           id={gradientId}
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="5%"
                              stopColor={color}
                              stopOpacity={0.8}
                           />
                           <stop
                              offset="95%"
                              stopColor={color}
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
                        unit={unit}
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
                        dataKey={dataKey}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#${gradientId})`}
                        name={title}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   );
}
