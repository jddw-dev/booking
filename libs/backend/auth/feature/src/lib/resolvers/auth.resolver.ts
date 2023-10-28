import {
  AuthService,
  RegisterInput,
  SocialRegisterInput,
} from '@booking/backend-auth-data-access';
import { User, UsersService } from '@booking/backend-users-data-access';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser, Public } from '../decorators';

@Resolver('Auth')
export class AuthResolver {
  private logger: Logger = new Logger(AuthResolver.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Query(() => User)
  async me(@GetUser() user: User): Promise<User | null> {
    this.logger.debug('me');
    return this.usersService.findOneBy({ uid: user.uid });
  }

  @Public()
  @Mutation(() => User)
  async register(
    @Args('registerInput') registerInput: RegisterInput
  ): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation(() => User)
  async registerFromSocial(
    @Args('registerInput') registerInput: SocialRegisterInput
  ): Promise<User> {
    const user = await this.usersService.findOneBy({
      email: registerInput.email,
    });
    if (!user) {
      return this.authService.register(registerInput);
    }

    return user;
  }
}
