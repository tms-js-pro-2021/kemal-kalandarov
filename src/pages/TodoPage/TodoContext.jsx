import React, { createContext, useContext, useState } from 'react';
import api from '../../api';
import useErrorHandler from '../../hooks/useErrorHandler';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export default ({ children }) => {
  const { handleError } = useErrorHandler();

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = (isLoadingShown = true) => {
    if (isLoadingShown) setIsLoading(true);

    api
      .get('/todos')
      .then(res => setTodos(res.data))
      .catch(handleError)
      .finally(() => {
        if (isLoadingShown) setIsLoading(false);
      });
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, isLoading, loadTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
