import { getConnection } from "typeorm";
import { hash } from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "./../entities/user";
import { MyContext } from "./../types/MyContext";
import { FieldError } from "./../utils/FieldErrorsType";
import { UserInputType } from "./../utils/userInput";
import { validateRegister } from "./../utils/validateRegister";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserInputType,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await hash(input.password);
    const emailToLower = input.email.toLowerCase();

    let user;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: input.username,
          email: emailToLower,
          password: hashedPassword,
        })
        .execute();

      user = await User.findOne({ where: { email: input.email } });

      const token = jwt.sign({ userId: user?.id }, `${process.env.JWT_SECRET}`);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 100000000,
      });
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "already exists ",
            },
          ],
        };
      }
    }

    return { user };
  }
}
