import { Module } from '@nestjs/common';
import { LinebotModule } from '../linebot/linebot.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [PrismaModule, LinebotModule],
  providers: [FoodResolver, FoodService],
  exports: [FoodService],
})
export class FoodModule {}
