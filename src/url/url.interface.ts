import { Document } from 'mongoose';

export interface UrlInterface extends Document {
  urlCode?: string;
  longUrl: string;
  shortUrl?: string;
  created?: string;
}
