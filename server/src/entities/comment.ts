import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "email" })
  user!: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
