import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, MinLength, IsString, IsInt, Min, Max } from 'class-validator';

@InputType()
export class FoodCreateInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  user_id: string;
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  recipe_title: string;
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  recipe_url: string;
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  image_url: string;
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  recipe_material: string;
  @Field(() => String, { nullable: false })
  @MinLength(4)
  @MaxLength(5)
  @IsNotEmpty()
  @IsString()
  recipe_indication: string;
  @Field(() => String, { nullable: false })
  @MinLength(4)
  @MaxLength(9)
  @IsNotEmpty()
  @IsString()
  recipe_cost: string;
}

@InputType()
export class FoodUpdateInput {
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  leave_flag: number;
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  add_to_list: number;
}
