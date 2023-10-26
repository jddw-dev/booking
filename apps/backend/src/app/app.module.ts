import { BackendAuthFeatureModule } from '@booking/backend-auth-feature';
import { BackendContactsDataAccessModule } from '@booking/backend-contacts-data-access';
import { BackendContactsFeatureModule } from '@booking/backend-contacts-feature';
import { BackendFirebaseFeatureModule } from '@booking/backend-firebase-feature';
import { BackendUsersDataAccessModule } from '@booking/backend-users-data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    BackendUsersDataAccessModule,

    BackendFirebaseFeatureModule,
    BackendAuthFeatureModule,

    BackendContactsDataAccessModule,
    BackendContactsFeatureModule,
  ],

  providers: [AppResolver],
})
export class AppModule {}
