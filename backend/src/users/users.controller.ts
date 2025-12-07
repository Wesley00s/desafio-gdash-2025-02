import {
   Controller,
   Get,
   Post,
   Body,
   Query,
   Delete,
   Param,
   Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
   ApiOperation,
   ApiQuery,
   ApiResponse,
   ApiTags,
   ApiParam,
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Post()
   @ApiOperation({ summary: 'Criar um novo usuário' })
   @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
   create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
   }

   @Get()
   @ApiOperation({ summary: 'Listar todos os usuários' })
   findAll() {
      return this.usersService.findAll();
   }

   @Get('profile')
   @ApiOperation({ summary: 'Buscar usuário por e-mail' })
   @ApiQuery({
      name: 'email',
      required: true,
      description: 'E-mail do usuário',
   })
   async findOne(@Query('email') email: string) {
      const user = await this.usersService.findOne(email);
      if (user) {
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { password, ...result } = user.toObject ? user.toObject() : user;
         return result;
      }
      return null;
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Remover um usuário' })
   @ApiParam({ name: 'id', description: 'ID do usuário' })
   remove(@Param('id') id: string) {
      return this.usersService.remove(id);
   }

   @Patch(':id')
   @ApiOperation({ summary: 'Atualizar dados de um usuário' })
   @ApiParam({ name: 'id', description: 'ID do usuário' })
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
   }
}
