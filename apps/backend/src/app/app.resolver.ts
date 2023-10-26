import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App')
export class AppResolver {
  @Query(() => String, { name: 'version' })
  getVersion(): string {
    return '0.0.1';
  }
}
