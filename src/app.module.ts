// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { middleware as LineMiddleware, MiddlewareConfig } from '@line/bot-sdk';
import { FoodModule } from './food/food.module';
import { LinebotModule } from './linebot/linebot.module';
import { LinebotController } from './linebot/linebot.controller';

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
  configure(consumer: MiddlewareConsumer) {
    const configService = new ConfigService();
    const lineConfig: MiddlewareConfig = {
      channelAccessToken: configService.get<string>('CHANNEL_ACCESS_TOKEN'),
      channelSecret: configService.get<string>('CHANNEL_SECRET'),
    };
    consumer.apply(LineMiddleware(lineConfig)).forRoutes(LinebotController);
    consumer.apply(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
  }
}
