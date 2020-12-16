import { Vote } from "./vote";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { slugify } from "../utils/createSlug";
import { makeId } from "../utils/generateRandom";
import { Comment } from "./comment";
import { Sub } from "./sub";
import { User } from "./user";
import { Expose } from "class-transformer";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Index()
  @Field()
  identifier: string;

  @Index()
  @Column()
  @Field()
  slug: string;

  @Column({ nullable: true, type: "text" })
  @Field()
  body!: string;

  @Column()
  @Field()
  subName!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "email" })
  user!: User;

  @Field(() => Sub)
  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub!: Sub;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.post)
  vote!: Vote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Number)
  @Expose()
  get commentsCount(): Number {
    return this.comments.length;
  }

  @Field(() => Number)
  @Expose()
  get votesCount(): Number {
    return this.vote?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
