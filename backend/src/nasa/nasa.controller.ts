import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { AuthGuard } from '@nestjs/passport';
import { NasaResponseDto } from './dto/nasa-response.dto';
import {
   ApiOperation,
   ApiQuery,
   ApiResponse,
   ApiTags,
   ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('NASA')
@ApiBearerAuth()
@Controller('nasa')
export class NasaController {
   constructor(private readonly nasaService: NasaService) {}

   @UseGuards(AuthGuard('jwt'))
   @Get('asteroids')
   @ApiOperation({ summary: 'Listar asteroides próximos à Terra' })
   @ApiResponse({
      status: 200,
      type: NasaResponseDto,
      description: 'Dados paginados do NeoWs',
   })
   @ApiQuery({
      name: 'page',
      required: false,
      description: 'Número da página (padrão 0)',
   })
   async findAll(@Query('page') page: string): Promise<NasaResponseDto> {
      const pageNumber = page ? parseInt(page) : 0;
      return this.nasaService.getAsteroids(pageNumber);
   }
}
