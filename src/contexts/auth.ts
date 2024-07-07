import {createContext} from 'react';
import {IAuth} from '../models/auth';
import {firebaseAuth} from '../libs/firebase';

export const AuthContext = createContext<IAuth>({
  user: firebaseAuth.currentUser,
  loading: false,
  logIn: () => {},
  logOut: () => {},
});
