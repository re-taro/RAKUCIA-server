import { Controller, Body, Post } from '@nestjs/common';
import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { LinebotService } from './linebot.service';

@Controller('linebot')
export class LinebotController {
  constructor(private readonly linebotService: LinebotService) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    events.map((event) => {
      switch (event.type) {
        case 'follow':
          this.linebotService.setRichMenu();
          break;
        default:
          break;
      }
    });
  }
}
