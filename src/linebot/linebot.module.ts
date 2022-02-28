import { Module } from '@nestjs/common';
import { LinebotService } from './linebot.service';
import { LinebotController } from './linebot.controller';
import { LinebotConfigService } from './linebot.config.service';
import { FoodService } from '../food/food.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LinebotService, LinebotConfigService, FoodService, PrismaService],
  controllers: [LinebotController],
  exports: [LinebotConfigService],
})
export class LinebotModule {}
