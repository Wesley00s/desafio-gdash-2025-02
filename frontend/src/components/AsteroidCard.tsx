import type { Asteroid } from '@/types/Asteroid';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { AlertTriangle } from 'lucide-react';

export function AsteroidCard({ asteroid }: { asteroid: Asteroid }) {
   const formatKm = (val: number) =>
      val.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' km';

   const formatSpeed = (val: string) =>
      parseFloat(val).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) +
      ' km/h';

   const name = asteroid.name.replace(/[()]/g, '');
   return (
      <Card className="hover:shadow-lg transition-shadow border-slate-200 flex flex-col justify-between">
         <CardHeader className="pb-2">
            <div className="flex justify-between items-start gap-2">
               <CardTitle
                  className="text-lg font-bold text-slate-700 truncate"
                  title={name}
               >
                  {name}
               </CardTitle>

               {asteroid.is_potentially_hazardous_asteroid ? (
                  <Badge variant="destructive" className="shrink-0 flex gap-1">
                     <AlertTriangle className="h-3 w-3" /> Perigo
                  </Badge>
               ) : (
                  <Badge
                     variant="secondary"
                     className="shrink-0 bg-green-100 text-green-700 hover:bg-green-200"
                  >
                     Seguro
                  </Badge>
               )}
            </div>
         </CardHeader>

         <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between border-b border-slate-100 pb-2">
               <span>Diâmetro Máx:</span>
               <span className="font-semibold text-slate-800">
                  {formatKm(
                     asteroid.estimated_diameter.kilometers
                        .estimated_diameter_max,
                  )}
               </span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
               <span>Aproximação:</span>
               <span className="font-semibold text-slate-800">
                  {asteroid.close_approach_data[0]?.close_approach_date}
               </span>
            </div>
            <div className="flex justify-between">
               <span>Velocidade:</span>
               <span className="font-semibold text-slate-800">
                  {formatSpeed(
                     asteroid.close_approach_data[0]?.relative_velocity
                        .kilometers_per_hour,
                  )}
               </span>
            </div>
         </CardContent>

         <CardFooter className="pt-0 text-xs text-slate-400 justify-end">
            ID: {asteroid.id}
         </CardFooter>
      </Card>
   );
}
