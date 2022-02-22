import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Food {
  user_id: string;
  recipe_title: string;
  recipe_url: string;
  image_url: string;
  recipe_material: string;
  recipe_indication: string;
  recipe_cost: string;
  created_at: Date;
  updated_at: Date;
  @Field(() => Int, { nullable: true })
  add_to_list?: number;
}
