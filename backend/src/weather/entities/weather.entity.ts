import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WeatherLogDocument = HydratedDocument<WeatherLog>;

@Schema({ timestamps: true })
export class WeatherLog {
   @Prop()
   latitude: number;

   @Prop()
   longitude: number;

   @Prop()
   temperature: number;

   @Prop()
   humidity: number;

   @Prop()
   wind_speed: number;

   @Prop()
   timestamp: string;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);
