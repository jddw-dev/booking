import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SocialRegisterInput {
  @Field()
  uid: string;

  @Field()
  email: string;
}
