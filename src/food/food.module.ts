import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // Resolverでexpressのreq/resを利用する場合設定する
      // context: ({ req, res }): { req: Request; res: Response } => ({
      //   req,
      //   res,
      // }),
      // corsの設定が必要な場合
      // cors: {
      //   origin: process.env.ORIGINS?.split(','),
      //   credentials: true,
      // },
      debug: process.env.NODE_ENV === 'production' ? false : true,
      playground: process.env.NODE_ENV === 'production' ? false : true,
    }),
    PrismaModule,
  ],
  providers: [FoodResolver, FoodService],
})
export class FoodModule {}
