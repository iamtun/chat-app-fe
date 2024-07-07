import {Spin} from 'antd';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';

const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Spin size="large" />
        </div>
      }
    >
      <ErrorBoundary
        FallbackComponent={() => (
          <>
            <div>Something went wrong</div>
          </>
        )}
      >
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
