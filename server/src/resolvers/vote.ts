import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types/MyContext";
import { Comment } from "./../entities/comment";
import { Post } from "./../entities/post";
import { User } from "./../entities/user";
import { Vote } from "./../entities/vote";
import { isAuth } from "./../middleware/isAuth";

@InputType()
class VoteInputType {
  @Field()
  identifier: string;

  @Field({ nullable: true })
  commentIdentifier: string;

  @Field()
  slug: string;

  @Field()
  value: number;
}

@Resolver()
export class VoteResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async vote(@Arg("input") input: VoteInputType, @Ctx() { req }: MyContext) {
    // ** validate vote
    if (![-1, 0, 1].includes(input.value)) {
      return false;
    }
    try {
      const user = await User.findOne({
        where: {
          id: req.userId,
        },
      });

      let post = await Post.findOneOrFail({
        where: {
          slug: input.slug,
          identifier: input.identifier,
        },
      });
      let vote: Vote | undefined;
      let comment: Comment | undefined;

      if (input.commentIdentifier) {
        // ** IF THERE IS A COMMENT IDENTIFIER FIND VOTE BY COMMENT

        comment = await Comment.findOneOrFail({
          where: {
            identifier: input.commentIdentifier,
          },
        });
        vote = await Vote.findOne({ user, comment });
      } else {
        //  ** ELSE FIND BY POST
        vote = await Vote.findOne({ user, post });
      }

      if (!vote && input.value === 0) {
        // **  IF NO VOTE && VALUE NOT EQUAL TO 0
        return false;
      } else if (!vote) {
        vote = Vote.create({
          user: user,
          value: input.value,
        });
        if (comment) {
          vote.comment = comment;
        } else {
          vote.post = post;
        }
        await vote.save();
      } else if (input.value === 0) {
        // ** IF VOTE EXIST AND VALUE = 0 REMOVE VOTE FROM DB
        await vote.remove();
      } else if (input.value !== vote.value) {
        // ** IF VOTE & VALUE HAS CHANGED ,UPDATE VOTE
        vote.value = input.value;
        await vote.save();
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
