// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { middleware as LineMiddleware } from '@line/bot-sdk';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FoodModule } from './food/food.module';
import { LinebotModule } from './linebot/linebot.module';
import { LinebotController } from './linebot/linebot.controller';
import { LinebotConfigService } from './linebot/linebot.config.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'production' ? false : true,
      //playground: process.env.NODE_ENV === 'production' ? false : true, TODO: すぐに消す
      cors: {
        origin: process.env.ORIGINS?.split(','),
        credentials: true,
      },
    }),
    FoodModule,
    LinebotModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  providers: [LinebotConfigService],
})
export class AppModule implements NestModule {
  constructor(readonly linebotConfigService: LinebotConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LineMiddleware(this.linebotConfigService.createLinebotOptions())).forRoutes(LinebotController);
    consumer.apply(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
  }
}
