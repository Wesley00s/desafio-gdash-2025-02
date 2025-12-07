import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
   HelpCircle,
   Activity,
   Brain,
   FileText,
   BarChart3,
   ShieldCheck,
   Rocket,
} from 'lucide-react';
import * as React from 'react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
         <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
   );
}

export function AboutModal() {
   return (
      <Dialog>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-blue-600"
                     >
                        <HelpCircle className="h-5 w-5" />
                     </Button>
                  </DialogTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Sobre a aplicação</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                  GDASH Weather <span className="text-xl">🌦️</span>
               </DialogTitle>
               <DialogDescription className="text-base">
                  Plataforma inteligente de monitoramento e análise climática.
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
               <div className="space-y-2">
                  <p className="text-sm text-slate-600 leading-relaxed">
                     O <strong>GDASH Weather</strong> é uma solução completa
                     para acompanhamento de condições meteorológicas em tempo
                     real. Projetado para oferecer precisão e agilidade, o
                     sistema integra coleta de dados de alta disponibilidade com
                     inteligência artificial para gerar insights acionáveis.
                  </p>
               </div>

               <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                     Principais Recursos
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="mt-1">
                           <Activity className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                           <h5 className="font-medium text-sm text-slate-800">
                              Tempo Real
                           </h5>
                           <p className="text-xs text-slate-500 mt-1">
                              Monitoramento contínuo de temperatura, umidade e
                              ventos com atualização automática.
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-purple-200 transition-colors">
                        <div className="mt-1">
                           <Brain className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <h5 className="font-medium text-sm text-slate-800">
                              IA Generativa
                           </h5>
                           <p className="text-xs text-slate-500 mt-1">
                              Análises automáticas de tendências e recomendações
                              de saúde baseadas no Gemini AI.
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-green-200 transition-colors">
                        <div className="mt-1">
                           <FileText className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                           <h5 className="font-medium text-sm text-slate-800">
                              Relatórios
                           </h5>
                           <p className="text-xs text-slate-500 mt-1">
                              Exportação completa de histórico em formatos CSV e
                              Excel para auditoria e análise externa.
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-orange-200 transition-colors">
                        <div className="mt-1">
                           <BarChart3 className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                           <h5 className="font-medium text-sm text-slate-800">
                              Visualização de Dados
                           </h5>
                           <p className="text-xs text-slate-500 mt-1">
                              Gráficos interativos para análise histórica de
                              variações climáticas.
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors sm:col-span-2">
                        <div className="mt-1">
                           <Rocket className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                           <h5 className="font-medium text-sm text-slate-800">
                              Monitoramento Espacial
                           </h5>
                           <p className="text-xs text-slate-500 mt-1">
                              Integração BFF com a API da NASA (NeoWs) para
                              rastrear asteroides próximos à Terra em tempo
                              real.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-blue-50/50 p-3 rounded-md flex items-center gap-3 border border-blue-100">
                  <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-800">
                     Seus dados são processados de forma segura. O sistema
                     utiliza criptografia de ponta a ponta e autenticação JWT
                     robusta.
                  </p>
               </div>

               <div className="flex items-center justify-between border-t pt-4 mt-2">
                  <div className="text-xs text-slate-400">Versão 1.0.0</div>
                  <a
                     href="https://github.com/Wesley00"
                     target="_blank"
                     rel="noreferrer"
                     className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 hover:underline"
                  >
                     <GithubIcon className="h-4 w-4" />
                     Desenvolvido por Wesley00s
                  </a>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
