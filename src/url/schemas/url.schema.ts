/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop()
  urlCode: string;

  @Prop({ required: true })
  longUrl: string;

  @Prop()
  shortUrl: string;

  @Prop()
  created: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
