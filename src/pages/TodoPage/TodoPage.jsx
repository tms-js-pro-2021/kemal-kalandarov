import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Page } from '../../components';
import TodoList from './TodoList/TodoList';

export default function TodoPage() {
  const { replace } = useHistory();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCloseError = () => setError('');

  const loadTodos = (isLoadingShown = true) => {
    if (isLoadingShown) setIsLoading(true);
    fetch('https://tms-js-pro-back-end.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: `Token ${window.sessionStorage.token}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            setTodos(data);
          });
        } else if (res.status === 401) {
          replace('/login');
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        if (isLoadingShown) setIsLoading(false);
      });
  };

  const handleToggleFactory = (id, done) => () => {
    fetch(`https://tms-js-pro-back-end.herokuapp.com/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${window.sessionStorage.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: !done }),
    }).then(() => {
      loadTodos(false);
    });
  };

  const handleDeleteFactory = id => () => {
    fetch(`https://tms-js-pro-back-end.herokuapp.com/api/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${window.sessionStorage.token}`,
      },
    }).then(() => {
      loadTodos(false);
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Page title="Todos" error={error} closeError={handleCloseError}>
      <TodoList
        {...{
          todos,
          isLoading,
          handleToggleFactory,
          handleDeleteFactory,
        }}
      />
    </Page>
  );
}
