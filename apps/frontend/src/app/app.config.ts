import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import {
  AUTH_FEATURE_KEY,
  AuthEffects,
  authReducer,
} from '@booking/frontend-auth-data-access';
import {
  XLS_PARSER_FEATURE_KEY,
  XlsParserEffects,
  xlsParserReducer,
} from '@booking/frontend-xls-parser-feature-xls-reader';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

// Firebase
const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
]);

function createApollo(httpLink: HttpLink) {
  console.log('createApollo');
  const auth: Auth = inject(Auth);

  const basic = setContext((operation, context) => ({
    headers: {
      ContentType: 'application/json',
    },
  }));

  const apolloAuth = setContext(async (operation, context) => {
    return auth.currentUser?.getIdToken().then((token) => {
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
  });

  const link = ApolloLink.from([
    basic,
    apolloAuth,
    httpLink.create({ uri: environment.apiUrl }),
  ]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore({}),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

    provideState(AUTH_FEATURE_KEY, authReducer),
    provideEffects(AuthEffects),

    provideState(XLS_PARSER_FEATURE_KEY, xlsParserReducer),
    provideEffects(XlsParserEffects),

    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(),

    firebaseProviders,

    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
  ],
};
