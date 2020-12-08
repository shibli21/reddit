import { Sub } from "./../entities/sub";
import { isAuth } from "./../middleware/isAuth";
import { User } from "./../entities/user";
import { Post } from "./../entities/post";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types/MyContext";

@InputType()
class PostInputType {
  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field()
  subName!: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return Post.find({ relations: ["user"] });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: PostInputType,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    let post;
    try {
      const sub = await Sub.findOneOrFail({ name: input.subName });

      post = await Post.create({
        body: input.body,
        title: input.title,
        subName: input.subName.toLowerCase(),
        sub: sub,
        user: user,
      }).save();
    } catch (error) {}

    if (!post) {
      return null;
    }
    return post;
  }
}
