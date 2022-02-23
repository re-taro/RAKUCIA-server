import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql';

@ObjectType()
export class Food {
  @Field(() => ID)
  id: number;
  user_id: string;
  recipe_title: string;
  recipe_url: string;
  image_url: string;
  recipe_material: string;
  recipe_indication: string;
  recipe_cost: string;
  @HideField()
  created_at: Date;
  @HideField()
  updated_at: Date;
  @Field(() => Int, { nullable: true })
  add_to_list?: number;
  @Field(() => Int, { nullable: true })
  leave_flag?: number;
}
