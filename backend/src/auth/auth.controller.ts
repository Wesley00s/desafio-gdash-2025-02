import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Request,
   UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import {
   ApiBearerAuth,
   ApiOperation,
   ApiResponse,
   ApiTags,
} from '@nestjs/swagger';

interface AuthenticatedRequest {
   user: {
      userId: string;
      email: string;
      name: string;
   };
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post('login')
   @ApiOperation({ summary: 'Realizar login e obter token JWT' })
   @ApiResponse({
      status: 200,
      type: LoginResponseDto,
      description: 'Login realizado com sucesso',
   })
   @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
   signIn(@Body() signInDto: SignInDto): Promise<LoginResponseDto> {
      return this.authService.signIn(signInDto.email, signInDto.password);
   }

   @UseGuards(AuthGuard('jwt'))
   @ApiBearerAuth()
   @Get('me')
   @ApiOperation({ summary: 'Obter dados do usuário logado (via Token)' })
   @ApiResponse({ status: 200, description: 'Dados do usuário recuperados' })
   getProfile(@Request() req: AuthenticatedRequest) {
      return req.user;
   }
}
