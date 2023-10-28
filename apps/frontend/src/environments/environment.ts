import { firebaseConfig } from './firebase';

export const environment = {
  production: false,

  apiUrl: 'http://localhost:3000/graphql',

  firebaseConfig: {
    ...firebaseConfig,
  },
};
