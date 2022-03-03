import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from './linebot.config.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LinebotService, LinebotConfigService],
  controllers: [LinebotController],
  exports: [LinebotService, LinebotConfigService],
})
export class LinebotModule {}
