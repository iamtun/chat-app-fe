import React from 'react';
import {Navigate, useSearchParams} from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/app';

  if (localStorage.getItem('_tk')) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return (
    <main>
      <h1>Login Page</h1>
    </main>
  );
};

export {LoginPage};
