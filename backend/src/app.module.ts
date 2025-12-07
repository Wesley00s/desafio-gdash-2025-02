import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NasaModule } from './nasa/nasa.module';

@Module({
   imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(
         process.env.MONGO_URI || 'mongodb://localhost:27017/gdash',
      ),
      WeatherModule,
      UsersModule,
      AuthModule,
      NasaModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
