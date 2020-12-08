import { MyContext } from "src/types/MyContext";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Sub } from "./../entities/sub";
import { User } from "./../entities/user";
import { isAuth } from "./../middleware/isAuth";
import { FieldError } from "./../utils/FieldErrorsType";
import { SubInputType } from "./../utils/subInputType";
import { validateCreateSub } from "./../utils/validateCreateSub";

@ObjectType()
class SubResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Sub, { nullable: true })
  sub?: Sub;
}

@Resolver()
export class SubResolver {
  @Query(() => [Sub])
  subs() {
    return Sub.find({ relations: ["user", "posts"] });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => SubResponse)
  async createSub(
    @Arg("input") input: SubInputType,
    @Ctx() { req }: MyContext
  ): Promise<SubResponse> {
    const errors = validateCreateSub(input);
    if (errors) {
      return { errors };
    }
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    const nameToLower = input.name.toLowerCase();
    let sub;
    try {
      sub = await Sub.create({
        title: input.title,
        user: user,
        description: input.description,
        name: nameToLower,
      }).save();
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: "already exists ",
            },
          ],
        };
      }
    }

    return { sub };
  }
}
