import {User} from 'firebase/auth';

export interface IAuth {
  user: User | null;
  loading: boolean;
  logIn: () => void;
  logOut: () => void;
}
