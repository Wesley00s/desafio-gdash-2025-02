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
import { AuthGuard } from '@nestjs/passport';

interface AuthenticatedRequest {
   user: {
      userId: string;
      email: string;
      name: string;
   };
}

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post('login')
   signIn(@Body() signInDto: SignInDto): Promise<void> {
      return this.authService.signIn(signInDto.email, signInDto.password);
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('me')
   getProfile(@Request() req: AuthenticatedRequest) {
      return req.user;
   }
}
