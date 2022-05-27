import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { UrlDto } from './dtos/url.dto';
import { isUri } from 'valid-url';
import { generate } from 'shortid';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: Model<UrlDocument>,
  ) {}

  async shortenLink(url: UrlDto): Promise<Url> {
    const { longUrl } = url;

    if (!isUri(process.env.BASE_URL)) {
      throw new UnprocessableEntityException('The Base URL is not a Valid URI');
    }

    if (!isUri(longUrl)) {
      throw new UnprocessableEntityException('The URL entered is not Valid');
    }

    const urlCode = generate();

    try {
      let url = await this.urlModel.findOne({ longUrl });
      if (url) return url;
      const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

      url = await new this.urlModel({
        longUrl,
        shortUrl,
        urlCode,
        dateCreated: new Date(),
      }).save();

      return url;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async redirect(code: string): Promise<Url> {
    try {
      return await this.urlModel.findOne({ urlCode: code });
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }
}
