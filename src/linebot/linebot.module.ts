import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from './linebot.config.service';

@Module({
  providers: [LinebotService, LinebotConfigService],
  controllers: [LinebotController],
  exports: [LinebotConfigService],
})
export class LinebotModule {}
