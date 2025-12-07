import { Module } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { NasaController } from './nasa.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
   imports: [HttpModule],
   providers: [NasaService],
   controllers: [NasaController],
})
export class NasaModule {}
