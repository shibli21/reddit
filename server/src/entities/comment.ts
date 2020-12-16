import { Expose } from "class-transformer";
import { Vote } from "./vote";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { makeId } from "../utils/generateRandom";
import { Post } from "./post";
import { User } from "./user";

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  identifier!: string;

  @Column({ type: "text" })
  @Field()
  body: string;

  @Column()
  @Field()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "email" })
  user!: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.comment)
  vote!: Vote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Number)
  @Expose()
  get votesCount(): Number {
    return this.vote?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
