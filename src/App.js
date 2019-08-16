import React from 'react';
import {
  useView,
  useCurrentRoute,
  NotFoundBoundary,
} from 'react-navi';

import ErrorBoundary from './components/ErrorBoundary';
import NotFoundView from './views/NotFoundView';

import './App.scss';

const App = (props) => {
  const view = useView();
  // const route = useCurrentRoute();

  return (
    <React.Suspense fallback={<div>Hello!</div>}>
      <ErrorBoundary
        render={
          (error, errorInfo) => (
            <div>
              {error.message}
            </div>
          )
        }
      >
        <NotFoundBoundary
          render={
            (error) => (
              <NotFoundView
                error={error}
                // {...props}
              />
            )
          }
        >
          {view.content}
        </NotFoundBoundary>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
