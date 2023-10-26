import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';

@Injectable()
export class FirebaseService {
  private _logger: Logger = new Logger(FirebaseService.name);
  private _app: firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    const privateKey =
      this.configService.get<string>('FIREBASE_PRIVATE_KEY') || '';

    const firebase_params = {
      type: this.configService.get<string>('FIREBASE_TYPE'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKeyId: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: privateKey.replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      authUri: this.configService.get<string>('FIREBASE_AUTH_URI'),
      tokenUri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get<string>(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'
      ),
      clientC509CertUrl: this.configService.get<string>(
        'FIREBASE_CLIENT_X509_CERT_URL'
      ),
    };

    this._logger.debug('Firebase params:');
    this._logger.debug(firebase_params);

    this._app = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      projectId: firebase_params.projectId,
    });

    // TODO - TEMP
    // First call to be able to communicate with Firebase

    this.auth
      .createUser({ email: 'fakeuser@web4u.com', password: 'fakeuser' })
      .then((datas) => {
        this._logger.debug('First call has succeed.');
        this.auth
          .deleteUser(datas.uid)
          .then(() => {
            this._logger.debug('Fake user has been removed');
          })
          .catch(() => {
            this._logger.error('Unable to remove fake user');
          });
      })
      .catch((e) => {
        this._logger.warn('First call has failed:');
        this._logger.warn(e.message);
      });
  }

  get app(): firebase.app.App {
    return this._app;
  }

  get auth(): Auth {
    return this._app.auth();
  }
}
