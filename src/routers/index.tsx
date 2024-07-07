import {createBrowserRouter} from 'react-router-dom';
import ProtectedRoute from './protected';
import {RootPage} from './app';

const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const {LandingPage} = await import('./landing');
        return {Component: LandingPage};
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const {LoginPage} = await import('./auth/login');
        return {Component: LoginPage};
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <RootPage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const {ConversationPage} = await import('./app');
            return {Component: ConversationPage};
          },
        },
      ],
    },
  ]);
};

export default createRouter;
