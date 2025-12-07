import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Loader2,
   Rocket,
   ChevronLeft,
   ChevronRight,
   ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNasa } from '@/hooks/useNasa';
import { AsteroidCard } from '@/components/AsteroidCard';

export function AsteroidsPage() {
   const navigate = useNavigate();
   const { data, loading, page, nextPage, prevPage } = useNasa();

   const [clickedButton, setClickedButton] = useState<'prev' | 'next' | null>(
      null,
   );

   const handlePrev = () => {
      setClickedButton('prev');
      prevPage();
   };

   const handleNext = () => {
      setClickedButton('next');
      nextPage();
   };

   if (loading && !data) {
      return (
         <div className="h-screen flex items-center justify-center text-purple-600">
            <Loader2 className="h-10 w-10 animate-spin" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div>
            <Button
               variant="ghost"
               className="gap-2 pl-0 text-slate-500 hover:text-slate-900"
               onClick={() => navigate('/')}
            >
               <ArrowLeft className="h-4 w-4" />
               Voltar ao Dashboard
            </Button>
         </div>

         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
               <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                  <Rocket className="h-8 w-8 text-purple-600" />
                  Monitoramento Espacial
               </h1>
               <p className="text-slate-500">
                  Objetos próximos à Terra (Fonte: NASA NeoWs)
               </p>
            </div>

            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={page === 0 || loading}
                  className="w-10 px-0"
               >
                  {loading && clickedButton === 'prev' ? (
                     <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  ) : (
                     <ChevronLeft className="h-4 w-4" />
                  )}
               </Button>

               <span className="text-sm font-medium w-24 text-center tabular-nums text-slate-600">
                  {loading ? (
                     <span className="animate-pulse">Carregando...</span>
                  ) : (
                     `Página ${page + 1}`
                  )}
               </span>

               <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={loading}
                  className="w-10 px-0"
               >
                  {loading && clickedButton === 'next' ? (
                     <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  ) : (
                     <ChevronRight className="h-4 w-4" />
                  )}
               </Button>
            </div>
         </div>

         <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
         >
            {data?.near_earth_objects.map((asteroid) => (
               <AsteroidCard key={asteroid.id} asteroid={asteroid} />
            ))}
         </div>
      </div>
   );
}
