import React from 'react';
import {RouterProvider} from 'react-router-dom';
import createRouter from '../routers';
import AppProvider from '../providers/main';

const AppRouter = () => {
  return <RouterProvider router={createRouter()} />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
