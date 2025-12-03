import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherLog, WeatherLogDocument } from './entities/weather.entity';
import { FilterQuery, Model } from 'mongoose';
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { FindWeatherQueryDto } from './dto/find-weather-query.dto';
import { GoogleGenAI } from '@google/genai';

export interface PaginatedWeatherResponse {
   data: WeatherLog[];
   meta: {
      total: number;
      page: number;
      lastPage: number;
      limit: number;
   };
}

export interface InsightResponse {
   insight?: string;
   summary?: string;
   analysis_date?: Date;
   message?: string;
}

interface GeminiJsonResponse {
   insight: string;
   summary: string;
}

interface GeminiError {
   status?: number;
   message?: string;
}

@Injectable()
export class WeatherService {
   private readonly logger = new Logger(WeatherService.name);

   private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

   private lastInsight: InsightResponse | null = null;
   private lastInsightTime: number = 0;

   constructor(
      @InjectModel(WeatherLog.name)
      private weatherModel: Model<WeatherLogDocument>,
   ) {}

   async create(data: CreateWeatherDto): Promise<WeatherLog> {
      const createdLog = new this.weatherModel(data);
      return createdLog.save();
   }

   async findAll(
      query: FindWeatherQueryDto,
   ): Promise<PaginatedWeatherResponse> {
      const { page = 1, limit = 10, startDate, endDate } = query;

      const filter: FilterQuery<WeatherLogDocument> = {};

      if (startDate || endDate) {
         const dateQuery: { $gte?: Date; $lte?: Date } = {};

         if (startDate) {
            dateQuery.$gte = new Date(startDate);
         }

         if (endDate) {
            const end = new Date(endDate);

            if (!endDate.includes('T') && !endDate.includes('Z')) {
               end.setHours(23, 59, 59, 999);
            }

            dateQuery.$lte = end;
         }

         filter.createdAt = dateQuery;
      }

      const total = await this.weatherModel.countDocuments(filter);

      const data = await this.weatherModel
         .find(filter)
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .exec();

      return {
         data,
         meta: {
            total,
            page,
            limit,
            lastPage: Math.ceil(total / limit),
         },
      };
   }

   async getInsights(): Promise<InsightResponse> {
      const now = Date.now();
      if (this.lastInsight && now - this.lastInsightTime < 5 * 60 * 1000) {
         return this.lastInsight;
      }

      const recentLogs = await this.weatherModel
         .find()
         .sort({ createdAt: -1 })
         .limit(3)
         .exec();

      if (!recentLogs || recentLogs.length === 0) {
         return { message: 'Sem dados suficientes para análise.' };
      }

      const current = recentLogs[0];

      if (!process.env.GEMINI_API_KEY) {
         this.logger.warn('Sem API Key. Usando fallback local.');
         return this.getSimpleInsights(current);
      }

      const prompt = `
            Atue como um meteorologista pessoal focado em saúde e bem-estar para moradores da região.

            Dados recentes:
            ${JSON.stringify(
               recentLogs.map((l) => ({
                  hora: new Date(l.timestamp).toLocaleTimeString('pt-BR'),
                  temp: l.temperature,
                  umid: l.humidity,
                  vento: l.wind_speed,
               })),
            )}

            REGRAS OBRIGATÓRIAS:
            1. PROIBIDO dizer "condições estáveis" ou "sem variações".
            2. Se a umidade < 40%, ALERTE sobre ar seco.
            3. Se a temperatura > 30°C, mencione o calor.
            4. Use tom coloquial.

            Tarefa:
            - insight: Conselho prático de saúde ou conforto baseado nos dados.
            - summary: Uma frase curta e natural descrevendo o clima (use conectivos, não faça lista seca).
              Exemplo BOM: "Faz 32°C com céu aberto e uma brisa constante."
              Exemplo RUIM: "32°C, Céu limpo, Vento 21km/h."

            Responda EXATAMENTE neste formato JSON:
            { "insight": "texto aqui", "summary": "texto aqui" }
         `;

      const modelsToTry = [
         'gemini-2.5-flash',
         'gemini-1.5-flash',
         'gemini-1.5-flash-latest',
         'gemini-pro',
      ];

      for (const modelName of modelsToTry) {
         try {
            const response = await this.ai.models.generateContent({
               model: modelName,
               contents: [{ parts: [{ text: prompt }] }],
               config: { responseMimeType: 'application/json' },
            });

            const responseText = response.text || '';
            if (!responseText) throw new Error('Resposta vazia');

            const jsonResponse = JSON.parse(responseText) as GeminiJsonResponse;

            this.lastInsight = {
               insight: jsonResponse.insight,
               summary: jsonResponse.summary,
               analysis_date: new Date(),
            };
            this.lastInsightTime = Date.now();

            return this.lastInsight;
         } catch (unknownError) {
            const error = unknownError as GeminiError;

            const isNotFound =
               error.status === 404 ||
               (typeof error.message === 'string' &&
                  error.message.includes('not found'));

            if (isNotFound) {
               this.logger.warn(
                  `Modelo ${modelName} falhou (404). Tentando próximo...`,
               );
               continue;
            }

            this.logger.error(`Erro crítico no Gemini (${modelName}):`, error);
            break;
         }
      }

      this.logger.error(
         'Todos os modelos de IA falharam. Usando lógica local.',
      );
      return this.getSimpleInsights(current);
   }

   private getSimpleInsights(lastLog: WeatherLogDocument): InsightResponse {
      let insight = '';
      const temp = lastLog.temperature;
      const hum = lastLog.humidity;

      if (temp > 30)
         insight = 'Alerta de calor extremo! Mantenha-se hidratado.';
      else if (temp < 20) insight = 'Tempo mais fresco que o normal.';
      else insight = 'Condições climáticas estáveis.';

      if (hum < 30) insight += ' Atenção: Baixa umidade.';

      return {
         insight,
         summary: `(Modo Offline) ${temp}°C, ${hum}% umidade.`,
         analysis_date: new Date(),
      };
   }

   async getCsv(): Promise<string> {
      const result = await this.findAll({ page: 1, limit: 10000 });
      const data = result.data;

      const plainData = data.map((doc) => ({
         Data: doc.timestamp,
         Latitude: doc.latitude,
         Longitude: doc.longitude,
         Temperatura: doc.temperature,
         Umidade: doc.humidity,
         Vento: doc.wind_speed,
      }));

      const parser = new Parser();
      return parser.parse(plainData);
   }

   async getExcel(): Promise<Buffer> {
      const result = await this.findAll({ page: 1, limit: 10000 });
      const data = result.data;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Logs de Clima');

      worksheet.columns = [
         { header: 'Data/Hora', key: 'timestamp', width: 25 },
         { header: 'Latitude', key: 'latitude', width: 15 },
         { header: 'Longitude', key: 'longitude', width: 15 },
         { header: 'Temperatura (°C)', key: 'temperature', width: 20 },
         { header: 'Umidade (%)', key: 'humidity', width: 15 },
         { header: 'Vento (km/h)', key: 'wind_speed', width: 15 },
      ];

      data.forEach((doc) => {
         worksheet.addRow({
            timestamp: doc.timestamp,
            latitude: doc.latitude,
            longitude: doc.longitude,
            temperature: doc.temperature,
            humidity: doc.humidity,
            wind_speed: doc.wind_speed,
         });
      });

      worksheet.getRow(1).font = { bold: true };

      return (await workbook.xlsx.writeBuffer()) as unknown as Buffer;
   }
}
