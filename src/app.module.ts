// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { middleware as LineMiddleware } from '@line/bot-sdk';
import { FoodModule } from './food/food.module';
import { LinebotModule } from './linebot/linebot.module';
import { LinebotController } from './linebot/linebot.controller';
import { LinebotConfigService } from './linebot/linebot.config.service';

@Module({
  imports: [
    FoodModule,
    LinebotModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [LinebotController],
})
export class AppModule implements NestModule {
  constructor(readonly linebotConfigService: LinebotConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LineMiddleware(this.linebotConfigService.createLinebotOptions())).forRoutes(LinebotController);
    consumer.apply(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
  }
}
