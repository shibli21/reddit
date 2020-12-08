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
import { Comment } from "./../entities/comment";
import { Post } from "./../entities/post";
import { User } from "./../entities/user";
import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../types/MyContext";

@InputType()
class CommentOnPostInputType {
  @Field()
  slug!: string;

  @Field()
  identifier!: string;

  @Field()
  body!: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  comments() {
    return Comment.find();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Comment)
  async commentOnPost(
    @Arg("input") input: CommentOnPostInputType,
    @Ctx() { req }: MyContext
  ): Promise<Comment | null> {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    let comment;

    try {
      const post = await Post.findOneOrFail({
        where: {
          identifier: input.identifier,
          slug: input.slug,
        },
      });
      comment = await Comment.create({
        body: input.body,
        user: user,
        post: post,
      }).save();
    } catch (error) {
      console.log(error);
    }

    if (!comment) {
      return null;
    }

    return comment;
  }
}
