import { Link } from 'react-router-dom';
import { useRegister } from '@/hooks/auth/useRegister';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
   CardFooter,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function RegisterPage() {
   const {
      formData,
      handleChange,
      submitRegister,
      loading,
      error,
      success,
      navigate,
   } = useRegister();

   return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>Crie sua conta</CardTitle>
               <CardDescription>
                  Preencha os dados para acessar o GDASH Monitor
               </CardDescription>
            </CardHeader>
            <CardContent>
               {success ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-md text-center border border-green-200">
                     <p className="font-medium">{success}</p>
                     <Button
                        onClick={() => navigate('/login')}
                        className="mt-4 w-full"
                        variant="outline"
                     >
                        Ir para Login
                     </Button>
                  </div>
               ) : (
                  <form onSubmit={submitRegister} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                           id="name"
                           placeholder="Ex: Maria Souza"
                           value={formData.name}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="maria@email.com"
                           value={formData.email}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                           id="password"
                           type="password"
                           placeholder="Mínimo 6 caracteres"
                           value={formData.password}
                           onChange={handleChange}
                           required
                           minLength={6}
                        />
                     </div>

                     {error && (
                        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                           {error}
                        </p>
                     )}

                     <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                     >
                        {loading && (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loading ? 'Criando...' : 'Cadastrar'}
                     </Button>
                  </form>
               )}
            </CardContent>

            {!success && (
               <CardFooter className="flex justify-center border-t p-4 mt-2">
                  <p className="text-sm text-slate-600">
                     Já tem uma conta?{' '}
                     <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                     >
                        Entrar
                     </Link>
                  </p>
               </CardFooter>
            )}
         </Card>
      </div>
   );
}
