import React from 'react';
import {Outlet} from 'react-router-dom';

const RootPage: React.FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RootPage;
