import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
   @ApiProperty({
      description: 'Nome completo do usuário',
      example: 'Wesley Rodrigues',
   })
   @IsNotEmpty()
   name: string;

   @ApiProperty({ description: 'E-mail para login', example: 'admin@gdash.io' })
   @IsEmail()
   email: string;

   @ApiProperty({
      description: 'Senha (mínimo 6 caracteres)',
      example: '123456',
      minLength: 6,
   })
   @IsNotEmpty()
   @MinLength(6)
   password: string;
}
