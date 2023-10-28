import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role';

@Entity()
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field()
  uid: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @CreateDateColumn()
  @Field()
  createDate: Date;

  @UpdateDateColumn()
  @Field()
  updateDate: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field((type) => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  password?: string;
}
