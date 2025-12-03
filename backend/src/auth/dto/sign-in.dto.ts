import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
   @IsEmail({}, { message: 'O email deve ser válido' })
   email: string;

   @IsNotEmpty({ message: 'A senha é obrigatória' })
   @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
   password: string;
}
