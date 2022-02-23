import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, MinLength, IsInt, IsString } from 'class-validator';

@ObjectType()
export class Food {
  @Field(() => ID)
  id: number;
  @IsNotEmpty()
  @IsString()
  user_id: string;
  @IsNotEmpty()
  @IsString()
  recipe_title: string;
  @IsNotEmpty()
  @IsString()
  recipe_url: string;
  @IsNotEmpty()
  @IsString()
  image_url: string;
  @IsNotEmpty()
  @IsString()
  recipe_material: string;
  @MinLength(4)
  @MaxLength(5)
  @IsNotEmpty()
  @IsString()
  recipe_indication: string;
  @MinLength(4)
  @MaxLength(9)
  @IsNotEmpty()
  @IsString()
  recipe_cost: string;
  @HideField()
  created_at: Date;
  @HideField()
  updated_at: Date;
  @Field(() => Int, { nullable: true })
  @IsInt()
  add_to_list?: number;
  @Field(() => Int, { nullable: true })
  @IsInt()
  leave_flag?: number;
}
