import {createBrowserRouter} from 'react-router-dom';
import ProtectedRoute from './protected';
import {RootPage} from './app';
import AuthProvider from '../providers/auth';

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
        return {
          element: (
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          ),
        };
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
