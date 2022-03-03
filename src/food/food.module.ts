import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LinebotModule } from '../linebot/linebot.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: process.env.NODE_ENV === 'production' ? false : true,
      playground: process.env.NODE_ENV === 'production' ? false : true,
    }),
    PrismaModule,
    LinebotModule,
  ],
  providers: [FoodResolver, FoodService],
  exports: [FoodService],
})
export class FoodModule {}
