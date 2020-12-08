import { Field, InputType } from "type-graphql";
@InputType()
export class SubInputType {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  name!: string;
}
