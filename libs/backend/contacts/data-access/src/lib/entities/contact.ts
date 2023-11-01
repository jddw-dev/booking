import { User } from '@booking/backend-users-data-access';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @Field(() => User)
  owner: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  // TODO : multiple emails
  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  // TODO : multiple phones
  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  jobName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  comments?: string;
}
