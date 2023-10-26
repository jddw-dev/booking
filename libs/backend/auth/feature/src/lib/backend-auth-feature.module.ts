import { AuthService } from '@booking/backend-auth-data-access';
import { BackendFirebaseFeatureModule } from '@booking/backend-firebase-feature';
import { BackendUsersDataAccessModule } from '@booking/backend-users-data-access';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard, RolesGuard } from './guards';
import { AuthResolver } from './resolvers/auth.resolver';
import { FirebaseAuthStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    BackendFirebaseFeatureModule,
    BackendUsersDataAccessModule,
  ],

  providers: [
    FirebaseAuthStrategy,

    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    AuthService,
    AuthResolver,
  ],
})
export class BackendAuthFeatureModule {}
