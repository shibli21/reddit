import { MyContext } from "src/types/MyContext";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Post } from "./../entities/post";
import { Sub } from "./../entities/sub";
import { User } from "./../entities/user";
import { isAuth } from "./../middleware/isAuth";
import { FieldError } from "./../utils/FieldErrorsType";

@InputType()
class PostInputType {
  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field()
  subName!: string;
}

@InputType()
class GetPostInputType {
  @Field()
  slug: string;

  @Field()
  identifier: string;
}

@ObjectType()
class GetPostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return Post.find({
      relations: ["user", "sub", "comments"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  @Query(() => GetPostResponse)
  async getPost(
    @Arg("input") input: GetPostInputType
  ): Promise<GetPostResponse> {
    const post = await Post.findOne({
      where: {
        identifier: input.identifier,
        slug: input.slug,
      },
      relations: [
        "user",
        "sub",
        "comments",
        "comments.vote",
        "comments.post",
        "comments.user",
        "vote",
        "vote.comment",
        "vote.post",
        "vote.user",
      ],
      order: {
        createdAt: "DESC",
      },
    });

    if (!post) {
      return {
        errors: [
          {
            field: "post",
            message: "something went wrong",
          },
        ],
      };
    }

    return { post };
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
