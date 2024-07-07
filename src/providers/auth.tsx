import {onAuthStateChanged, User} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {firebaseAuth} from '../libs/firebase';
import {IAuth} from '../models/auth';
import {AuthContext} from '../contexts/auth';
import firebaseService from '../services/firebase';

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const logIn = () => {
    setIsLoading(true);

    firebaseService
      .loginWithGoogle()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = () => {
    setIsLoading(true);
    firebaseService
      .logOut()
      .then(() => {
        setCurrentUser(null);
        navigate('/');
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const authValues: IAuth = {
    user: currentUser,
    loading: isLoading,
    logIn,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('_tk', token);
        });
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
