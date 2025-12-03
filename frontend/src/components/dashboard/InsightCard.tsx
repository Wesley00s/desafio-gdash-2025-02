import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Sparkles, ChevronDown } from 'lucide-react';
import type { Insight } from '@/types/Insight';
import { cn } from '@/lib/utils';

interface Props {
   insight: Insight;
}

export function InsightCard({ insight }: Props) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <Card className="border-none bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200/50">
         <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
               <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-6 h-auto hover:bg-white/10 hover:text-white transition-colors"
               >
                  <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                     </div>
                     <span className="text-lg font-semibold tracking-wide text-blue-50">
                        Análise de IA
                     </span>
                  </div>

                  <div className="flex items-center gap-2 text-blue-100/80">
                     <span className="text-xs uppercase tracking-wider font-medium hidden sm:block">
                        {isOpen ? 'Ocultar Análise' : 'Ver Análise'}
                     </span>
                     <ChevronDown
                        className={cn(
                           'h-5 w-5 transition-transform duration-300',
                           isOpen ? 'rotate-180' : 'rotate-0',
                        )}
                     />
                  </div>
               </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 px-6 pb-6 animate-collapsible-down">
               <div className="h-px w-full bg-white/20 mb-4" />

               <p className="text-base font-medium leading-relaxed tracking-tight text-white md:text-lg">
                  {insight.insight}
               </p>

               <div className="rounded-lg bg-black/10 p-3 backdrop-blur-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                     <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-blue-200/80">
                        Resumo
                     </span>
                     <p className="text-sm font-medium leading-normal text-blue-50 opacity-95">
                        {insight.summary}
                     </p>
                  </div>
               </div>
            </CollapsibleContent>
         </Collapsible>
      </Card>
   );
}
