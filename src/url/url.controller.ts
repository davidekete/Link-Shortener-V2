import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlDto } from './dtos/url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @Post('/shorten')
  async shortenLink(
    @Body()
    url: UrlDto,
  ) {
    return this.service.shortenLink(url);
  }

  @Get(':code')
  async redirect(@Res() res, @Param('code') code: string) {
    const url = await this.service.redirect(code);
    if (url) {
      return res.redirect(url.longUrl);
    }
  }
}
