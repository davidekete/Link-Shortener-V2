import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [UrlModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
