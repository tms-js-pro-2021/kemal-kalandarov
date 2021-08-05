import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { setupApi } from './api';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const { token } = window.sessionStorage;
    if (token) setupApi(token);
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  return (
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
  );
}
