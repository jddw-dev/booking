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
import { MailboxType } from '../models';

@Entity()
@ObjectType()
export class Mailbox {
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

  @Column({ type: 'enum', enum: MailboxType, default: MailboxType.GMAIL })
  @Field(() => MailboxType)
  type: MailboxType;

  @Column({ nullable: true })
  @Field()
  refreshToken?: string;

  @Column()
  @Field()
  email: string;
}
