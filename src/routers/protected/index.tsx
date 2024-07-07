import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({children}) => {
  if (!localStorage.getItem('_tk')) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
