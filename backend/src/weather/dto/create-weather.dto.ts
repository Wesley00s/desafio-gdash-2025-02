import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateWeatherDto {
   @IsNumber()
   @IsNotEmpty()
   latitude: number;

   @IsNumber()
   @IsNotEmpty()
   longitude: number;

   @IsNumber()
   @IsNotEmpty()
   temperature: number;

   @IsNumber()
   @IsNotEmpty()
   humidity: number;

   @IsNumber()
   @IsNotEmpty()
   wind_speed: number;

   @IsString()
   @IsNotEmpty()
   timestamp: string;
}
