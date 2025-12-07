import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NasaResponseDto } from './dto/nasa-response.dto';

@Injectable()
export class NasaService {
   private readonly API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse';
   private readonly API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

   constructor(private readonly httpService: HttpService) {}

   async getAsteroids(page: number = 0): Promise<NasaResponseDto> {
      try {
         const { data } = await firstValueFrom(
            this.httpService.get<NasaResponseDto>(this.API_URL, {
               params: {
                  page: page,
                  size: 9,
                  api_key: this.API_KEY,
               },
            }),
         );
         return data;
      } catch {
         throw new HttpException(
            'Erro ao conectar com a NASA',
            HttpStatus.BAD_GATEWAY,
         );
      }
   }
}
