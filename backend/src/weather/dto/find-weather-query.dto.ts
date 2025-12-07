import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindWeatherQueryDto {
   @ApiPropertyOptional({
      description: 'Número da página',
      default: 1,
      example: 1,
   })
   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(1)
   page?: number = 1;

   @ApiPropertyOptional({
      description: 'Itens por página',
      default: 10,
      example: 20,
   })
   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(1)
   limit?: number = 10;

   @ApiPropertyOptional({
      description: 'Data de início (ISO)',
      example: '2025-12-01',
   })
   @IsOptional()
   @IsString()
   startDate?: string;

   @ApiPropertyOptional({
      description: 'Data de fim (ISO)',
      example: '2025-12-31',
   })
   @IsOptional()
   @IsString()
   endDate?: string;
}
