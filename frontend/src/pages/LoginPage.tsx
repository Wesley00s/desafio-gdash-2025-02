import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/auth/useLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoginPage() {
   const { formData, handleChange, submitLogin, loading, error } = useLogin();

   return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle>GDASH Login</CardTitle>
               <CardDescription>
                  Entre para acessar o monitoramento
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={submitLogin} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  {error && (
                     <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                        {error}
                     </p>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                     {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     )}
                     {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
               </form>

               <div className="flex justify-center border-t p-4 mt-4">
                  <p className="text-sm text-slate-600">
                     Não tem conta?{' '}
                     <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                     >
                        Registre-se
                     </Link>
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
