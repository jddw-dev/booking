import { FirebaseService } from '@booking/backend-firebase-feature';
import { User, UsersService } from '@booking/backend-users-data-access';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as firebase from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth'
) {
  private readonly logger: Logger = new Logger(FirebaseAuthStrategy.name);
  private app: firebase.app.App;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    this.app = this.firebaseService.app;
  }

  async validate(token: string): Promise<User> {
    this.logger.log('Validating firebase token');
    this.logger.debug(token);

    const firebaseUser: any = await this.app
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        this.logger.error(err);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      this.logger.error('No firebase user');
      throw new UnauthorizedException();
    }

    const user: User | null = await this.userService.findOneBy({
      uid: firebaseUser.uid,
    });

    if (!user) {
      this.logger.error('No user');
      throw new UnauthorizedException();
    }

    return user;
  }
}
