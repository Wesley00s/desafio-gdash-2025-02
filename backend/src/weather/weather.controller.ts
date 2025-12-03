import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import express from 'express';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { FindWeatherQueryDto } from './dto/find-weather-query.dto';

@Controller('api/weather')
export class WeatherController {
   constructor(private readonly weatherService: WeatherService) {}

   @Post()
   create(@Body() createWeatherDto: CreateWeatherDto) {
      console.log('Recebendo dados do Go:', createWeatherDto);
      return this.weatherService.create(createWeatherDto);
   }

   @Get()
   findAll(@Query() query: FindWeatherQueryDto) {
      return this.weatherService.findAll(query);
   }

   @Get('insights')
   getInsights() {
      return this.weatherService.getInsights();
   }

   @Get('export/csv')
   async downloadCsv(@Res() res: express.Response) {
      const csv = await this.weatherService.getCsv();

      res.header('Content-Type', 'text/csv');
      res.header(
         'Content-Disposition',
         'attachment; filename=weather_data.csv',
      );
      return res.send(csv);
   }

   @Get('export/xlsx')
   async downloadExcel(@Res() res: express.Response) {
      const buffer = await this.weatherService.getExcel();

      res.header(
         'Content-Type',
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.header(
         'Content-Disposition',
         'attachment; filename=weather_data.xlsx',
      );

      return res.send(buffer);
   }
}
