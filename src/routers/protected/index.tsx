import React from 'react';
import {Navigate} from 'react-router-dom';
import AuthProvider from '../../providers/auth';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({children}) => {
  if (!localStorage.getItem('_tk')) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
};

export default ProtectedRoute;
