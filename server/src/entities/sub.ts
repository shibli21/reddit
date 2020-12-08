import { Post } from "./post";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
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
import { User } from "./user";

@Entity()
@ObjectType()
export class Sub extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ unique: true })
  @Field()
  @Index()
  name!: string;

  @Column()
  @Field()
  title: string;

  @Column({ type: "text", nullable: true })
  @Field()
  description: string;

  @Column({ nullable: true })
  @Field()
  imageUrn: string;

  @Column({ nullable: true })
  @Field()
  bannerUrn: string;

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "email" })
  user!: User;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
