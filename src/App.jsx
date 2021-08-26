import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { setupApi } from './api';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import { applicationSlice, store } from './redux';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //   },
  // },
});

export default function App() {
  const { initialize } = applicationSlice.actions;

  const isInitialized = useSelector(state => state.isInitialized);

  useEffect(() => {
    document.getElementById('loader').remove();
    const { token } = window.sessionStorage;
    if (token) setupApi(token);
    store.dispatch(initialize());
  }, []);

  if (!isInitialized) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <Router>
          <Switch>
            <Route path="/" exact>
              <TodoPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route>
              404 not found <Link to="/login">login</Link>
            </Route>
          </Switch>
        </Router>
      </AppContext>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
