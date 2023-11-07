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
} from 'typeorm';
import { Mailbox } from './mailbox';

@Entity()
@ObjectType()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  sendDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @Field(() => User)
  sender: User;

  @ManyToOne(() => Mailbox)
  @JoinColumn()
  @Index()
  @Field(() => Mailbox)
  mailbox: Mailbox;
}
