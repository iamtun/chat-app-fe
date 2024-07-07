import {
  setPersistence,
  browserLocalPersistence,
  signOut,
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {firebaseAuth} from '../libs/firebase';

setPersistence(firebaseAuth, browserLocalPersistence);

class FirebaseService {
  constructor(private _auth: Auth) {
    this._auth = _auth;
  }

  async logOut() {
    return await signOut(this._auth);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this._auth, provider);
  }
}

const firebaseService = new FirebaseService(firebaseAuth);
export default firebaseService;
