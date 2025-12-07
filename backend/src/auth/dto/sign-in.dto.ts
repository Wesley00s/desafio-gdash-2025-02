import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
   @ApiProperty({ description: 'E-mail cadastrado', example: 'admin@gdash.io' })
   @IsEmail({}, { message: 'O email deve ser válido' })
   email: string;

   @ApiProperty({ description: 'Senha do usuário', example: '123456' })
   @IsNotEmpty({ message: 'A senha é obrigatória' })
   @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
   password: string;
}
