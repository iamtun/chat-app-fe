import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {env} from '../../config/env';

const app = initializeApp({
  apiKey: env.FIREBASE.apiKey,
  authDomain: env.FIREBASE.authDomain,
  projectId: env.FIREBASE.projectId,
  storageBucket: env.FIREBASE.storageBucket,
  messagingSenderId: env.FIREBASE.messagingSenderId,
  appId: env.FIREBASE.appId,
});

export const firebaseAuth = getAuth(app);
export default app;
