import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Loader2,
   ArrowLeft,
   Mail,
   User,
   Fingerprint,
   Trash2,
   Edit2,
   Save,
   X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/util/formatDate';
import * as React from 'react';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface InfoProps {
   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
   label: string;
   value: string | undefined;
   fullWidth?: boolean;
}

export function ProfilePage() {
   const { user, loading, deleteAccount, updateAccount } = useProfile();
   const navigate = useNavigate();

   const [isEditing, setIsEditing] = useState(false);
   const [editForm, setEditForm] = useState({ name: '', email: '' });

   useEffect(() => {
      if (user) {
         setEditForm({ name: user.name, email: user.email });
      }
   }, [user, isEditing]);

   if (loading) {
      return (
         <div className="h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
         </div>
      );
   }

   const handleSave = async () => {
      await updateAccount(editForm);
      setIsEditing(false);
   };

   const getInitials = (name: string) => {
      return name
         ?.split(' ')
         .map((n) => n[0])
         .join('')
         .toUpperCase()
         .substring(0, 2);
   };

   const InfoItem = ({
      icon: Icon,
      label,
      value,
      fullWidth = false,
   }: InfoProps) => (
      <div
         className={`flex flex-col space-y-1.5 p-4 bg-slate-50 rounded-lg border border-slate-100 ${
            fullWidth ? 'md:col-span-2' : ''
         }`}
      >
         <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5" />
            {label}
         </div>
         <div className="text-base font-semibold text-slate-800 break-all">
            {value}
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
         <Card className="w-full max-w-2xl shadow-lg border-slate-200">
            <CardHeader className="border-b bg-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  {!isEditing && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/')}
                        className="hover:bg-slate-100 shrink-0"
                     >
                        <ArrowLeft className="h-5 w-5 text-slate-600" />
                     </Button>
                  )}
                  <div>
                     <CardTitle className="text-xl text-slate-800">
                        {isEditing ? 'Editar Perfil' : 'Meu Perfil'}
                     </CardTitle>
                     <CardDescription>
                        {isEditing
                           ? 'Atualize suas informações'
                           : 'Visualize seus dados cadastrais'}
                     </CardDescription>
                  </div>
               </div>

               {!isEditing && (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setIsEditing(true)}
                     className="w-full sm:w-auto"
                  >
                     <Edit2 className="h-4 w-4 mr-2" />
                     Editar
                  </Button>
               )}
            </CardHeader>

            <CardContent className="space-y-8 pt-8">
               <div className="flex flex-col items-center justify-center gap-4">
                  <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-white shadow-md ring-1 ring-slate-200">
                     <AvatarImage src="" />
                     <AvatarFallback className="text-2xl md:text-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                        {user ? getInitials(user.name) : 'US'}
                     </AvatarFallback>
                  </Avatar>

                  {!isEditing && (
                     <div className="text-center space-y-1">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                           {user?.name}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium flex items-center justify-center gap-1">
                           <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                           Membro desde{' '}
                           {user?.createdAt
                              ? formatDate(user.createdAt).split(',')[0]
                              : '-'}
                        </p>
                     </div>
                  )}
               </div>

               <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                  {isEditing ? (
                     <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                           id="name"
                           value={editForm.name}
                           onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                           }
                        />
                     </div>
                  ) : (
                     <InfoItem
                        icon={User}
                        label="Nome Completo"
                        value={user?.name}
                     />
                  )}

                  {isEditing ? (
                     <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                           id="email"
                           value={editForm.email}
                           onChange={(e) =>
                              setEditForm({
                                 ...editForm,
                                 email: e.target.value,
                              })
                           }
                        />
                     </div>
                  ) : (
                     <InfoItem icon={Mail} label="E-mail" value={user?.email} />
                  )}

                  <InfoItem
                     icon={Fingerprint}
                     label="ID do Usuário"
                     value={user?._id}
                     fullWidth
                  />
               </div>

               {isEditing ? (
                  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t mt-6 sm:justify-end">
                     <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:w-auto"
                     >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                     </Button>
                     <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                     >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Alterações
                     </Button>
                  </div>
               ) : (
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4 pt-6 border-t mt-6">
                     <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto"
                     >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Dashboard
                     </Button>

                     <div className="w-full sm:w-auto">
                        <AlertDialog>
                           <AlertDialogTrigger asChild>
                              <Button
                                 variant="ghost"
                                 className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                 <Trash2 className="h-4 w-4 mr-2" />
                                 Deletar Conta
                              </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                              <AlertDialogHeader>
                                 <AlertDialogTitle>
                                    Você tem certeza absoluta?
                                 </AlertDialogTitle>
                                 <AlertDialogDescription>
                                    Essa ação não pode ser desfeita. Isso
                                    excluirá permanentemente sua conta e
                                    removerá seus dados de nossos servidores.
                                 </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                 <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                 <AlertDialogAction
                                    onClick={deleteAccount}
                                    className="bg-red-600 hover:bg-red-700"
                                 >
                                    Sim, deletar conta
                                 </AlertDialogAction>
                              </AlertDialogFooter>
                           </AlertDialogContent>
                        </AlertDialog>
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
