import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinebotConfigService {
  createLinebotOptions() {
    const configService = new ConfigService();
    return {
      channelAccessToken: configService.get<string>('CHANNEL_ACCESS_TOKEN'),
      channelSecret: configService.get<string>('CHANNEL_SECRET'),
    };
  }
}
