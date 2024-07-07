import React from 'react';
import {Navigate, useSearchParams} from 'react-router-dom';

import styles from './Login.module.scss';
import {Button} from 'antd';

import {FcGoogle} from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/app';

  const {loading, logIn} = useAuth();

  if (localStorage.getItem('_tk')) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return (
    <main className={styles.container}>
      <h1>Login Page</h1>
      <Button
        size="large"
        icon={<FcGoogle />}
        className={styles.btn}
        loading={loading}
        onClick={logIn}
      >
        Login with google
      </Button>
    </main>
  );
};

export {LoginPage};
