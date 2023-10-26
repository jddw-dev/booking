import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(),

    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => ({
        link: ApolloLink.from([httpLink.create({ uri: environment.apiUrl })]),
        cache: new InMemoryCache(),
      }),
      deps: [HttpLink],
    },
    Apollo,
  ],
};
