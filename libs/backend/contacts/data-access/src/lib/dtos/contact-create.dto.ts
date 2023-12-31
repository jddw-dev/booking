import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContactCreateDto {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  jobName?: string;

  @Field({ nullable: true })
  zipcode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  bookingPeriod?: string;

  @Field({ nullable: true })
  eventPeriod?: string;

  @Field({ nullable: true })
  comments?: string;
}
