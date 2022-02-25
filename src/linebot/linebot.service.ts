import { Injectable } from '@nestjs/common';
import { Client } from '@line/bot-sdk';
import * as fs from 'fs';
import { join } from 'path';
import { LinebotConfigService } from './linebot.config.service';
import { richMenu } from './linebot.data';

@Injectable()
export class LinebotService {
  constructor(private readonly linebotConfigService: LinebotConfigService) {}

  async setRichMenu() {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    const richMenuId = await client.createRichMenu(richMenu);
    await client.setRichMenuImage(richMenuId, fs.createReadStream(join(process.cwd(), 'src/linebot/richmenu.png')));
    await client.setDefaultRichMenu(richMenuId);
    await client.createRichMenu(richMenu);
  }
}
