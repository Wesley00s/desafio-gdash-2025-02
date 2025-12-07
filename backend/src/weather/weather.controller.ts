import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import express from 'express';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { FindWeatherQueryDto } from './dto/find-weather-query.dto';
import {
   ApiOperation,
   ApiResponse,
   ApiTags,
   ApiProduces,
} from '@nestjs/swagger';

@ApiTags('Clima')
@Controller('api/weather')
export class WeatherController {
   constructor(private readonly weatherService: WeatherService) {}

   @Post()
   @ApiOperation({ summary: 'Receber dados do Worker (Interno)' })
   @ApiResponse({ status: 201, description: 'Log climático salvo' })
   create(@Body() createWeatherDto: CreateWeatherDto) {
      console.log('Recebendo dados do Go:', createWeatherDto);
      return this.weatherService.create(createWeatherDto);
   }

   @Get()
   @ApiOperation({ summary: 'Listar histórico de clima com filtros' })
   findAll(@Query() query: FindWeatherQueryDto) {
      return this.weatherService.findAll(query);
   }

   @Get('insights')
   @ApiOperation({ summary: 'Gerar insights de IA (Gemini)' })
   getInsights() {
      return this.weatherService.getInsights();
   }

   @Get('export/csv')
   @ApiOperation({ summary: 'Download do histórico em CSV' })
   @ApiProduces('text/csv')
   @ApiResponse({
      status: 200,
      description: 'Arquivo CSV gerado',
      schema: { type: 'string', format: 'binary' },
   })
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
   @ApiOperation({ summary: 'Download do histórico em Excel' })
   @ApiProduces(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   )
   @ApiResponse({
      status: 200,
      description: 'Arquivo Excel gerado',
      schema: { type: 'string', format: 'binary' },
   })
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
